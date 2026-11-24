/**
 * Canonical insight category taxonomy. Source of truth:
 * docs/MASTER-SITEMAP.md section 12, cross-checked against the "Insight
 * category" rows (8 Confirmed/Corrected) in the Master Routes sheet of
 * docs/Apex_HR_Master_Sitemap_and_URL_Register.xlsx.
 *
 * Articles live in WordPress (D-016), whose own categories do not use these
 * 8 topic slugs. `wordpressCategorySlugs` maps each approved topic to the
 * WordPress categories whose posts belong under it; the /insights/ hub only
 * shows a topic when at least one mapped WordPress category has posts.
 * WordPress categories that fit no topic (e.g. "Uncategorized", "Content")
 * are deliberately left unmapped. Editors can extend a mapping here without
 * changing any public URL.
 */

export interface InsightCategoryItem {
  slug: string;
  title: string;
  summary: string;
  /** WordPress category slugs whose posts are listed under this topic. */
  wordpressCategorySlugs: string[];
}

export const insightCategories: InsightCategoryItem[] = [
  {
    slug: "organisation-development",
    title: "Organisation Development",
    summary: "Structuring, restructuring and developing organisations through change.",
    wordpressCategorySlugs: ["redundancy-restructuring-support-in-uk"],
  },
  {
    slug: "learning-development",
    title: "Learning & Development",
    summary: "Building leadership and workforce capability.",
    wordpressCategorySlugs: ["hr-leadership-in-uk"],
  },
  {
    slug: "performance-talent",
    title: "Performance & Talent",
    summary: "Performance management, succession and talent decisions.",
    wordpressCategorySlugs: ["talent-management-in-uk", "recruitment-talent-management-in-uk"],
  },
  {
    slug: "reward",
    title: "Reward",
    summary: "Pay, benefits and reward strategy.",
    wordpressCategorySlugs: ["payroll-advisory-in-uk", "payroll-services-in-uk"],
  },
  {
    slug: "employee-experience",
    title: "Employee Experience",
    summary: "Engagement, wellbeing and the employee journey.",
    wordpressCategorySlugs: [],
  },
  {
    slug: "hr-technology",
    title: "HR Technology",
    summary: "HR systems, analytics and digital transformation.",
    wordpressCategorySlugs: [],
  },
  {
    slug: "workforce-strategy",
    title: "Workforce Strategy",
    summary: "Strategic workforce planning and organisational design.",
    wordpressCategorySlugs: ["workforce-management-in-uk"],
  },
  {
    slug: "people-strategy",
    title: "People Strategy",
    summary: "Connecting HR priorities to business strategy.",
    wordpressCategorySlugs: ["people-strategy-in-uk"],
  },
];

export function getInsightCategory(slug: string) {
  return insightCategories.find((category) => category.slug === slug);
}

/**
 * Resolves a topic's mapped WordPress category IDs from the list of
 * WordPress categories that currently have published posts (`getCategories`
 * already hides empty ones). An empty result means the topic has no posts.
 */
export function getMappedWordPressCategoryIds(
  category: InsightCategoryItem,
  wordpressCategories: ReadonlyArray<{ id: number; slug: string }>,
): number[] {
  const wanted = new Set(category.wordpressCategorySlugs);
  return wordpressCategories.filter((term) => wanted.has(term.slug)).map((term) => term.id);
}
