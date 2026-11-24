import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SectionKicker } from "@/components/ui/section-kicker";
import { EmptyEditorialState } from "@/components/content/empty-editorial-state";
import { InsightCard } from "@/components/content/insight-card";
import { LinkButton } from "@/components/ui/link-button";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger";
import { getInsightCategory, insightCategories } from "@/config/insight-categories";
import { getActiveInsightCategories } from "@/lib/insights/active-categories";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPosts, toInsightPreview } from "@/lib/wordpress";
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

export async function generateMetadata({ params }: Pick<PageProps, "params">): Promise<Metadata> {
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

  const [active, postsResult] = await Promise.all([
    getActiveInsightCategories(),
    getPosts({ page, perPage: POSTS_PER_PAGE, categorySlugs: category.wordpressCategorySlugs }),
  ]);

  // Only topics with published articles are real pages. When WordPress is
  // unreachable we can't tell, so render the honest "unavailable" state
  // rather than a 404 that would drop a live topic from search.
  const unavailable = active.unavailable || postsResult.unavailable;
  if (!unavailable && !active.categories.some((item) => item.slug === category.slug)) {
    notFound();
  }

  const insights = postsResult.posts.map(toInsightPreview);
  const { totalPages } = postsResult;

  const categoryRoute: RouteRecord = {
    id: category.slug,
    label: category.title,
    path: `/insights/${category.slug}/`,
    status: "confirmed",
    readyToIndex: routes.insights.readyToIndex,
  };

  // CollectionPage/ItemList JSON-LD lists exactly the articles rendered
  // below, using their public root-level article URLs (D-016).
  const jsonLd = [
    getCollectionPageJsonLd({
      path: categoryRoute.path,
      name: `${category.title} Insights`,
      description: category.summary,
      items: postsResult.posts.map((post) => ({ name: post.title, path: `/${post.slug}/` })),
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
          <EmptyEditorialState message="There are no more articles on this page." />
        )}
      </div>
    </Section>
  );
}
