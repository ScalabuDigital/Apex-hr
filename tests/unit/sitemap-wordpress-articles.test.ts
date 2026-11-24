import { describe, expect, it, vi } from "vitest";
import type { Article, Vacancy } from "@/lib/wordpress";

const { getAllPublishedPostsForSitemap, getOpenVacanciesForSitemap, getCategoryPostCounts } = vi.hoisted(() => ({
  getAllPublishedPostsForSitemap: vi.fn(),
  getOpenVacanciesForSitemap: vi.fn().mockResolvedValue([]),
  getCategoryPostCounts: vi.fn().mockResolvedValue(new Map<string, number>()),
}));

vi.mock("@/lib/wordpress", () => ({ getAllPublishedPostsForSitemap, getOpenVacanciesForSitemap, getCategoryPostCounts }));

const { getSitemapGroups, flattenSitemapGroups } = await import("@/lib/seo/sitemap-data");

function buildArticle(overrides: Partial<Article> = {}): Article {
  return {
    id: 1,
    slug: "how-to-build-a-great-hr-team",
    status: "publish",
    publishedAt: "2026-09-10T09:00:00.000Z",
    modifiedAt: "2026-09-11T10:00:00.000Z",
    title: "How to Build a Great HR Team",
    excerpt: "A short summary.",
    contentHtml: "<p>Body copy.</p>",
    featuredImage: null,
    categories: [],
    tags: [],
    author: null,
    seo: {},
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
    descriptionHtml: "<p>Role details.</p>",
    responsibilities: [],
    requirements: [],
    desirableSkills: [],
    benefits: [],
    sector: "Professional Services",
    department: "Human Resources",
    location: "London",
    employmentType: "Permanent",
    workplaceArrangement: "Hybrid",
    seniority: "Senior",
    salaryMin: null,
    salaryMax: null,
    salaryCurrency: "",
    salaryDisplay: "",
    salaryUnit: "",
    closingDate: "",
    applicationEmail: "",
    featured: false,
    seoTitle: "",
    metaDescription: "",
    publishedAt: "2026-09-20T09:00:00.000Z",
    modifiedAt: "2026-09-21T10:00:00.000Z",
    ...overrides,
  };
}

async function allEntries() {
  return flattenSitemapGroups(await getSitemapGroups());
}

describe("sitemap data — WordPress article entries", () => {
  it("includes a published article at the root-level /{slug}/ URL", async () => {
    getAllPublishedPostsForSitemap.mockResolvedValueOnce([buildArticle()]);

    const entries = await allEntries();
    const articleEntry = entries.find((entry) => entry.loc.endsWith("/how-to-build-a-great-hr-team/"));

    expect(articleEntry).toBeTruthy();
    expect(articleEntry?.loc).not.toContain("/insights/how-to-build-a-great-hr-team/");
  });

  describe("sitemap data — WordPress vacancy entries", () => {
    it("includes a live vacancy at its canonical Next.js URL with the source modified date", async () => {
      getAllPublishedPostsForSitemap.mockResolvedValueOnce([]);
      getOpenVacanciesForSitemap.mockResolvedValueOnce([buildVacancy()]);

      const groups = await getSitemapGroups();

      expect(groups.vacancy).toEqual([
        {
          loc: "https://www.apexhrllc.co.uk/jobs/senior-hr-manager/",
          lastModified: new Date("2026-09-21T10:00:00.000Z"),
        },
      ]);
      expect(groups.insight).not.toContainEqual(expect.objectContaining({ loc: expect.stringContaining("/jobs/") }));
    });

    it("does not expose WordPress-origin vacancy URLs in the public sitemap group", async () => {
      getAllPublishedPostsForSitemap.mockResolvedValueOnce([]);
      getOpenVacanciesForSitemap.mockResolvedValueOnce([
        buildVacancy({ slug: "people-partner", modifiedAt: "not-a-date" }),
      ]);

      const groups = await getSitemapGroups();

      expect(groups.vacancy).toEqual([{ loc: "https://www.apexhrllc.co.uk/jobs/people-partner/" }]);
    });
  });

  it("never includes a blog.apexhrllc.co.uk (WordPress frontend) URL", async () => {
    getAllPublishedPostsForSitemap.mockResolvedValueOnce([buildArticle()]);
    const entries = await allEntries();
    expect(entries.some((entry) => entry.loc.includes("blog.apexhrllc.co.uk"))).toBe(false);
  });

  it("uses the post's `modified` date as lastModified", async () => {
    getAllPublishedPostsForSitemap.mockResolvedValueOnce([buildArticle()]);
    const entries = await allEntries();
    const articleEntry = entries.find((entry) => entry.loc.endsWith("/how-to-build-a-great-hr-team/"));
    expect(articleEntry?.lastModified).toEqual(new Date("2026-09-11T10:00:00.000Z"));
  });

  it("excludes an article whose slug collides with a reserved Apex HR route", async () => {
    getAllPublishedPostsForSitemap.mockResolvedValueOnce([buildArticle({ slug: "contact" })]);
    const entries = await allEntries();
    // "contact" still appears once, as the real static page from the
    // content manifest — never duplicated by a same-named WordPress post.
    const contactEntries = entries.filter((entry) => new URL(entry.loc).pathname === "/contact/");
    expect(contactEntries).toHaveLength(1);
  });

  it("preserves every existing local (non-article) sitemap entry alongside articles", async () => {
    getAllPublishedPostsForSitemap.mockResolvedValueOnce([buildArticle()]);
    const entries = await allEntries();
    expect(entries.some((entry) => entry.loc.endsWith("/services/"))).toBe(true);
    expect(entries.some((entry) => entry.loc.endsWith("/sector/"))).toBe(true);
  });

  it("puts the article in the insight group, never in any other group", async () => {
    getAllPublishedPostsForSitemap.mockResolvedValueOnce([buildArticle()]);
    const groups = await getSitemapGroups();
    expect(groups.insight.some((e) => e.loc.endsWith("/how-to-build-a-great-hr-team/"))).toBe(true);
    for (const key of ["page", "service", "sector", "location", "talentAcquisition"] as const) {
      expect(groups[key].some((e) => e.loc.endsWith("/how-to-build-a-great-hr-team/"))).toBe(false);
    }
  });

  it("includes the article's featured image in the insight group when present", async () => {
    getAllPublishedPostsForSitemap.mockResolvedValueOnce([
      buildArticle({ featuredImage: { url: "https://blog.apexhrllc.co.uk/wp-content/uploads/photo.jpg", alt: "A photo" } }),
    ]);
    const groups = await getSitemapGroups();
    const entry = groups.insight.find((e) => e.loc.endsWith("/how-to-build-a-great-hr-team/"));
    expect(entry?.images).toEqual([{ loc: "https://blog.apexhrllc.co.uk/wp-content/uploads/photo.jpg", title: "A photo" }]);
  });

  it("omits images entirely for an article with no featured image", async () => {
    getAllPublishedPostsForSitemap.mockResolvedValueOnce([buildArticle({ featuredImage: null })]);
    const groups = await getSitemapGroups();
    const entry = groups.insight.find((e) => e.loc.endsWith("/how-to-build-a-great-hr-team/"));
    expect(entry?.images).toBeUndefined();
  });

  it("contributes zero article entries (without failing) when WordPress is unavailable", async () => {
    getAllPublishedPostsForSitemap.mockResolvedValueOnce([]);
    const entries = await allEntries();
    // 215 = the 223 local, indexable manifest entries minus the 8 insight
    // category pages, which are only listed while they have published
    // articles (none do with the default empty category counts mocked
    // here) — see tests/unit/final-consolidated-seo-phase.test.tsx for the
    // authoritative count assertion.
    expect(entries.length).toBe(215);
  });

  it("handles an empty WordPress response gracefully", async () => {
    getAllPublishedPostsForSitemap.mockResolvedValueOnce([]);
    await expect(allEntries()).resolves.toBeInstanceOf(Array);
  });

  describe("sitemap data — insight category pages", () => {
    it("lists only the insight categories whose mapped WordPress categories have posts", async () => {
      getAllPublishedPostsForSitemap.mockResolvedValueOnce([]);
      getCategoryPostCounts.mockResolvedValueOnce(new Map([["people-strategy-in-uk", 3]]));
      const groups = await getSitemapGroups();
      const paths = groups.insight.map((e) => new URL(e.loc).pathname);
      expect(paths).toContain("/insights/people-strategy/");
      expect(paths).not.toContain("/insights/reward/");
      expect(paths).not.toContain("/insights/hr-technology/");
    });

    it("lists no insight category pages when WordPress category counts are unavailable", async () => {
      getAllPublishedPostsForSitemap.mockResolvedValueOnce([]);
      getCategoryPostCounts.mockResolvedValueOnce(null);
      const groups = await getSitemapGroups();
      expect(groups.insight.some((e) => /\/insights\/[^/]+\/$/.test(new URL(e.loc).pathname))).toBe(false);
      const allPaths = flattenSitemapGroups(groups).map((e) => new URL(e.loc).pathname);
      expect(allPaths).toContain("/insights/");
    });
  });
});
