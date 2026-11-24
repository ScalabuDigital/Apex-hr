import { describe, expect, it } from "vitest";
import { insightCategories } from "@/config/insight-categories";
import { filterActiveInsightCategories } from "@/lib/insights/active-categories";

describe("filterActiveInsightCategories", () => {
  it("keeps only topics with at least one mapped WordPress category that has posts, in config order", () => {
    const counts = new Map([
      ["people-strategy-in-uk", 3],
      ["workforce-management-in-uk", 2],
      ["unmapped-category", 40],
    ]);
    expect(filterActiveInsightCategories(counts).map((c) => c.slug)).toEqual(["workforce-strategy", "people-strategy"]);
  });

  it("treats any one non-empty mapped category as enough", () => {
    const counts = new Map([["recruitment-talent-management-in-uk", 1]]);
    expect(filterActiveInsightCategories(counts).map((c) => c.slug)).toEqual(["performance-talent"]);
  });

  it("returns nothing when no WordPress category has posts", () => {
    expect(filterActiveInsightCategories(new Map())).toEqual([]);
  });

  it("never activates a topic that has no WordPress mapping", () => {
    const everything = new Map<string, number>();
    for (const category of insightCategories) {
      for (const slug of category.wordpressCategorySlugs) everything.set(slug, 1);
    }
    const active = filterActiveInsightCategories(everything).map((c) => c.slug);
    for (const category of insightCategories.filter((c) => c.wordpressCategorySlugs.length === 0)) {
      expect(active).not.toContain(category.slug);
    }
  });
});
