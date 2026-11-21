import type { ContentFaqItem } from "@/types/content";

/**
 * Sector topical-authority and query fan-out pass
 * (docs/seo/sector-fan-out-research.md, 21 November 2026).
 *
 * Each of the 17 sector pages previously answered only its head query
 * ("HR company for [sector] in the UK") with four challenges and one FAQ.
 * Search engines and AI answer engines expand that head query into related
 * sub-queries ("fan-out"): which HR policies the sector needs, how to recruit
 * its hard-to-fill roles, the sector-specific employment issues, outsourced
 * HR versus in-house, and so on. These records give each page genuine,
 * sector-specific coverage of those sub-intents.
 *
 * Rules followed (CLAUDE.md sections 2, 16 and 31):
 * - No clients, statistics, placements, prices, timescales or outcomes are
 *   claimed. "Can support" language only.
 * - Regulators, schemes and checks are named only where they are a
 *   well-established feature of the sector, in informational, non-absolute
 *   language. Nothing here is legal advice, and no time-sensitive legal
 *   thresholds are hard-coded. Legal review of all 17 records was approved
 *   on 21 November 2026 (see docs/seo/sector-fan-out-research.md). Any
 *   later change to legal-adjacent copy needs fresh legal review.
 * - Every record is ai-draft / stakeholder-review-required via manifest.ts.
 */

export interface SectorTopic {
  id: string;
  /** Rendered as an H3; phrased around the sub-query employers search. */
  heading: string;
  body: string;
}

export interface SectorEnhancement {
  /** Replaces the base meta description. Must keep the approved pattern. */
  metaDescription: string;
  /** Appended to the base challenges. */
  extraChallenges: string[];
  /** Curated, real service slugs appended to the base related services. */
  extraServiceSlugs: string[];
  topicsIntro: string;
  topics: SectorTopic[];
  /** Placed before the base FAQ. */
  faqs: ContentFaqItem[];
  legalReviewRequired: boolean;
}

export const sectorEnhancements: Record<string, SectorEnhancement> = {
  "hr-company-for-startups-and-scale-ups-in-the-uk": {
    metaDescription:
      "Apex HR is a specialist HR company for startups and scale-ups in the UK, covering first-hire contracts, HR policies, fractional HR and structured hiring.",
    extraChallenges: [
      "Knowing which contracts and policies are needed at each growth stage",
      "Designing reward and share options that attract early talent",
    ],
    extraServiceSlugs: [
      "employee-handbooks-and-hr-policies-firm-in-the-uk",
      "executive-compensation-and-share-schemes-firm-in-the-uk",
      "leadership-and-management-training-firm-in-the-uk",
    ],
    topicsIntro:
      "Outsourced HR for a startup looks very different at five people than at fifty. These are the questions founders and operations leads most often need answered as the team grows.",
    topics: [
      {
        id: "first-employee",
        heading: "Hiring your first employees",
        body:
          "Before the first hire, a UK startup typically needs a written statement of employment terms, right-to-work checks, PAYE registration, a workplace pension assessment and employer's liability insurance. Putting these in place properly at the start avoids retrofitting contracts later.",
      },
      {
        id: "policies-by-stage",
        heading: "Which HR policies a startup needs, and when",
        body:
          "Early on, a compact handbook covering disciplinary, grievance, absence, leave, equality and data protection is usually enough. Once founders no longer know everyone personally, policies on performance, flexible and hybrid working, expenses and conduct start to matter much more.",
      },
      {
        id: "fractional-vs-in-house",
        heading: "Fractional HR director or first in-house HR hire?",
        body:
          "Many scale-ups use a fractional HR director or retained HR support before they can justify a full-time people lead. The tipping point tends to depend on hiring volume, management maturity and the complexity of employee relations rather than a single headcount figure.",
      },
      {
        id: "hiring-fast",
        heading: "Hiring quickly without hiring wrong",
        body:
          "Structured interviews, a clear scorecard for each role and consistent decision-making help small teams hire at pace while keeping quality and fairness. They also make it easier to explain hiring decisions as the company grows.",
      },
      {
        id: "equity-reward",
        heading: "Share options and early-stage reward",
        body:
          "Share option schemes are commonly used by UK startups to compete with larger employers. Scheme design and tax treatment need specialist legal and tax input; HR's role is making sure equity is explained clearly and sits sensibly alongside salary and benefits.",
      },
      {
        id: "funding-due-diligence",
        heading: "Funding rounds, due diligence and restructures",
        body:
          "Investors often review employment contracts, IP assignment, policies and any disputes during due diligence. If plans change after a round, restructuring needs a fair, well-documented process to protect both people and the business.",
      },
    ],
    faqs: [
      {
        id: "startup-when-hr",
        question: "When should a startup get professional HR support?",
        answer:
          "Ideally before the first hire, so contracts and onboarding are right from day one. Many startups then add more structured support as they approach their first managers, first employee relations issue or a funding round.",
      },
      {
        id: "startup-first-hire-documents",
        question: "What HR documents does a startup need before hiring?",
        answer:
          "Typically an employment contract or written statement of terms, an offer letter, right-to-work evidence, a privacy notice for employees and a basic set of policies. The exact list depends on the role and how the business operates.",
      },
      {
        id: "startup-fractional",
        question: "Is a fractional HR director worthwhile for a scale-up?",
        answer:
          "It can be when you need senior people strategy, such as organisation design, reward or culture, but not a full-time role. Support can be scoped around your growth plans and stepped up or down as needs change.",
      },
      {
        id: "startup-due-diligence",
        question: "Can Apex HR help us prepare for investor due diligence?",
        answer:
          "Apex HR can review HR documentation and processes ahead of a round so gaps are found and addressed early. Legal due diligence itself remains with your legal advisers.",
      },
    ],
    legalReviewRequired: false,
  },

  "hr-company-for-professional-services-in-the-uk": {
    metaDescription:
      "Apex HR is a specialist HR company for professional services firms in the UK, from lateral hiring and partner succession to progression and reward frameworks.",
    extraChallenges: [
      "Balancing utilisation and billable targets with wellbeing",
      "Protecting client relationships when senior people move on",
    ],
    extraServiceSlugs: [
      "competency-frameworks-firm-in-the-uk",
      "reward-strategy-firm-in-the-uk",
      "employee-handbooks-and-hr-policies-firm-in-the-uk",
    ],
    topicsIntro:
      "Law firms, consultancies, agencies and other advisory businesses share a common challenge: the people are the product. These are the HR topics that most often shape outsourced HR support for professional services.",
    topics: [
      {
        id: "firm-types",
        heading: "HR for law firms, consultancies and agencies",
        body:
          "Partnerships, LLPs and limited companies each bring different governance around HR decisions. Support can be shaped around how your firm is structured, how fee-earners progress and who makes people decisions.",
      },
      {
        id: "lateral-hiring",
        heading: "Lateral hiring and senior moves",
        body:
          "Hiring experienced fee-earners or directors from competitors means assessing technical depth, client relationships and cultural fit together, while handling the process discreetly and respecting the candidate's existing obligations.",
      },
      {
        id: "restrictive-covenants",
        heading: "Restrictive covenants, notice periods and garden leave",
        body:
          "Post-employment restrictions are common in client-facing firms, but they are only likely to be enforceable where they are reasonable and protect a legitimate business interest. Contract wording should be reviewed with legal advisers, particularly as the law in this area may change.",
      },
      {
        id: "progression",
        heading: "Progression and promotion frameworks for fee-earners",
        body:
          "Clear competency frameworks make promotion decisions more consistent and easier to explain, covering technical skill, client handling, business development and people leadership at each level.",
      },
      {
        id: "partner-succession",
        heading: "Partner and senior leadership succession",
        body:
          "Retirements and departures at partner or director level can put client relationships at risk. Succession planning and talent mapping help firms identify and develop future leaders before the gap appears.",
      },
      {
        id: "reward-bonus",
        heading: "Bonus, profit share and reward structures",
        body:
          "Reward in professional services often blends salary, bonus and, at senior levels, profit share. Benchmarking and transparent criteria help firms stay competitive while keeping reward decisions fair.",
      },
    ],
    faqs: [
      {
        id: "ps-utilisation",
        question: "How can firms reduce burnout linked to billable targets?",
        answer:
          "By looking at workload allocation, resourcing, manager capability and how targets are set and reviewed, rather than treating wellbeing as a separate initiative. An engagement or wellbeing review can help identify where pressure builds.",
      },
      {
        id: "ps-team-move",
        question: "What should a firm do if a team is leaving for a competitor?",
        answer:
          "Act quickly and take legal advice on contractual obligations, while managing communication with clients and remaining staff carefully. HR support can help with process, retention conversations and backfilling roles.",
      },
      {
        id: "ps-promotion",
        question: "Can Apex HR design a promotion framework for our firm?",
        answer:
          "Yes. A competency or career framework can be built around your firm's levels, service lines and values, with input from partners and managers so it reflects how work is actually done.",
      },
    ],
    legalReviewRequired: false,
  },

  "hr-company-for-healthcare-in-the-uk": {
    metaDescription:
      "Apex HR is a specialist HR company for healthcare in the UK, helping clinics, GP and dental practices with clinical hiring, rotas, wellbeing and compliance.",
    extraChallenges: [
      "Benchmarking pay against NHS and independent-sector rates",
      "Supporting registration, revalidation and protected CPD time",
    ],
    extraServiceSlugs: [
      "skilled-worker-sponsorship-hr-support-firm-in-the-uk",
      "salary-benchmarking-firm-in-the-uk",
      "workplace-investigations-firm-in-the-uk",
    ],
    topicsIntro:
      "Independent healthcare providers, GP practices, dental groups and clinics face many of the same workforce pressures as the NHS with far smaller HR teams. These are the HR questions that most often come up.",
    topics: [
      {
        id: "provider-types",
        heading: "HR for private clinics, GP practices and dental practices",
        body:
          "Smaller healthcare providers often rely on a practice manager to handle HR alongside everything else. Outsourced or retained HR support can provide policies, employee relations advice and recruitment capacity without a full in-house team.",
      },
      {
        id: "registered-professionals",
        heading: "Recruiting registered clinicians and professionals",
        body:
          "Many healthcare roles require registration with a professional regulator, such as the GMC, NMC, HCPC or GDC. Recruitment should build in registration and qualification checks, references and, where the role requires it, criminal record checks.",
      },
      {
        id: "overseas-healthcare",
        heading: "Sponsoring overseas healthcare workers",
        body:
          "Overseas recruitment can widen the talent pool for some clinical roles, but immigration rules for health and care roles have changed several times in recent years. Employers should check current Home Office guidance and their sponsor duties before recruiting.",
      },
      {
        id: "rotas-working-time",
        heading: "Rotas, working time and absence",
        body:
          "Extended hours, on-call arrangements and short-notice cover can create working-time, rest-break and fatigue risks. Clear rota, absence and on-call policies help keep services safe and decisions consistent.",
      },
      {
        id: "nhs-benchmarking",
        heading: "Pay benchmarking against the NHS",
        body:
          "Independent providers often compete directly with NHS pay bands, pensions and leave. Benchmarking the whole package, not just salary, helps identify where an offer is competitive and where it needs work.",
      },
      {
        id: "clinical-investigations",
        heading: "Investigations involving clinical staff",
        body:
          "Conduct or capability concerns about registered professionals can involve both an internal process and, in some cases, a referral to the regulator. A fair, well-documented investigation protects patients, the employee and the organisation.",
      },
    ],
    faqs: [
      {
        id: "hc-practice-hr",
        question: "Can Apex HR provide outsourced HR for a GP or dental practice?",
        answer:
          "Yes. Retained HR support can cover contracts, policies, employee relations and recruitment for practices that do not have their own HR function, working alongside the practice manager.",
      },
      {
        id: "hc-sponsorship",
        question: "Can you help us sponsor overseas clinical staff?",
        answer:
          "Apex HR can support the HR side of sponsorship, such as role assessment, right-to-work processes and record keeping. Immigration advice should come from a regulated immigration adviser, and rules should be checked against current Home Office guidance.",
      },
      {
        id: "hc-wellbeing",
        question: "How can healthcare employers support staff wellbeing?",
        answer:
          "Approaches often combine manageable rotas, good line management, access to support after difficult incidents and clear routes to raise concerns. A wellbeing strategy works best when it addresses the causes of pressure, not only the symptoms.",
      },
    ],
    legalReviewRequired: false,
  },

  "hr-company-for-life-sciences-in-the-uk": {
    metaDescription:
      "Apex HR is a specialist HR company for life sciences in the UK, helping biotech, pharma and medtech employers with scientific hiring, global talent and growth.",
    extraChallenges: [
      "Managing grant-funded and fixed-term roles tied to funding cycles",
      "Competing with larger organisations on reward and career paths",
    ],
    extraServiceSlugs: [
      "skilled-worker-sponsorship-hr-support-firm-in-the-uk",
      "competency-frameworks-firm-in-the-uk",
      "executive-compensation-and-share-schemes-firm-in-the-uk",
    ],
    topicsIntro:
      "Biotech spin-outs, pharma, medtech and research organisations each move through distinct growth stages. These are the people topics that most often shape HR and recruitment support in life sciences.",
    topics: [
      {
        id: "biotech-scaling",
        heading: "HR for biotech and medtech scale-ups",
        body:
          "Moving from a small research team to a clinical or commercial organisation brings new roles, management layers and policies. HR foundations need to scale with the science and the funding.",
      },
      {
        id: "scientific-recruitment",
        heading: "Recruiting specialist scientific talent",
        body:
          "Niche scientific, regulatory and quality roles often draw on a small, international pool of candidates. Search-style approaches, careful role scoping and technical input from your own scientists usually produce stronger shortlists.",
      },
      {
        id: "global-talent",
        heading: "International hiring and visas",
        body:
          "Specialist candidates may be based overseas or need sponsorship to work in the UK. The available visa routes and sponsor duties should be checked against current Home Office guidance before an offer is made.",
      },
      {
        id: "fixed-term",
        heading: "Fixed-term contracts and funding cycles",
        body:
          "Grant-funded and project roles are often fixed-term. Employers should understand the rights fixed-term employees have, including protection against less favourable treatment, and plan fairly for the end of funding.",
      },
      {
        id: "ip-confidentiality",
        heading: "IP, confidentiality and equity",
        body:
          "Employment contracts in research-led businesses usually need clear intellectual property and confidentiality terms, and equity is often part of reward. These should be drafted with legal and tax advisers and explained clearly to staff.",
      },
      {
        id: "quality-competence",
        heading: "Training records and quality culture",
        body:
          "In regulated quality environments, documented training and competence records matter. Competency frameworks and consistent HR records help support the quality system and give scientists clear development routes.",
      },
    ],
    faqs: [
      {
        id: "ls-spin-out",
        question: "Can Apex HR support a university spin-out hiring its first staff?",
        answer:
          "Yes. Support can cover contracts, policies, first hires and the move from academic to commercial ways of working, scaled to the size of the team.",
      },
      {
        id: "ls-funding-end",
        question: "What happens when funding for a fixed-term role ends?",
        answer:
          "Depending on length of service and circumstances, the end of a fixed-term contract can be a dismissal and may be a redundancy, so a fair process is usually needed. Take advice on the specific situation before the contract ends.",
      },
      {
        id: "ls-overseas",
        question: "Can you help recruit scientists from outside the UK?",
        answer:
          "International search can be scoped as part of the brief. Apex HR can support the HR side of sponsorship, while immigration advice should come from a regulated adviser.",
      },
    ],
    legalReviewRequired: false,
  },

  "hr-company-for-it-in-the-uk": {
    metaDescription:
      "Apex HR is a specialist HR company for IT and tech employers in the UK, covering technical hiring, IR35 and contractors, career ladders and reward benchmarking.",
    extraChallenges: [
      "Managing contractors and IR35 status determinations",
      "Setting fair policies for remote, hybrid and international teams",
    ],
    extraServiceSlugs: [
      "contract-staffing-firm-in-the-uk",
      "competency-frameworks-firm-in-the-uk",
      "ai-workplace-policy-and-hr-integration-firm-in-the-uk",
    ],
    topicsIntro:
      "Software houses, SaaS businesses, managed service providers and in-house technology teams all compete for the same skills. These are the HR and recruitment topics tech employers most often need help with.",
    topics: [
      {
        id: "technical-assessment",
        heading: "Recruiting developers and technical specialists",
        body:
          "Strong technical hiring uses assessments that reflect the actual work, such as pairing exercises or practical reviews, alongside structured interviews. Lengthy unpaid take-home tests can deter good candidates.",
      },
      {
        id: "ir35",
        heading: "Contractors and IR35",
        body:
          "Many tech businesses rely on contractors. Where the off-payroll working rules apply, medium and large clients are typically responsible for determining employment status, so contractor engagement needs a clear, documented process with input from tax advisers.",
      },
      {
        id: "remote-international",
        heading: "Remote, hybrid and international employees",
        body:
          "Distributed teams need clear policies on where people can work, equipment, working hours and communication. Employing someone abroad can create tax and employment-law obligations in that country, so specialist advice is important.",
      },
      {
        id: "career-ladders",
        heading: "Engineering career ladders",
        body:
          "Separate individual-contributor and management tracks let senior engineers progress without being pushed into people management. A clear framework also makes pay and promotion decisions easier to explain.",
      },
      {
        id: "tech-reward",
        heading: "Reward and equity benchmarking for tech roles",
        body:
          "Pay for technical roles can move quickly and varies by skill set and location. Regular benchmarking helps avoid both overpaying new hires and losing existing staff to the market.",
      },
      {
        id: "ai-policy",
        heading: "AI use policies for technical teams",
        body:
          "Teams increasingly use AI coding and productivity tools. A workplace AI policy can set expectations on approved tools, confidential data, code ownership and human review.",
      },
    ],
    faqs: [
      {
        id: "it-ir35-help",
        question: "Can Apex HR help us manage contractors and IR35?",
        answer:
          "Apex HR can help build the HR process around contractor engagement and status decisions, and support contract staffing. Tax determinations should be made with appropriate tax advice.",
      },
      {
        id: "it-career-framework",
        question: "Can you build a career framework for our engineering team?",
        answer:
          "Yes. A framework can be designed around your levels, technical disciplines and values, covering both individual-contributor and management tracks.",
      },
      {
        id: "it-hiring-speed",
        question: "How can we stop losing tech candidates to faster offers?",
        answer:
          "Shorter, well-organised interview processes, quick feedback, competitive benchmarked offers and a clear story about the role usually make the biggest difference.",
      },
    ],
    legalReviewRequired: false,
  },

  "hr-company-for-financial-services-in-the-uk": {
    metaDescription:
      "Apex HR is a specialist HR company for financial services in the UK, helping banks, insurers and fintechs with regulated hiring, reward and conduct-related HR.",
    extraChallenges: [
      "Building HR processes around SM&CR certification and regulatory references",
      "Handling conduct, whistleblowing and investigation matters carefully",
    ],
    extraServiceSlugs: [
      "workplace-investigations-firm-in-the-uk",
      "reward-strategy-firm-in-the-uk",
      "pay-equity-and-pay-gap-reporting-firm-in-the-uk",
    ],
    topicsIntro:
      "Banks, wealth managers, insurers, brokers and fintechs share a regulated operating environment that shapes almost every HR decision. These are the people topics that most often come up in financial services.",
    topics: [
      {
        id: "smcr",
        heading: "HR's role in the Senior Managers and Certification Regime",
        body:
          "For firms within its scope, SM&CR affects how senior roles are defined, how certified staff are assessed as fit and proper, and how conduct rules training is delivered. HR processes need to support these obligations alongside the compliance function.",
      },
      {
        id: "regulatory-references",
        heading: "Regulatory references and pre-employment screening",
        body:
          "Hiring into regulated roles often involves regulatory references, credit and criminal record checks where appropriate, and verification of qualifications. Building these steps into the timeline avoids delayed start dates.",
      },
      {
        id: "remuneration",
        heading: "Bonus and remuneration structures",
        body:
          "Variable pay in financial services can be subject to regulatory remuneration rules for some firms and roles. Reward design should be aligned with your compliance and legal advisers as well as market benchmarks.",
      },
      {
        id: "fintech",
        heading: "HR for fintech scale-ups",
        body:
          "Fintechs combine startup growth with regulated obligations. HR foundations, contracts and screening need to be right early, as they may be reviewed by regulators and investors.",
      },
      {
        id: "conduct",
        heading: "Conduct, whistleblowing and investigations",
        body:
          "Non-financial misconduct, including bullying and harassment, is an area of increasing regulatory interest. Fair, independent investigations and a trusted whistleblowing route protect both staff and the firm.",
      },
      {
        id: "pay-gap",
        heading: "Pay gap reporting and fair pay",
        body:
          "Larger employers must publish gender pay gap data, and many financial services firms also review ethnicity and wider pay equity. Understanding the causes of a gap is the first step to an action plan.",
      },
    ],
    faqs: [
      {
        id: "fs-smcr-support",
        question: "Can Apex HR help with SM&CR processes?",
        answer:
          "Apex HR can support the HR processes that sit around SM&CR, such as role documentation, screening steps and record keeping. Regulatory interpretation and approvals remain with your compliance function and advisers.",
      },
      {
        id: "fs-investigation",
        question: "Do you carry out independent workplace investigations?",
        answer:
          "Yes. Independent investigations into grievances, misconduct or whistleblowing concerns can be scoped with you, with a clear, evidence-based report at the end.",
      },
      {
        id: "fs-reward-benchmark",
        question: "Can you benchmark pay for specialist financial services roles?",
        answer:
          "Salary benchmarking can be scoped around specific roles, locations and peer groups, looking at the whole package as well as base pay.",
      },
    ],
    legalReviewRequired: false,
  },

  "hr-company-for-accountants-in-the-uk": {
    metaDescription:
      "Apex HR is a specialist HR company for accountants in the UK, helping practices recruit qualified staff, structure study support and manage busy seasons.",
    extraChallenges: [
      "Writing fair study-support and training-cost repayment agreements",
      "Adapting skill mixes as automation changes practice work",
    ],
    extraServiceSlugs: [
      "competency-frameworks-firm-in-the-uk",
      "ma-people-due-diligence-and-post-merger-integration-firm-in-the-uk",
      "employee-handbooks-and-hr-policies-firm-in-the-uk",
    ],
    topicsIntro:
      "Accountancy practices, from sole practitioners to multi-office firms, compete for the same qualified talent. These are the HR topics that most often matter to practice partners and managers.",
    topics: [
      {
        id: "qualified-recruitment",
        heading: "Recruiting qualified and part-qualified accountants",
        body:
          "Candidates are often studying towards ACCA, ICAEW, CIMA or AAT qualifications, so study support, progression and flexibility weigh heavily in their decisions alongside salary.",
      },
      {
        id: "study-support",
        heading: "Study support and training-cost clawback",
        body:
          "Many practices fund exams and study leave and ask for some repayment if the employee leaves soon after. Repayment terms should be agreed in writing in advance and be reasonable to be relied on.",
      },
      {
        id: "busy-season",
        heading: "Busy season, overtime and wellbeing",
        body:
          "Year-end and tax deadlines bring predictable peaks. Planning resourcing early, managing working time and recognising extra effort help reduce burnout and post-season departures.",
      },
      {
        id: "partner-track",
        heading: "Progression and the route to partner",
        body:
          "Clear career levels from trainee to manager, director and partner help retain staff once they qualify, which is often the point they consider moving.",
      },
      {
        id: "practice-mergers",
        heading: "Practice mergers and acquisitions",
        body:
          "When practices merge or are acquired, TUPE may apply, and harmonising terms afterwards needs care. People due diligence helps identify risks before completion.",
      },
      {
        id: "automation-skills",
        heading: "Changing skills as automation grows",
        body:
          "Cloud accounting and automation are shifting work from processing towards advisory. Workforce planning helps practices decide which skills to recruit and which to develop.",
      },
    ],
    faqs: [
      {
        id: "acc-clawback",
        question: "Can we ask staff to repay training costs if they leave?",
        answer:
          "Often yes, if a clear repayment agreement is signed before the costs are incurred and the terms are reasonable, for example reducing over time. Deductions from final pay need written authority. Take advice on the specific wording.",
      },
      {
        id: "acc-retain-qualified",
        question: "How can practices keep staff after they qualify?",
        answer:
          "Clear progression after qualification, a benchmarked pay review at the point of qualifying, interesting client work and flexibility tend to matter most.",
      },
      {
        id: "acc-merger",
        question: "Can Apex HR support a practice merger?",
        answer:
          "Yes. Support can cover people due diligence, TUPE process, communication and harmonisation of terms after completion, alongside your legal advisers.",
      },
    ],
    legalReviewRequired: false,
  },

  "hr-company-for-architects-in-the-uk": {
    metaDescription:
      "Apex HR is a specialist HR company for architects in the UK, supporting studios with architect and technologist hiring, student placements and HR foundations.",
    extraChallenges: [
      "Supporting students through placements and qualification",
      "Managing deadline-driven long hours fairly",
    ],
    extraServiceSlugs: [
      "salary-benchmarking-firm-in-the-uk",
      "workplace-wellbeing-and-mental-health-firm-in-the-uk",
      "redundancy-and-restructuring-support-firm-in-the-uk",
    ],
    topicsIntro:
      "Architecture practices are often small, design-led studios whose workload follows the project pipeline. These are the HR and recruitment questions practice principals most often ask.",
    topics: [
      {
        id: "architect-recruitment",
        heading: "Recruiting architects and architectural technologists",
        body:
          "The title 'architect' is protected in the UK and requires registration with the ARB, so registration should be checked where the role uses the title. Portfolio review, software skills and studio fit usually sit alongside interviews.",
      },
      {
        id: "students",
        heading: "Part 1 and Part 2 students and placements",
        body:
          "Students on placement need structured experience, supervision and fair pay. A clear placement framework helps practices attract good students and support them towards qualification.",
      },
      {
        id: "working-time",
        heading: "Long hours, overtime and working time",
        body:
          "Deadline-driven culture can lead to sustained long hours. Working time rules limit average weekly hours unless an individual opts out voluntarily, and practices benefit from monitoring workload and recognising overtime fairly.",
      },
      {
        id: "pipeline-changes",
        heading: "Managing workload dips and restructuring",
        body:
          "When the project pipeline slows, options may include redeployment, reduced hours or redundancy. Any of these needs a fair process and, where contracts allow, consultation before decisions are made.",
      },
      {
        id: "studio-culture",
        heading: "Studio culture and hybrid working",
        body:
          "Design work benefits from collaboration, but many staff now expect flexibility. A clear hybrid policy can protect studio culture while meeting requests for flexible working fairly.",
      },
      {
        id: "pay-transparency",
        heading: "Pay benchmarking and transparency",
        body:
          "Pay concerns are common in architecture. Benchmarking and transparent pay ranges help practices make fair offers and explain progression.",
      },
    ],
    faqs: [
      {
        id: "arch-hr-small",
        question: "Does a small studio need formal HR policies?",
        answer:
          "Every employer needs certain essentials, such as written terms and disciplinary and grievance procedures. A short, practical handbook is usually enough for a small studio, expanded as the practice grows.",
      },
      {
        id: "arch-overtime",
        question: "Do we have to pay architects for overtime?",
        answer:
          "It depends on the contract. Staff must not be paid below the minimum wage for hours worked, and working time limits apply unless opted out. Many practices use time off in lieu or overtime pay; take advice on your contracts.",
      },
      {
        id: "arch-redundancy",
        question: "Can you help if we need to reduce headcount?",
        answer:
          "Yes. Support can cover alternatives to redundancy, selection, consultation and communication, so the process is fair and well documented.",
      },
    ],
    legalReviewRequired: false,
  },

  "hr-company-for-care-homes-in-the-uk": {
    metaDescription:
      "Apex HR is a specialist HR company for care homes in the UK, supporting safer recruitment, rotas, inspection-ready HR records, retention and investigations.",
    extraChallenges: [
      "Keeping up with changes to overseas care-worker recruitment rules",
      "Reducing reliance on agency staff",
    ],
    extraServiceSlugs: [
      "skilled-worker-sponsorship-hr-support-firm-in-the-uk",
      "workplace-investigations-firm-in-the-uk",
      "employee-handbooks-and-hr-policies-firm-in-the-uk",
    ],
    topicsIntro:
      "Residential and nursing homes run around-the-clock services with tight staffing and close regulatory scrutiny. These are the HR topics care home owners and managers most often need support with.",
    topics: [
      {
        id: "care-recruitment",
        heading: "Recruiting care workers and nurses",
        body:
          "Values-based recruitment, quick responses to applicants and realistic job previews help attract carers who stay. Nursing roles also require NMC registration checks.",
      },
      {
        id: "safer-recruitment",
        heading: "Safer recruitment and DBS checks",
        body:
          "Care roles typically require an enhanced DBS check, including a barred list check where the role is eligible, plus references, a full employment history and right-to-work checks. Gaps in employment history should be explored and recorded.",
      },
      {
        id: "overseas-care",
        heading: "Overseas recruitment and sponsored care staff",
        body:
          "Immigration rules for overseas care workers have changed significantly in recent years. Homes that sponsor staff should check current Home Office guidance and keep their sponsor-duty records up to date.",
      },
      {
        id: "inspection-records",
        heading: "HR records ready for inspection",
        body:
          "Regulators such as the CQC in England, the Care Inspectorate in Scotland and CIW in Wales look at staffing, recruitment, training and supervision. Well-organised HR files make it easier to evidence safe staffing and a well-led service.",
      },
      {
        id: "rotas-pay",
        heading: "Rotas, sleep-ins and pay",
        body:
          "Shift patterns, sleep-in arrangements and travel time can raise minimum wage and working time questions. Pay and rota practices should be reviewed regularly against current rules.",
      },
      {
        id: "safeguarding-allegations",
        heading: "Handling safeguarding allegations against staff",
        body:
          "Allegations need a prompt, fair response that protects residents, involves the local safeguarding team where required and follows a clear disciplinary process. Referral duties to the DBS may apply in some cases.",
      },
    ],
    faqs: [
      {
        id: "care-retention",
        question: "How can care homes improve staff retention?",
        answer:
          "Good induction, regular supervision, fair and predictable rotas, recognition and clear progression into senior care roles all help. Exit and stay conversations show where to focus.",
      },
      {
        id: "care-agency",
        question: "How can we reduce our reliance on agency staff?",
        answer:
          "Usually through a steady recruitment pipeline, an internal bank of flexible staff, better retention and absence management. Workforce planning helps show the true cost of agency cover.",
      },
      {
        id: "care-dbs",
        question: "What checks are needed before a care worker starts?",
        answer:
          "Typically right-to-work, an enhanced DBS check with barred list check where eligible, references and a full employment history. Your regulator's requirements and your own policies should be followed.",
      },
    ],
    legalReviewRequired: false,
  },

  "hr-company-for-charity-in-the-uk": {
    metaDescription:
      "Apex HR is a specialist HR company for charities in the UK, helping lean teams with HR policies, volunteer management, funded roles and recruitment on a budget.",
    extraChallenges: [
      "Managing funding-dependent and fixed-term roles fairly",
      "Being clear on volunteer, worker and employee status",
    ],
    extraServiceSlugs: [
      "employee-handbooks-and-hr-policies-firm-in-the-uk",
      "redundancy-and-restructuring-support-firm-in-the-uk",
      "employer-branding-and-employee-value-proposition-evp-firm-in-the-uk",
    ],
    topicsIntro:
      "Charities and not-for-profits manage people with limited resource, a mixed workforce and accountability to trustees and funders. These are the HR questions that most often shape outsourced HR for charities.",
    topics: [
      {
        id: "small-charity-hr",
        heading: "HR support for small charities",
        body:
          "Many charities have no dedicated HR role, with people matters handled by the chief executive or operations lead. Retained HR support can provide policies, advice and a sounding board as issues arise.",
      },
      {
        id: "volunteers",
        heading: "Volunteers, workers and employees",
        body:
          "Volunteer agreements should avoid creating contractual obligations or payment beyond genuine expenses, otherwise a volunteer could be treated as a worker or employee. A clear volunteer policy helps keep the distinction right.",
      },
      {
        id: "funded-roles",
        heading: "Fixed-term and funding-linked roles",
        body:
          "Roles tied to a grant or contract often end when funding does. Planning early, consulting fairly and considering redeployment helps manage the end of funding well.",
      },
      {
        id: "trustee-governance",
        heading: "Trustee oversight of people decisions",
        body:
          "Trustees hold ultimate responsibility for the charity as employer. Clear delegation, HR reporting to the board and independent support on senior matters help good governance.",
      },
      {
        id: "reward-budget",
        heading: "Reward and recruitment on a tight budget",
        body:
          "Charities can rarely match private-sector salaries, so a clear employee value proposition, flexibility, development and purpose become important parts of the offer.",
      },
      {
        id: "charity-safeguarding",
        heading: "Safeguarding in charity recruitment",
        body:
          "Charities working with children or adults at risk need safer recruitment, appropriate DBS checks and clear safeguarding policies that apply to staff and volunteers alike.",
      },
    ],
    faqs: [
      {
        id: "charity-outsourced",
        question: "Is outsourced HR suitable for a small charity?",
        answer:
          "Often, yes. It gives access to experienced HR advice without the cost of a full-time role, with the level of support agreed around your needs and budget.",
      },
      {
        id: "charity-volunteer-policy",
        question: "Do charities need a volunteer policy?",
        answer:
          "It is good practice. A volunteer policy sets expectations on roles, expenses, supervision and safeguarding, and helps avoid volunteers being treated as workers.",
      },
      {
        id: "charity-funding-ends",
        question: "What should we do when funding for a role ends?",
        answer:
          "Plan early, look at alternative funding or redeployment, and follow a fair consultation and, where relevant, redundancy process. Take advice on the individual circumstances.",
      },
    ],
    legalReviewRequired: false,
  },

  "hr-company-for-construction-in-the-uk": {
    metaDescription:
      "Apex HR is a specialist HR company for construction in the UK, covering trades and site hiring, employment status, TUPE, safety-related HR and restructuring.",
    extraChallenges: [
      "Getting employment status right for subcontractors and self-employed trades",
      "Managing TUPE transfers when contracts change hands",
    ],
    extraServiceSlugs: [
      "tupe-advisory-firm-in-the-uk",
      "contract-staffing-firm-in-the-uk",
      "employee-handbooks-and-hr-policies-firm-in-the-uk",
    ],
    topicsIntro:
      "Contractors, house builders, subcontractors and specialist trades all juggle site and office workforces around project timelines. These are the HR topics construction employers most often need help with.",
    topics: [
      {
        id: "site-recruitment",
        heading: "Recruiting trades, site managers and surveyors",
        body:
          "Skilled trades, site management and commercial roles such as quantity surveyors each need different sourcing routes and assessment. Competence cards, qualifications and references should be checked as part of the process.",
      },
      {
        id: "employment-status",
        heading: "Employment status, CIS and false self-employment",
        body:
          "Many site workers are engaged as self-employed through the Construction Industry Scheme, but tax status and employment status are separate questions. Mislabelling workers can create holiday pay, tax and tribunal risk, so arrangements should be reviewed with advisers.",
      },
      {
        id: "competence",
        heading: "Competence, cards and training records",
        body:
          "Clients and principal contractors increasingly expect evidence that workers are competent for their tasks, such as CSCS cards and relevant qualifications. Keeping training records current supports site access and safety.",
      },
      {
        id: "safety-policies",
        heading: "Health, safety and drugs and alcohol policies",
        body:
          "Safety-critical work makes clear policies on fitness for work, drugs and alcohol testing and conduct on site important. Testing should be based on a clear policy and consent where required.",
      },
      {
        id: "tupe-contracts",
        heading: "TUPE when contracts change hands",
        body:
          "Winning or losing a maintenance or service contract can trigger TUPE, transferring staff to the new contractor. Early information, consultation and due diligence reduce risk on both sides.",
      },
      {
        id: "project-end",
        heading: "Redundancy at the end of a project",
        body:
          "When a project ends, redeployment to other sites should be considered before redundancy, and a fair selection and consultation process followed. Collective consultation duties may apply when numbers are larger.",
      },
    ],
    faqs: [
      {
        id: "con-self-employed",
        question: "Are our self-employed subcontractors really self-employed?",
        answer:
          "It depends on how they work in practice, including control, substitution and whether they are part of your business. A review of working arrangements with legal and tax advice can identify risk.",
      },
      {
        id: "con-tupe",
        question: "Does TUPE apply when we take over a contract?",
        answer:
          "It may, particularly where an organised group of employees mainly works on the contract. TUPE advice early in the tender or handover process helps you plan.",
      },
      {
        id: "con-drug-testing",
        question: "Can we introduce drug and alcohol testing?",
        answer:
          "Many construction employers do, for safety reasons. A clear, proportionate policy, consultation with staff and consent are usually needed. Apex HR can help draft and introduce a policy.",
      },
    ],
    legalReviewRequired: false,
  },

  "hr-company-for-distribution-in-the-uk": {
    metaDescription:
      "Apex HR is a specialist HR company for distribution in the UK, supporting warehouse and logistics employers with peak hiring, agency workers, shifts and TUPE.",
    extraChallenges: [
      "Managing agency workers fairly alongside permanent staff",
      "Recruiting and retaining drivers",
    ],
    extraServiceSlugs: [
      "tupe-advisory-firm-in-the-uk",
      "permanent-recruitment-firm-in-the-uk",
      "industrial-relations-and-trade-union-negotiations-firm-in-the-uk",
    ],
    topicsIntro:
      "Warehousing, logistics, fulfilment and transport businesses run high-volume, shift-based operations with demand peaks. These are the HR topics that most often matter to distribution employers.",
    topics: [
      {
        id: "peak-hiring",
        heading: "Peak-season and high-volume warehouse hiring",
        body:
          "Peaks need a repeatable process: early forecasting, simple applications, group assessment days and fast onboarding. Recruitment process outsourcing can add capacity when volumes rise.",
      },
      {
        id: "agency-workers",
        heading: "Agency workers and equal treatment",
        body:
          "Agency workers have some rights from day one and, after a qualifying period in the same role, rights to equal basic pay and conditions. Tracking assignments and working closely with agencies helps manage this fairly.",
      },
      {
        id: "drivers",
        heading: "Recruiting and retaining drivers",
        body:
          "Driver roles involve licence checks, CPC training and drivers' hours rules. HR policies on hours, rest and fitness to drive should align with your transport compliance processes.",
      },
      {
        id: "shifts",
        heading: "Night shifts, working time and holiday pay",
        body:
          "Night work, overtime and variable hours bring working time, health assessment and holiday pay considerations. Shift policies should be clear and applied consistently across sites.",
      },
      {
        id: "attendance",
        heading: "Absence and attendance management",
        body:
          "Short-term absence can disrupt operations quickly. A fair attendance policy, return-to-work conversations and support for underlying health issues help reduce absence without unfair treatment.",
      },
      {
        id: "contract-logistics",
        heading: "TUPE in contract logistics",
        body:
          "Changes of logistics provider or bringing operations in-house can trigger TUPE. Early due diligence, employee information and consultation are central to a smooth transfer.",
      },
    ],
    faqs: [
      {
        id: "dist-agency-rights",
        question: "What rights do our agency warehouse staff have?",
        answer:
          "Agency workers have some rights from the start, such as access to facilities and vacancies, and further equal-treatment rights after a qualifying period. Check the current rules and your agency agreements.",
      },
      {
        id: "dist-peak-volume",
        question: "Can Apex HR manage our peak recruitment?",
        answer:
          "Yes. Recruitment support can be scaled for peak periods, from planning and advertising to assessment days and onboarding.",
      },
      {
        id: "dist-unions",
        question: "Can you help with trade union negotiations at our sites?",
        answer:
          "Yes. Support can cover preparation, collective consultation and negotiation on pay, shifts or changes to terms.",
      },
    ],
    legalReviewRequired: false,
  },

  "hr-company-for-education-in-the-uk": {
    metaDescription:
      "Apex HR is a specialist HR company for education in the UK, supporting schools, trusts and colleges with safer recruitment, staff terms, TUPE and wellbeing.",
    extraChallenges: [
      "Recruiting and retaining teachers in shortage subjects",
      "Harmonising terms across schools in a multi-academy trust",
    ],
    extraServiceSlugs: [
      "tupe-advisory-firm-in-the-uk",
      "workplace-investigations-firm-in-the-uk",
      "employee-handbooks-and-hr-policies-firm-in-the-uk",
    ],
    topicsIntro:
      "Maintained schools, academies, multi-academy trusts, independent schools, nurseries and colleges each operate within their own frameworks. These are the HR topics education leaders most often need support with.",
    topics: [
      {
        id: "safer-recruitment",
        heading: "Safer recruitment in schools",
        body:
          "Schools in England follow statutory safeguarding guidance, Keeping Children Safe in Education, which sets expectations for safer recruitment, pre-appointment checks and the single central record. Equivalent guidance applies in Scotland, Wales and Northern Ireland.",
      },
      {
        id: "staff-terms",
        heading: "Teacher and support staff terms",
        body:
          "Teachers in maintained schools are usually employed under national pay and conditions, and support staff often under local government terms. Academies and independent schools may set their own, so contracts and policies need to be clear on what applies.",
      },
      {
        id: "academy-tupe",
        heading: "Academy conversions and trust growth",
        body:
          "Converting to an academy or joining a trust usually involves a TUPE transfer. Harmonising terms across schools afterwards needs careful planning and consultation.",
      },
      {
        id: "workload",
        heading: "Workload, wellbeing and teacher retention",
        body:
          "Workload is a recurring reason teachers leave. Reviewing marking, meetings and data demands, alongside flexible working options, can support retention.",
      },
      {
        id: "allegations",
        heading: "Allegations against staff",
        body:
          "Allegations that a member of staff may have harmed a child must be handled under safeguarding procedures, usually involving the local authority designated officer. Employment processes need to run alongside these carefully.",
      },
      {
        id: "independent-fe",
        heading: "Independent schools, nurseries and colleges",
        body:
          "Independent schools often face decisions on pensions, fees and staffing, while nurseries manage ratios and qualifications. Each brings distinct HR and consultation requirements.",
      },
    ],
    faqs: [
      {
        id: "edu-scr",
        question: "Can Apex HR review our single central record and recruitment files?",
        answer:
          "Apex HR can review recruitment processes and records against your policies and the relevant guidance, highlighting gaps. Safeguarding responsibility remains with the school or trust.",
      },
      {
        id: "edu-mat-harmonise",
        question: "Can you help harmonise terms across our trust?",
        answer:
          "Yes. Support can cover reviewing existing terms, designing a harmonised approach and managing consultation with staff and unions.",
      },
      {
        id: "edu-teacher-recruitment",
        question: "Can you help recruit teachers for hard-to-fill subjects?",
        answer:
          "Recruitment support can be scoped for specific subjects and leadership roles, with safer recruitment built into the process.",
      },
    ],
    legalReviewRequired: false,
  },

  "hr-company-for-engineers-in-the-uk": {
    metaDescription:
      "Apex HR is a specialist HR company for engineers in the UK, helping engineering employers hire chartered and technical talent and build clear career pathways.",
    extraChallenges: [
      "Hiring for roles that need security clearance",
      "Transferring knowledge from an experienced, ageing workforce",
    ],
    extraServiceSlugs: [
      "graduate-schemes-and-early-careers-design-firm-in-the-uk",
      "succession-planning-and-talent-mapping-firm-in-the-uk",
      "contract-staffing-firm-in-the-uk",
    ],
    topicsIntro:
      "Engineering consultancies, manufacturers, infrastructure and defence employers all compete for scarce technical skills. These are the HR and recruitment topics engineering employers most often raise.",
    topics: [
      {
        id: "chartered",
        heading: "Recruiting chartered and incorporated engineers",
        body:
          "Professional registration through the Engineering Council and its institutions can be essential or desirable depending on the role. Recruitment should be clear on which discipline, registration and experience are required.",
      },
      {
        id: "eng-contractors",
        heading: "Engineering contractors and IR35",
        body:
          "Project peaks are often covered by contractors. Status determinations and clear engagement processes help manage off-payroll working rules, with tax advice where needed.",
      },
      {
        id: "clearance",
        heading: "Security clearance and nationality requirements",
        body:
          "Defence and critical infrastructure roles may require baseline checks or national security vetting. Clearance is granted by government bodies, so hiring timelines should allow for it.",
      },
      {
        id: "early-careers",
        heading: "Apprenticeships and graduate pipelines",
        body:
          "Growing your own engineers through apprenticeships and graduate schemes can reduce reliance on a tight market. A structured programme with mentoring helps retain trainees once qualified.",
      },
      {
        id: "technical-careers",
        heading: "Technical career frameworks",
        body:
          "Dual career paths let engineers progress as technical specialists as well as managers. Competency frameworks link progression to skills and support professional registration.",
      },
      {
        id: "knowledge-transfer",
        heading: "Knowledge transfer and succession",
        body:
          "Where critical knowledge sits with a few experienced people, succession planning and structured knowledge transfer reduce risk when they retire or move on.",
      },
    ],
    faqs: [
      {
        id: "eng-clearance-help",
        question: "Can you recruit for roles that need security clearance?",
        answer:
          "Recruitment can be scoped around clearance requirements, including candidate eligibility. Clearance decisions themselves are made by the relevant government vetting bodies.",
      },
      {
        id: "eng-graduate",
        question: "Can Apex HR design an engineering graduate or apprenticeship scheme?",
        answer:
          "Yes. Early careers support can cover programme design, attraction, assessment and development pathways.",
      },
      {
        id: "eng-ageing",
        question: "How can we plan for engineers retiring?",
        answer:
          "Workforce planning identifies where retirements will create gaps, and succession planning and knowledge transfer help prepare successors in advance.",
      },
    ],
    legalReviewRequired: false,
  },

  "hr-company-for-leisure-in-the-uk": {
    metaDescription:
      "Apex HR is a specialist HR company for leisure in the UK, supporting gyms, attractions and venues with seasonal hiring, flexible contracts and young-worker HR.",
    extraChallenges: [
      "Employing young workers and students safely and lawfully",
      "Calculating holiday pay for irregular-hours and seasonal staff",
    ],
    extraServiceSlugs: [
      "employee-handbooks-and-hr-policies-firm-in-the-uk",
      "leadership-and-management-training-firm-in-the-uk",
      "payroll-advisory-firm-in-the-uk",
    ],
    topicsIntro:
      "Gyms, leisure centres, attractions, theme parks and sports venues share seasonal peaks and young, customer-facing teams. These are the HR questions leisure operators most often need answered.",
    topics: [
      {
        id: "seasonal-recruitment",
        heading: "Seasonal recruitment planning",
        body:
          "Starting early, rehiring returning seasonal staff and running group assessment days help leisure businesses staff up before peaks without lowering standards.",
      },
      {
        id: "contracts",
        heading: "Zero-hours, casual and seasonal contracts",
        body:
          "Flexible contracts suit seasonal demand but need to be clear on status, hours, notice and holiday. The law on flexible and zero-hours work is changing, so contracts should be reviewed regularly.",
      },
      {
        id: "young-workers",
        heading: "Employing young workers",
        body:
          "Workers under 18 have extra protections on working hours, breaks and night work, and children of school age have further restrictions set by local rules. Risk assessments should take age into account.",
      },
      {
        id: "holiday-pay",
        heading: "Holiday pay for irregular-hours staff",
        body:
          "Holiday entitlement and pay for irregular-hours and part-year workers follow specific rules. Payroll and HR should agree a consistent, compliant method.",
      },
      {
        id: "qualifications",
        heading: "Qualifications and safety-critical roles",
        body:
          "Roles such as lifeguards, fitness instructors and ride operators usually need specific qualifications and training. Recording and renewing them is part of good HR practice.",
      },
      {
        id: "site-managers",
        heading: "Developing duty and site managers",
        body:
          "Duty managers often handle HR issues on shift. Practical training on absence, conduct and difficult conversations helps keep practice consistent across sites.",
      },
    ],
    faqs: [
      {
        id: "leis-zero-hours",
        question: "Are zero-hours contracts still suitable for leisure staff?",
        answer:
          "They remain common, but rules on flexible working arrangements are changing. A review of your contracts and practices can show whether they still fit your operation and current law.",
      },
      {
        id: "leis-young",
        question: "What should we know before employing under-18s?",
        answer:
          "Young workers have restrictions on hours, breaks and night work, and school-age children have further limits and may need a local permit. Check the current rules before scheduling.",
      },
      {
        id: "leis-holiday",
        question: "How do we calculate holiday for seasonal staff?",
        answer:
          "It depends on the contract and hours pattern. Specific rules apply to irregular-hours and part-year workers, so a consistent method agreed with payroll is important.",
      },
    ],
    legalReviewRequired: false,
  },

  "hr-company-for-manufacturers-in-the-uk": {
    metaDescription:
      "Apex HR is a specialist HR company for manufacturers in the UK, covering production hiring, shift patterns, union relations, restructuring and reskilling.",
    extraChallenges: [
      "Working constructively with trade unions and employee forums",
      "Reskilling teams as automation changes production",
    ],
    extraServiceSlugs: [
      "industrial-relations-and-trade-union-negotiations-firm-in-the-uk",
      "learning-strategy-and-capability-development-firm-in-the-uk",
      "competency-frameworks-firm-in-the-uk",
    ],
    topicsIntro:
      "Food, engineering, automotive, chemicals and other manufacturers run shift-based operations where people costs and productivity are closely linked. These are the HR topics manufacturing employers most often raise.",
    topics: [
      {
        id: "production-recruitment",
        heading: "Recruiting operatives, technicians and supervisors",
        body:
          "Production, maintenance and supervisory roles each need different sourcing and assessment. Practical skills tests and site visits help candidates and employers judge fit.",
      },
      {
        id: "shift-patterns",
        heading: "Shift patterns, overtime and working time",
        body:
          "Changes to shift patterns usually affect contractual terms and need consultation. Overtime, night work and rest breaks should be managed within working time rules.",
      },
      {
        id: "unions",
        heading: "Trade unions and collective consultation",
        body:
          "Many manufacturing sites recognise unions or have employee forums. Good industrial relations rest on early engagement, clear information and well-prepared negotiation.",
      },
      {
        id: "demand-changes",
        heading: "Short-time working, lay-off and redundancy",
        body:
          "When demand drops, options may include reduced hours, lay-off where the contract allows it, or redundancy. Collective consultation duties apply when larger numbers are affected.",
      },
      {
        id: "safety-absence",
        heading: "Health, safety and absence",
        body:
          "Manual and safety-critical roles carry particular health risks. Occupational health support, fair absence management and clear safety rules protect people and output.",
      },
      {
        id: "automation",
        heading: "Automation, reskilling and apprenticeships",
        body:
          "New equipment and automation change the skills a site needs. Skills mapping, training plans and apprenticeships help existing staff move into new roles.",
      },
    ],
    faqs: [
      {
        id: "man-change-shifts",
        question: "Can we change our shift patterns?",
        answer:
          "Usually only with agreement or after proper consultation, as shift patterns are often contractual. Planning the business case and consultation carefully reduces dispute risk.",
      },
      {
        id: "man-union",
        question: "Can Apex HR support pay negotiations with a union?",
        answer:
          "Yes. Support can cover preparation, data, negotiation strategy and communication with the workforce.",
      },
      {
        id: "man-reskill",
        question: "How can we reskill staff for automated processes?",
        answer:
          "Start with the skills the new processes need, compare them with current capability and build targeted training, mentoring and progression routes around the gaps.",
      },
    ],
    legalReviewRequired: false,
  },

  "hr-company-for-hospitality-in-the-uk": {
    metaDescription:
      "Apex HR is a specialist HR company for hospitality in the UK, helping hotels, restaurants and pubs with kitchen and front-of-house hiring, tips and retention.",
    extraChallenges: [
      "Allocating tips and service charges fairly and lawfully",
      "Keeping right-to-work checks consistent across high-turnover teams",
    ],
    extraServiceSlugs: [
      "employee-handbooks-and-hr-policies-firm-in-the-uk",
      "payroll-advisory-firm-in-the-uk",
      "employer-branding-and-employee-value-proposition-evp-firm-in-the-uk",
    ],
    topicsIntro:
      "Hotels, restaurants, pubs, bars and contract caterers depend on teams that are often young, part-time and quick to move on. These are the HR topics hospitality operators most often need help with.",
    topics: [
      {
        id: "kitchen-foh",
        heading: "Recruiting chefs, kitchen and front-of-house teams",
        body:
          "Kitchen roles often benefit from trial shifts and practical assessment, while front-of-house hiring focuses on service aptitude. Responding to applicants quickly matters in a fast-moving market.",
      },
      {
        id: "tips",
        heading: "Tips, tronc and service charges",
        body:
          "Employers must pass on tips to workers fairly and have a written policy on how they are allocated. Many businesses use a tronc system; payroll and tax treatment should be checked with advisers.",
      },
      {
        id: "flexible-contracts",
        heading: "Zero-hours contracts and holiday pay",
        body:
          "Flexible contracts are common in hospitality, but the law on flexible work and holiday pay for irregular hours is specific and changing. Contracts and payroll methods should be reviewed regularly.",
      },
      {
        id: "right-to-work",
        heading: "Right-to-work checks and illegal working",
        body:
          "Hospitality is a frequent focus of illegal working enforcement. Consistent right-to-work checks for every new starter, before they begin work, protect the business from significant penalties.",
      },
      {
        id: "young-licensing",
        heading: "Young workers and licensed premises",
        body:
          "Under-18s have restrictions on hours and night work, and there are rules about young people serving alcohol. Rotas and training should take these into account.",
      },
      {
        id: "managers",
        heading: "Supporting general and shift managers",
        body:
          "Managers handle most people issues day to day. Practical training on conduct, absence and difficult conversations improves consistency and reduces employee relations risk.",
      },
    ],
    faqs: [
      {
        id: "hosp-tips-policy",
        question: "Do we need a written tips policy?",
        answer:
          "Employers that receive tips regularly are required to have a written policy on how they are dealt with and to make it available to workers. Apex HR can help draft one.",
      },
      {
        id: "hosp-rtw",
        question: "What right-to-work checks should we do?",
        answer:
          "Check every new starter before they begin work, using a method set out in Home Office guidance, and keep a record. Doing this consistently for everyone also avoids discrimination.",
      },
      {
        id: "hosp-employer-brand",
        question: "How can hospitality businesses attract better candidates?",
        answer:
          "A clear employer brand, honest job adverts, fair rotas, progression routes and a quick, respectful hiring process all help you stand out.",
      },
    ],
    legalReviewRequired: false,
  },
};
