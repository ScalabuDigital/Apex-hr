# Sector Pages — Topical Authority and Query Fan-out

- Prepared: 21 November 2026
- Scope: the 17 pages under `/sector/` (`sector-sitemap.xml`)
- Status of all copy: `ai-draft`, `stakeholder-review-required` and `legalReviewRequired: true` (CLAUDE.md section 31)
- Data: `src/content/sectors-enhancements.ts`, merged in `src/content/sectors-data.ts`
- Tests: `tests/unit/sector-fan-out.test.ts`

## 1. Problem

Each sector page targeted one head query, "HR company for [sector] in the UK", with four generic challenges, three related services, a one-line recruitment paragraph and **one** FAQ. Google AI Overviews/AI Mode and other answer engines expand a head query into related sub-queries ("query fan-out") and pick the pages that answer those sub-queries. The pages had almost nothing for them to retrieve, and the copy was close to interchangeable across sectors.

## 2. Method

For each sector, the head query was expanded along the fan-out patterns answer engines typically use:

| Fan-out pattern | Example (care homes) |
|---|---|
| Sub-segment / entity | HR for residential vs nursing homes; CQC, Care Inspectorate, CIW |
| How-to / process | How to recruit care workers; safer recruitment and DBS checks |
| Compliance / risk | Sleep-in pay and rotas; sponsored overseas care staff |
| Comparison / decision | Agency staff vs an internal bank; outsourced vs in-house HR |
| Problem / symptom | Staff retention; handling safeguarding allegations |
| Service-intent | Workplace investigations, HR policies, sponsorship HR support |

Each sub-intent became an H3 topic block (6 per sector) or an FAQ (3–4 new per sector), and was linked to one of the 48 real services where relevant.

## 3. What changed per sector page

| Element | Before | After |
|---|---|---|
| Meta description | Generic pattern | Sector-specific sub-topics, ≤160 chars, approved pattern kept |
| Title / H1 | `HR Company for [Sector] in the UK` | Unchanged (approved keyphrase, locked by tests) |
| Challenges | 4 | 6 |
| Related services (crawlable links) | 3 | 6 |
| Fan-out topic section (new, H2 + 6 H3) | none | 102 unique topic blocks across 17 pages |
| FAQs (feeds visible accordion and `FAQPage` JSON-LD) | 1 | 4–5 |

All topic headings and FAQ questions are unique across the 17 pages (tested), so the pages are not near-duplicates of one another.

## 4. Entities covered (selection)

- Healthcare: GMC, NMC, HCPC, GDC registration; NHS pay benchmarking; overseas health and care sponsorship
- Financial services: SM&CR, regulatory references, remuneration rules, non-financial misconduct, pay gap reporting
- Education: Keeping Children Safe in Education, single central record, academy conversion TUPE, LADO
- Construction: CIS and false self-employment, CSCS, TUPE on contracts, drugs and alcohol policies
- Distribution: agency worker equal treatment, drivers' hours and CPC, contract-logistics TUPE
- Hospitality: fair allocation of tips and tronc, right-to-work and illegal working, young workers on licensed premises
- IT / life sciences / engineering: IR35, EMI-style share options, Global Talent and sponsorship, security clearance, Engineering Council registration

## 5. Guardrails

- No clients, statistics, prices, timescales or outcomes claimed; "can support" language only.
- No time-sensitive legal thresholds hard-coded; changing areas (care-worker immigration, zero-hours reform, restrictive covenants) are described as changing, with a pointer to current guidance or advisers.
- Regulated advice (immigration, tax, legal) is explicitly left with regulated advisers.

## 6. Review before indexing

1. Legal review of every topic and FAQ marked with employment-law content (all 17 sectors).
2. Stakeholder confirmation that Apex HR offers each linked service for that sector.
3. Recheck after any change to immigration rules, employment-rights reforms, or the tips/holiday-pay rules.
4. Once Search Console data exists, compare impressions for the sub-queries above and extend topics where real demand appears.
