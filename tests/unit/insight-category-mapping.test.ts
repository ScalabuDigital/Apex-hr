import { describe, expect, it } from "vitest";
import { getInsightCategory, getMappedWordPressCategoryIds, insightCategories } from "@/config/insight-categories";

describe("insight topic → WordPress category mapping", () => {
  const wordpressCategories = [
    { id: 61, slug: "people-strategy-in-uk" },
    { id: 224, slug: "workforce-management-in-uk" },
    { id: 1, slug: "uncategorized" },
  ];

  it("returns the IDs of mapped WordPress categories that have posts", () => {
    expect(getMappedWordPressCategoryIds(getInsightCategory("people-strategy")!, wordpressCategories)).toEqual([61]);
    expect(getMappedWordPressCategoryIds(getInsightCategory("workforce-strategy")!, wordpressCategories)).toEqual([224]);
  });

  it("returns nothing for a topic whose mapped categories have no posts", () => {
    expect(getMappedWordPressCategoryIds(getInsightCategory("reward")!, wordpressCategories)).toEqual([]);
    expect(getMappedWordPressCategoryIds(getInsightCategory("hr-technology")!, wordpressCategories)).toEqual([]);
  });

  it("never maps one WordPress category to two topics", () => {
    const all = insightCategories.flatMap((category) => category.wordpressCategorySlugs);
    expect(new Set(all).size).toBe(all.length);
  });
});
