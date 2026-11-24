import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { EmptyEditorialState } from "@/components/content/empty-editorial-state";
import { InsightCard } from "@/components/content/insight-card";
import { LinkButton } from "@/components/ui/link-button";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { getMappedWordPressCategoryIds, insightCategories } from "@/config/insight-categories";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCategories, getPosts, toInsightPreview } from "@/lib/wordpress";
import { routes } from "@/config/routes";
import { getBreadcrumbJsonLd, getCollectionPageJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";

export const metadata = buildMetadata({
  title: "Insights",
  description: "HR and workforce insights from Apex HR, organised by topic.",
  path: routes.insights.path,
  index: routes.insights.readyToIndex,
});

interface InsightsPageProps {
  searchParams: Promise<{ page?: string }>;
}

const POSTS_PER_PAGE = 12;

export default async function InsightsPage({ searchParams }: InsightsPageProps) {
  const { page: pageParam } = await searchParams;
  const requestedPage = Number(pageParam);
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const [{ posts, totalPages, unavailable }, wordpressCategories] = await Promise.all([
    getPosts({ page, perPage: POSTS_PER_PAGE }),
    getCategories(),
  ]);
  const insights = posts.map(toInsightPreview);

  // Only list approved topics that currently have published posts, via the
  // WordPress category mapping in src/config/insight-categories.ts.
  const topicsWithPosts = insightCategories.filter(
    (category) => getMappedWordPressCategoryIds(category, wordpressCategories).length > 0,
  );

  // SEO renderability audit remediation: CollectionPage/ItemList JSON-LD
  // for the insight topics that have posts — the hub's own rendered topic
  // link list (see the <ul> below), matching exactly how the Services and
  // Sector hubs already describe their own category grids. Deliberately not
  // built from the paginated `insights` articles above: that list changes
  // per page/session, while the topic grid is the hub's durable content —
  // and per-article schema already exists on each article's own page
  // (BlogPosting).
  const jsonLd = [
    getCollectionPageJsonLd({
      path: routes.insights.path,
      name: "HR and workforce insights",
      description: "HR and workforce insights from Apex HR, organised by topic.",
      items: topicsWithPosts.map((category) => ({ name: category.title, path: `/insights/${category.slug}/` })),
    }),
    getBreadcrumbJsonLd(routes.home.label, [routes.insights]),
  ];

  return (
    <Section tone="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }} />
      <Breadcrumbs trail={[routes.insights]} />
      <div className="mt-6 max-w-[var(--container-reading)]">
        <SectionKicker>Insights</SectionKicker>
        <h1 className="mt-3 font-display text-h1 font-bold text-navy">
          HR and workforce insights
        </h1>
        <p className="mt-4 text-lead text-text-secondary">
          Articles, guides and commentary on HR, recruitment and workforce
          strategy, organised by topic below.
        </p>
      </div>

      {topicsWithPosts.length > 0 && (
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topicsWithPosts.map((category) => (
            <li key={category.slug}>
              {/* Whole tile is one link (matching ServiceCard), not just the title. */}
              <Link
                href={`/insights/${category.slug}/`}
                className="group flex h-full flex-col border border-border-subtle bg-surface-card p-5 transition-colors duration-(--duration-fast) hover:border-navy focus-visible:border-navy"
              >
                <span className="font-display text-h4 font-bold text-navy group-hover:underline">
                  {category.title}
                </span>
                <p className="mt-2 flex-1 text-body text-text-secondary">{category.summary}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-small font-semibold text-navy">
                  Explore topic
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 text-gold transition-transform duration-(--duration-fast) group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10">
        {unavailable ? (
          <EmptyEditorialState message="Articles can't be loaded right now. Please check back shortly." />
        ) : insights.length > 0 ? (
          <>
            <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {insights.map((insight) => (
                <StaggerItem key={insight.id}>
                  <InsightCard insight={insight} />
                </StaggerItem>
              ))}
            </StaggerContainer>
            {totalPages > 1 && (
              <nav aria-label="Insights pagination" className="mt-10 flex items-center justify-between gap-4">
                {page > 1 ? (
                  <LinkButton href={`${routes.insights.path}?page=${page - 1}`} variant="secondary" surface="light">
                    Previous
                  </LinkButton>
                ) : (
                  <span />
                )}
                <p className="text-small text-text-secondary">
                  Page {page} of {totalPages}
                </p>
                {page < totalPages ? (
                  <LinkButton href={`${routes.insights.path}?page=${page + 1}`} variant="secondary" surface="light">
                    Next
                  </LinkButton>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </>
        ) : (
          <EmptyEditorialState message="Approved articles and reports will appear here once published. No articles are published yet." />
        )}
      </div>
    </Section>
  );
}
