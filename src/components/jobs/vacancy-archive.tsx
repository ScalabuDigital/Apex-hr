import Link from "next/link";
import { ArrowUpRight, ChevronDown, MapPin, Search, SlidersHorizontal } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { LinkButton } from "@/components/ui/link-button";
import { AutoSubmitSelect } from "@/components/jobs/auto-submit-select";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import type { Vacancy, VacancyQuery } from "@/lib/wordpress";

const PAGE_SIZE = 12;

const controlClass =
  "h-12 w-full rounded-md border border-white/25 bg-white/5 text-body text-white transition-colors hover:border-white/50 focus-visible:border-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

interface VacancyArchiveProps {
  allVacancies: Vacancy[];
  vacancies: Vacancy[];
  filters: VacancyQuery;
  page: number;
  unavailable: boolean;
}

function distinctValues(vacancies: Vacancy[], pick: (vacancy: Vacancy) => string): string[] {
  return [...new Set(vacancies.map(pick).filter(Boolean))].sort((a, b) => a.localeCompare(b, "en-GB"));
}

function formatClosingDate(value: string): string | null {
  const date = new Date(`${value}T00:00:00Z`);
  if (!value || Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}

function buildPageHref(filters: VacancyQuery, page: number): string {
  const params = new URLSearchParams();
  if (filters.keyword) params.set("q", filters.keyword);
  if (filters.location) params.set("location", filters.location);
  if (filters.sector) params.set("sector", filters.sector);
  if (filters.employmentType) params.set("employmentType", filters.employmentType);
  if (filters.workplaceArrangement) params.set("workplace", filters.workplaceArrangement);
  if (filters.seniority) params.set("seniority", filters.seniority);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${routes.jobs.path}?${query}` : routes.jobs.path;
}

function FilterSelect({
  name,
  label,
  allLabel,
  value,
  values,
}: {
  name: string;
  label: string;
  allLabel: string;
  value?: string;
  values: string[];
}) {
  const id = `vacancy-filter-${name}`;
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">{label}</label>
      <AutoSubmitSelect
        id={id}
        name={name}
        defaultValue={value ?? ""}
        className={`${controlClass} cursor-pointer appearance-none pl-4 pr-11 [&>option]:bg-navy [&>option]:text-white`}
      >
        <option value="">{allLabel}</option>
        {values.map((option) => <option key={option} value={option}>{option}</option>)}
      </AutoSubmitSelect>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
    </div>
  );
}

function StatusPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10 border-t border-white/15 pt-10" role="status">
      <h3 className="font-display text-h3 font-bold text-white">{title}</h3>
      <div className="mt-3 max-w-2xl text-body-lg text-white/70">{children}</div>
    </div>
  );
}

export function VacancyArchive({ allVacancies, vacancies, filters, page, unavailable }: VacancyArchiveProps) {
  const totalPages = Math.max(1, Math.ceil(vacancies.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const visibleVacancies = vacancies.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const locations = distinctValues(allVacancies, (vacancy) => vacancy.location);
  const sectors = distinctValues(allVacancies, (vacancy) => vacancy.sector);
  const employmentTypes = distinctValues(allVacancies, (vacancy) => vacancy.employmentType);
  const arrangements = distinctValues(allVacancies, (vacancy) => vacancy.workplaceArrangement);
  const seniorityLevels = distinctValues(allVacancies, (vacancy) => vacancy.seniority);
  const activeFilterCount = Object.values(filters).filter((value) => typeof value === "string" && value.trim()).length;
  const secondaryFiltersActive = Boolean(filters.employmentType || filters.workplaceArrangement || filters.seniority);

  return (
    <main className="bg-navy text-white">
      <header className="pb-12 pt-10 sm:pb-16 sm:pt-12">
        <Container size="wide">
          <Breadcrumbs trail={[routes.jobs]} tone="dark" />
          <p className="mt-12 text-small font-semibold uppercase tracking-[0.08em] text-gold sm:mt-16">Apex HR Job Board</p>
          <h1 className="mt-4 max-w-4xl font-display text-h1 font-bold sm:text-display">
            Ready for your next career move?{" "}
            <span className="text-gold">Find your role with Apex HR.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-body-lg text-white/70">
            Explore current vacancies published by Apex HR. Search by role, then narrow by sector, location and working arrangement.
          </p>
        </Container>
      </header>

      <section aria-labelledby="vacancy-search-heading" className="pb-20 sm:pb-28">
        <Container size="wide">
          <h2 id="vacancy-search-heading" className="sr-only">Current vacancies</h2>

          <form method="get" action={routes.jobs.path} role="search" aria-label="Search vacancies">
            <div className="grid gap-3 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-6">
              <div className="relative flex">
                <label htmlFor="vacancy-search" className="sr-only">Search vacancies</label>
                <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                <input
                  id="vacancy-search"
                  type="search"
                  name="q"
                  defaultValue={filters.keyword}
                  placeholder="Search for a job"
                  className={`${controlClass} pl-11 pr-24 placeholder:text-white/55`}
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 inline-flex h-9 -translate-y-1/2 items-center rounded-sm bg-gold px-4 text-small font-semibold text-navy transition-colors hover:bg-peach focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  Search
                </button>
              </div>
              <FilterSelect name="sector" label="Sector" allLabel="All sectors" value={filters.sector} values={sectors} />
              <FilterSelect name="location" label="Location" allLabel="All locations" value={filters.location} values={locations} />
            </div>

            <div className="mt-4 flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
              <details className="group w-full md:w-auto" open={secondaryFiltersActive}>
                <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-md text-small font-semibold text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold [&::-webkit-details-marker]:hidden">
                  <SlidersHorizontal aria-hidden="true" className="h-4 w-4" />
                  More filters
                  <ChevronDown aria-hidden="true" className="h-4 w-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
                </summary>
                <div className="mt-3 grid gap-3 sm:grid-cols-3 md:w-[min(48rem,calc(100vw-2*var(--page-gutter)))]">
                  <FilterSelect name="employmentType" label="Employment type" allLabel="All employment types" value={filters.employmentType} values={employmentTypes} />
                  <FilterSelect name="workplace" label="Work arrangement" allLabel="All work arrangements" value={filters.workplaceArrangement} values={arrangements} />
                  <FilterSelect name="seniority" label="Seniority" allLabel="All seniority levels" value={filters.seniority} values={seniorityLevels} />
                </div>
              </details>

              <div className="flex min-h-11 items-center gap-4 text-small text-white/70">
                {!unavailable && (
                  <p aria-live="polite">
                    {vacancies.length} {vacancies.length === 1 ? "open role" : "open roles"}
                    {activeFilterCount > 0 && ` · ${activeFilterCount} ${activeFilterCount === 1 ? "filter" : "filters"} applied`}
                  </p>
                )}
                {activeFilterCount > 0 && (
                  <Link href={routes.jobs.path} className="font-semibold text-gold underline underline-offset-4 hover:text-peach">
                    Clear all
                  </Link>
                )}
              </div>
            </div>
          </form>

          {unavailable ? (
            <StatusPanel title="Vacancies are temporarily unavailable">
              <p>
                Please try again later, or contact Apex HR at{" "}
                <a className="font-semibold text-gold underline underline-offset-4" href={`mailto:${siteConfig.jobBoardContactEmail}`}>
                  {siteConfig.jobBoardContactEmail}
                </a>.
              </p>
            </StatusPanel>
          ) : visibleVacancies.length === 0 ? (
            <StatusPanel title="No matching vacancies">
              <p>There are currently no vacancies matching your selection. Please adjust your filters or join the Apex HR talent pool.</p>
              <LinkButton href={routes.talentPool.path} variant="secondary" surface="dark" className="mt-6">
                Join the Talent Pool
              </LinkButton>
            </StatusPanel>
          ) : (
            <>
              <div aria-hidden="true" className="mt-10 hidden grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] gap-6 border-b border-white/15 pb-3 text-caption font-semibold uppercase tracking-[0.08em] text-white/55 md:grid">
                <span>Role</span>
                <span>Sector</span>
                <span>Location</span>
              </div>
              <ul className="mt-6 list-none border-t border-white/15 p-0 md:mt-0 md:border-t-0">
                {visibleVacancies.map((vacancy) => {
                  const closingDate = formatClosingDate(vacancy.closingDate);
                  const details = [vacancy.employmentType, vacancy.workplaceArrangement, vacancy.salaryDisplay].filter(Boolean);
                  return (
                    <li
                      key={vacancy.id}
                      className="group relative grid gap-3 border-b border-white/15 py-7 transition-colors hover:bg-white/[0.03] motion-reduce:transition-none md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-6 md:py-9"
                    >
                      <div>
                        <h3 className="font-display text-h4 font-semibold text-gold">
                          <Link
                            href={`${routes.jobs.path}${vacancy.slug}/`}
                            className="after:absolute after:inset-0 after:content-[''] group-hover:text-peach focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-gold"
                          >
                            {vacancy.title}
                          </Link>
                          {vacancy.featured && (
                            <span className="ml-3 inline-block translate-y-[-2px] rounded-full border border-gold/60 px-2.5 py-0.5 align-middle font-body text-caption font-semibold text-gold">
                              Featured
                            </span>
                          )}
                        </h3>
                        {details.length > 0 && (
                          <p className="mt-2 text-small text-white/65">{details.join(" · ")}</p>
                        )}
                        {closingDate && <p className="mt-1 text-small text-white/55">Closes {closingDate}</p>}
                      </div>
                      {vacancy.sector || vacancy.department ? (
                        <p className="text-body text-white/85">
                          <span className="sr-only">Sector: </span>
                          {vacancy.sector || vacancy.department}
                        </p>
                      ) : (
                        <p className="hidden text-body text-white/40 md:block">
                          <span aria-hidden="true">—</span>
                          <span className="sr-only">Sector not specified</span>
                        </p>
                      )}
                      <div className="flex items-center justify-between gap-4">
                        <p className="flex items-center gap-2 text-body text-white/85">
                          <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-gold" />
                          <span className="sr-only">Location: </span>
                          {vacancy.location || "Location not specified"}
                        </p>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-5 w-5 shrink-0 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold motion-reduce:transition-none"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>

              {totalPages > 1 && (
                <nav aria-label="Vacancy pages" className="mt-10 flex items-center justify-between">
                  {currentPage > 1 ? (
                    <Link href={buildPageHref(filters, currentPage - 1)} className="inline-flex min-h-11 items-center rounded-md border border-white/25 px-4 font-semibold text-white hover:border-gold hover:text-gold">Previous page</Link>
                  ) : <span />}
                  <p className="text-small text-white/70" aria-current="page">Page {currentPage} of {totalPages}</p>
                  {currentPage < totalPages ? (
                    <Link href={buildPageHref(filters, currentPage + 1)} className="inline-flex min-h-11 items-center rounded-md border border-white/25 px-4 font-semibold text-white hover:border-gold hover:text-gold">Next page</Link>
                  ) : <span />}
                </nav>
              )}
            </>
          )}
        </Container>
      </section>
    </main>
  );
}
