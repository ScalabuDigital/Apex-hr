import { renderToString } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { VacancyArchive } from "@/components/jobs/vacancy-archive";
import { getJobPostingJsonLd } from "@/lib/seo/structured-data";
import type { Vacancy, WpRestVacancy } from "@/lib/wordpress";
import { validateCvFile } from "@/features/jobs/application-validation";

async function loadWordPress() {
  vi.resetModules();
  vi.stubEnv("WORDPRESS_API_URL", "https://blog.apexhrllc.co.uk/wp-json/wp/v2");
  vi.stubEnv("WORDPRESS_SITE_URL", "https://blog.apexhrllc.co.uk");
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://www.apexhrllc.co.uk");
  return import("@/lib/wordpress");
}

function buildRawVacancy(overrides: Partial<WpRestVacancy> = {}): WpRestVacancy {
  return {
    id: 42,
    date: "2026-09-20T09:00:00",
    date_gmt: "2026-09-20T09:00:00",
    modified: "2026-09-21T10:00:00",
    modified_gmt: "2026-09-21T10:00:00",
    slug: "senior-hr-manager",
    status: "publish",
    link: "https://blog.apexhrllc.co.uk/vacancies/senior-hr-manager/",
    title: { rendered: "Senior HR Manager" },
    content: { rendered: "<p>Lead the people strategy.</p><script>alert(1)</script>" },
    excerpt: { rendered: "<p>Lead an experienced HR team.</p>" },
    featured_media: 0,
    meta: {
      apex_hr_vacancy_reference: "APEX-042",
      apex_hr_vacancy_status: "Open",
      apex_hr_location: "London",
      apex_hr_sector: "Professional Services",
      apex_hr_employment_type: "Permanent",
      apex_hr_workplace_arrangement: "Hybrid",
      apex_hr_closing_date: "2099-12-31",
      apex_hr_featured: true,
      apex_hr_salary_min: 50000,
      apex_hr_salary_max: 60000,
      apex_hr_salary_currency: "GBP",
      apex_hr_salary_unit: "YEAR",
    },
    ...overrides,
  };
}

function buildVacancy(overrides: Partial<Vacancy> = {}): Vacancy {
  return {
    id: 42,
    slug: "senior-hr-manager",
    status: "open",
    title: "Senior HR Manager",
    reference: "APEX-042",
    summary: "Lead an experienced HR team.",
    descriptionHtml: "<p>Lead the people strategy.</p>",
    responsibilities: ["Lead the people strategy"],
    requirements: ["Senior HR experience"],
    desirableSkills: [],
    benefits: [],
    sector: "Professional Services",
    department: "Human Resources",
    location: "London",
    employmentType: "Permanent",
    workplaceArrangement: "Hybrid",
    seniority: "Senior",
    salaryMin: 50000,
    salaryMax: 60000,
    salaryCurrency: "GBP",
    salaryDisplay: "£50,000–£60,000",
    salaryUnit: "YEAR",
    closingDate: "2099-12-31",
    applicationEmail: "",
    featured: true,
    seoTitle: "",
    metaDescription: "",
    publishedAt: "2026-09-20T09:00:00Z",
    modifiedAt: "2026-09-21T10:00:00Z",
    ...overrides,
  };
}

function jsonResponse(body: unknown, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.resetModules();
});

describe("WordPress vacancies", () => {
  it("normalises vacancy fields and sanitises imported HTML", async () => {
    const { normalizeVacancy } = await loadWordPress();
    const vacancy = normalizeVacancy(buildRawVacancy());

    expect(vacancy).toMatchObject({
      id: 42,
      slug: "senior-hr-manager",
      status: "open",
      title: "Senior HR Manager",
      reference: "APEX-042",
      summary: "Lead an experienced HR team.",
      location: "London",
      employmentType: "Permanent",
      workplaceArrangement: "Hybrid",
      salaryMin: 50000,
      salaryMax: 60000,
      salaryCurrency: "GBP",
      salaryUnit: "YEAR",
      featured: true,
    });
    expect(vacancy.descriptionHtml).toContain("<p>Lead the people strategy.</p>");
    expect(vacancy.descriptionHtml).not.toContain("<script>");
  });

  it("lists only published, open, non-expired vacancies and applies archive filters", async () => {
    const { getOpenVacancies, filterVacancies } = await loadWordPress();
    const fetchMock = vi.fn(async () =>
      jsonResponse(
        [
          buildRawVacancy(),
          buildRawVacancy({
            id: 43,
            slug: "closed-role",
            meta: { apex_hr_vacancy_status: "Closed" },
          }),
          buildRawVacancy({
            id: 44,
            slug: "expired-role",
            meta: { apex_hr_vacancy_status: "Open", apex_hr_closing_date: "2000-01-01" },
          }),
          buildRawVacancy({ id: 45, slug: "draft-role", status: "draft" }),
        ],
        { "X-WP-TotalPages": "1" },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await getOpenVacancies();
    expect(result.unavailable).toBe(false);
    expect(result.vacancies.map((vacancy) => vacancy.slug)).toEqual(["senior-hr-manager"]);
    expect(
      filterVacancies(result.vacancies, { keyword: "manager", location: "London", sector: "Professional Services" }),
    ).toHaveLength(1);
    expect(filterVacancies(result.vacancies, { location: "Manchester" })).toHaveLength(0);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/vacancies?"),
      expect.objectContaining({ next: { revalidate: 300 } }),
    );
  });

  it("returns an explicit unavailable result when the vacancy API fails", async () => {
    const { getOpenVacancies } = await loadWordPress();
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("upstream unavailable"); }));

    await expect(getOpenVacancies()).resolves.toEqual({ vacancies: [], unavailable: true });
  });

  it("keeps closed published vacancies available for an explanatory detail page", async () => {
    const { getVacancyBySlug } = await loadWordPress();
    vi.stubGlobal("fetch", vi.fn(async () =>
      jsonResponse([buildRawVacancy({ meta: { apex_hr_vacancy_status: "Closed" } })]),
    ));

    const vacancy = await getVacancyBySlug("senior-hr-manager");
    expect(vacancy?.status).toBe("closed");
  });
});

describe("Job Board rendering and structured data", () => {
  it("renders vacancy search controls and a canonical Next.js detail link", () => {
    const html = renderToString(
      <VacancyArchive
        allVacancies={[buildVacancy()]}
        vacancies={[buildVacancy()]}
        filters={{}}
        page={1}
        unavailable={false}
      />,
    );

    expect(html).toContain("<h1");
    expect(html).toContain("Apex HR Job Board");
    expect(html).toContain("Search vacancies");
    expect(html).toContain('href="/jobs/senior-hr-manager"');
    expect(html).toContain("Senior HR Manager");
  });

  it("emits JobPosting data only from the vacancy fields supplied", () => {
    const data = getJobPostingJsonLd(buildVacancy());

    expect(data).toMatchObject({
      "@type": "JobPosting",
      title: "Senior HR Manager",
      employmentType: "FULL_TIME",
      url: "https://www.apexhrllc.co.uk/jobs/senior-hr-manager/",
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "GBP",
        value: {
          "@type": "QuantitativeValue",
          minValue: 50000,
          maxValue: 60000,
          unitText: "YEAR",
        },
      },
    });
    expect(data).not.toHaveProperty("telephone");
  });

  it("marks up each country a vacancy covers instead of assuming Great Britain", () => {
    const address = (location: string) => {
      const value = getJobPostingJsonLd(buildVacancy({ location })).jobLocation;
      return [value].flat().map((place) => place?.address);
    };

    expect(address("Nigeria")).toEqual([{ "@type": "PostalAddress", addressCountry: "NG" }]);
    expect(address("United States / Canada").map((entry) => entry?.addressCountry)).toEqual(["US", "CA"]);
    expect(address("USA, UK, UAE").map((entry) => entry?.addressCountry)).toEqual(["US", "GB", "AE"]);
    expect(address("London")).toEqual([{ "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" }]);
    expect(address("Lagos, Nigeria")).toEqual([{ "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" }]);
    expect(address("Somewhere")).toEqual([{ "@type": "PostalAddress", addressLocality: "Somewhere" }]);
    expect(getJobPostingJsonLd(buildVacancy({ location: "" }))).not.toHaveProperty("jobLocation");
    expect(
      getJobPostingJsonLd(buildVacancy({ location: "Nigeria, Ghana", workplaceArrangement: "Remote" })),
    ).toMatchObject({ applicantLocationRequirements: [{ name: "NG" }, { name: "GH" }] });
  });

  it("offers and matches individual countries in the location filter", async () => {
    const { filterVacancies } = await loadWordPress();
    const vacancies = [
      buildVacancy({ id: 1, location: "USA, UK, Nigeria" }),
      buildVacancy({ id: 2, location: "United States / Canada" }),
      buildVacancy({ id: 3, location: "Nigeria" }),
    ];
    const ids = (location: string) => filterVacancies(vacancies, { location }).map((vacancy) => vacancy.id);

    expect(ids("Nigeria")).toEqual([1, 3]);
    expect(ids("United States")).toEqual([1, 2]);
    expect(ids("USA, UK, Nigeria")).toEqual([1]);
    expect(ids("France")).toEqual([]);

    const html = renderToString(
      <VacancyArchive allVacancies={vacancies} vacancies={vacancies} filters={{}} page={1} unavailable={false} />,
    );
    expect(html).toContain('<option value="United Kingdom">');
    expect(html.match(/<option value="Nigeria">/g)).toHaveLength(1);
    expect(html).not.toContain('<option value="USA, UK, Nigeria">');
  });

  it("accepts a correctly typed PDF CV and rejects a mismatched MIME type", async () => {
    const validPdf = new File(["%PDF-1.7"], "cv.pdf", { type: "application/pdf" });
    const mismatchedPdf = new File(["%PDF-1.7"], "cv.pdf", { type: "text/plain" });

    await expect(validateCvFile(validPdf)).resolves.toBeNull();
    await expect(validateCvFile(mismatchedPdf)).resolves.toBe("cv-mime");
  });
});
