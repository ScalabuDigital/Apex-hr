import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { EmptyEditorialState } from "@/components/content/empty-editorial-state";
import { InsightCard } from "@/components/content/insight-card";
import { LinkButton } from "@/components/ui/link-button";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { getInsightCategory, getMappedWordPressCategoryIds, insightCategories } from "@/config/insight-categories";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCategories, getPosts, toInsightPreview } from "@/lib/wordpress";
import { routes } from "@/config/routes";
import type { RouteRecord } from "@/types/route";
import { getBreadcrumbJsonLd, getCollectionPageJsonLd, toJsonLdScript } from "@/lib/seo/structured-data";

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

const POSTS_PER_PAGE = 12;

export function generateStaticParams() {
  return insightCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getInsightCategory(slug);
  return buildMetadata({
    title: category ? `${category.title} Insights` : "Insight Category",
    description: category?.summary,
    path: `/insights/${slug}/`,
    index: routes.insights.readyToIndex,
  });
}

export default async function InsightCategoryPage({ params, searchParams }: PageProps) {
  const { category: slug } = await params;
  const category = getInsightCategory(slug);

  if (!category) {
    notFound();
  }

  const { page: pageParam } = await searchParams;
  const requestedPage = Number(pageParam);
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const categoryRoute: RouteRecord = {
    id: category.slug,
    label: category.title,
    path: `/insights/${category.slug}/`,
    status: "confirmed",
    readyToIndex: routes.insights.readyToIndex,
  };

  // Posts come from the WordPress categories mapped to this topic in
  // src/config/insight-categories.ts. A topic with no mapped categories
  // that have posts skips the posts request and shows the empty state
  // (the /insights/ hub doesn't link to it in that case).
  const categoryIds = getMappedWordPressCategoryIds(category, await getCategories());
  const { posts, totalPages, unavailable } =
    categoryIds.length > 0
      ? await getPosts({ categoryIds, page, perPage: POSTS_PER_PAGE })
      : { posts: [], totalPages: 0, unavailable: false };
  const insights = posts.map(toInsightPreview);

  // CollectionPage/ItemList JSON-LD lists exactly the articles rendered on
  // this page, so the schema always matches the visible content.
  const jsonLd = [
    getCollectionPageJsonLd({
      path: categoryRoute.path,
      name: `${category.title} Insights`,
      description: category.summary,
      items: insights.map((insight) => ({ name: insight.title, path: insight.href })),
    }),
    getBreadcrumbJsonLd(routes.home.label, [routes.insights, categoryRoute]),
  ];

  return (
    <Section tone="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLdScript(jsonLd) }} />
      <Breadcrumbs trail={[routes.insights, categoryRoute]} />
      <div className="mt-6 max-w-[var(--container-reading)]">
        <SectionKicker>Insights</SectionKicker>
        <h1 className="mt-3 font-display text-h1 font-bold text-navy">{category.title} Insights</h1>
        <p className="mt-4 text-lead text-text-secondary">{category.summary}</p>
      </div>
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
              <nav aria-label={`${category.title} insights pagination`} className="mt-10 flex items-center justify-between gap-4">
                {page > 1 ? (
                  <LinkButton href={`${categoryRoute.path}?page=${page - 1}`} variant="secondary" surface="light">
                    Previous
                  </LinkButton>
                ) : (
                  <span />
                )}
                <p className="text-small text-text-secondary">
                  Page {page} of {totalPages}
                </p>
                {page < totalPages ? (
                  <LinkButton href={`${categoryRoute.path}?page=${page + 1}`} variant="secondary" surface="light">
                    Next
                  </LinkButton>
                ) : (
                  <span />
                )}
              </nav>
            )}
          </>
        ) : (
          <EmptyEditorialState message={`No ${category.title.toLowerCase()} articles are published yet.`} />
        )}
      </div>
    </Section>
  );
}
