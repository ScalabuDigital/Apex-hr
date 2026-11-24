import { insightCategories, type InsightCategoryItem } from "@/config/insight-categories";
import { getCategoryPostCounts } from "@/lib/wordpress";

export interface ActiveInsightCategoriesResult {
  /** Approved topics with at least one published WordPress post, in config order. */
  categories: InsightCategoryItem[];
  /** True when WordPress could not be reached, so activity is unknown. */
  unavailable: boolean;
}

/** Pure filter, separated from the fetch so it can be unit-tested directly. */
export function filterActiveInsightCategories(
  counts: ReadonlyMap<string, number>,
  categories: readonly InsightCategoryItem[] = insightCategories,
): InsightCategoryItem[] {
  return categories.filter((category) =>
    category.wordpressCategorySlugs.some((slug) => (counts.get(slug) ?? 0) > 0),
  );
}

/**
 * The approved insight topics that currently have published articles.
 * Topics whose mapped WordPress categories are all empty are left out of
 * the hub grid, the sitemap and the category routes (which 404), so the
 * site never presents a topic with nothing in it.
 */
export async function getActiveInsightCategories(): Promise<ActiveInsightCategoriesResult> {
  const counts = await getCategoryPostCounts();
  if (counts === null) {
    return { categories: [], unavailable: true };
  }
  return { categories: filterActiveInsightCategories(counts), unavailable: false };
}
