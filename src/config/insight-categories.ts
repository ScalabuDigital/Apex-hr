/**
 * Canonical insight category taxonomy. Source of truth:
 * docs/MASTER-SITEMAP.md section 12, cross-checked against the "Insight
 * category" rows (8 Confirmed/Corrected) in the Master Routes sheet of
 * docs/Apex_HR_Master_Sitemap_and_URL_Register.xlsx.
 *
 * `wordpressCategorySlugs` maps each approved topic onto the WordPress
 * (blog.apexhrllc.co.uk) categories whose posts belong under it. A topic is
 * only shown on /insights/, served at /insights/[slug]/ and listed in the
 * sitemap while at least one mapped WordPress category has published posts
 * (see src/lib/insights/active-categories.ts). An empty list means "no
 * WordPress posts belong here yet", so the topic stays hidden. The mapping
 * is editorial: review it whenever WordPress categories are added or renamed.
 */

export interface InsightCategoryItem {
  slug: string;
  title: string;
  summary: string;
  wordpressCategorySlugs: readonly string[];
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
    wordpressCategorySlugs: [],
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
    wordpressCategorySlugs: [],
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
