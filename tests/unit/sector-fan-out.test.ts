import { describe, expect, it } from "vitest";
import { sectors } from "@/config/sectors";
import { sectorContent } from "@/content/sectors-data";
import { sectorEnhancements } from "@/content/sectors-enhancements";
import { getService } from "@/config/services";

/**
 * Sector topical-authority / fan-out pass (docs/seo/sector-fan-out-research.md).
 */
describe("Sector fan-out content", () => {
  it("every one of the 17 sectors has an enhancement", () => {
    for (const sector of sectors) {
      expect(sectorEnhancements[sector.slug], sector.slug).toBeDefined();
    }
    expect(Object.keys(sectorEnhancements).sort()).toEqual(sectors.map((s) => s.slug).sort());
  });

  it("each sector has at least six topics, six challenges and four FAQs with unique ids", () => {
    for (const content of sectorContent) {
      expect(content.topics?.length ?? 0, content.slug).toBeGreaterThanOrEqual(6);
      expect(content.challenges.length, content.slug).toBeGreaterThanOrEqual(6);
      expect(content.faqs.length, content.slug).toBeGreaterThanOrEqual(4);
      const ids = content.faqs.map((f) => f.id);
      expect(new Set(ids).size, `${content.slug} faq ids`).toBe(ids.length);
    }
  });

  it("topic headings and FAQ questions are unique across all sectors (no near-duplicate pages)", () => {
    const headings = sectorContent.flatMap((s) => s.topics?.map((t) => t.heading) ?? []);
    expect(new Set(headings).size).toBe(headings.length);
    const questions = sectorContent.flatMap((s) => s.faqs.map((f) => f.question));
    expect(new Set(questions).size).toBe(questions.length);
  });

  it("meta descriptions stay within 120-160 characters", () => {
    for (const content of sectorContent) {
      expect(content.metaDescription.length, content.slug).toBeGreaterThanOrEqual(120);
      expect(content.metaDescription.length, content.slug).toBeLessThanOrEqual(160);
    }
  });

  it("every related service slug resolves to a real service and none repeat", () => {
    for (const content of sectorContent) {
      for (const slug of content.relatedServiceSlugs) {
        expect(getService(slug), `${content.slug} -> ${slug}`).toBeDefined();
      }
      expect(new Set(content.relatedServiceSlugs).size).toBe(content.relatedServiceSlugs.length);
    }
  });

  it("records legal approval (21 November 2026) for every enhanced sector", () => {
    for (const content of sectorContent) {
      expect(content.legalReviewRequired, content.slug).toBe(false);
    }
  });
});
