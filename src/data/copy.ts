/**
 * Every piece of prose on the site, in one place, in the order it appears.
 * Edit the words here; the pages just lay them out.
 *
 * Formatting you can use inside any string (see src/lib/rich.ts):
 *   ==words==   yellow marker        ++words++   cyan marker
 *   ~~words~~   wavy underline       **words**   bold
 *   [text](url) link
 *
 * Facts (roles, dates, bullets) live in src/content/. Numbers and links live in src/data/site.ts.
 */

/** The résumé summary (top of the CV / PDF). Run `npm run resume` after editing. */
export const summary =
  "Senior data and platform engineer who builds large-scale distributed systems and AI-ready data platforms for people and AI agents. Most of my work has been taking ideas from prototype to production, often forward deployed alongside the people who'll use them: streaming platforms handling a terabyte an hour, a serverless multi-TB lakehouse, fully automated MLOps pipelines and secure data APIs for AI agents. I keep things simple, define everything as code, and own what I build, from requirement analysis through to supporting it in production.";

/** Title line under your name on the CV. */
export const cvTagline = 'Data Engineer · Platform Engineer · Forward Deployed Engineer';

// Homepage

export const home = {
  hero: {
    sticker: 'Data · Platform · Forward deployed engineer',
    /** Animated word by word. Markers work across words. */
    headline: '++AI-ready++ data platforms, built to ~~last.~~',
    lede: "I'm Sujal. I build the data platforms that people and AI agents rely on, from Kafka at a terabyte an hour to a serverless multi-TB lakehouse. I like to keep things simple, define everything as code, and own what I build, from requirement analysis through to supporting it in production.",
    note: '← the usual click-ops',
  },

  marquee: [
    'AI-ready platforms',
    'Everything as code',
    'Data engineering',
    'Platform engineering',
    'Forward deployed',
    'Kafka',
    'DuckLake',
    'dbt',
    'Snowflake',
    'Kubernetes',
    'Secure data for AI agents',
    'MLOps',
    'Perth, WA',
  ],

  receipts: {
    eyebrow: 'the receipts',
    title: 'Numbers I can ==point to==',
    lede: 'Every one traces back to a role below. No rounding up.',
  },

  lab: {
    title: 'Play with the data sea',
    body: 'A 3D lesson I built for my students: three sources, three ways to load them, and what each one costs.',
  },

  hats: {
    eyebrow: 'one engineer, three hats',
    title: 'Data, platform and ++forward deployed++',
    lede: 'I design the data, build the platform it runs on, and sit with the people who use it until it works in production.',
  },

  now: { eyebrow: 'right now', title: "What I'm working on" },

  work: { eyebrow: 'selected work', title: 'Five jobs, ~~before~~ and after' },

  aiReady: {
    eyebrow: 'AI-ready, not AI-washed',
    title: 'What makes a platform ==AI-ready==',
    lede: 'An agent is only as good as the data it can reach and the guardrails around it. This is the groundwork I put in first.',
  },

  experience: {
    eyebrow: 'the long version',
    title: 'Experience',
    pdfTitle: 'Want it on paper?',
    pdfBody: 'The same history as a two-page résumé.',
    sideTitle: 'Study & volunteering',
  },

  about: {
    eyebrow: 'how I got here',
    title: 'Electronics engineer turned ==data engineer==',
    paragraphs: [
      "I studied electronics and communications engineering at Tribhuvan University in Kathmandu, then came to Perth for a Master of Predictive Analytics at Curtin. Since 2020 I've built data systems for BHP, a water utility, Telstra (as Hypersec's resident engineer), an energy network and now a trading firm, usually forward deployed: on site, inside the client's environment, owning it into production.",
      "Alongside the day job I run [Data Sparta](https://datasparta.com), building data platforms for small businesses and state sporting organisations, and teach through its training arm, [Data Profession Academy](https://dataprofessionacademy.com). I also speak and run workshops at Perth's data and developer meetups.",
    ],
    photoCaption: "that's me",
    stamp: 'everything as code',
  },

  teaching: {
    eyebrow: 'teaching',
    title: "We don't just teach tools. We build complete data professionals.",
    body: "Data Profession Academy, Data Sparta's training arm, runs a 12-week bootcamp: Python, advanced SQL and data modelling, plus the parts most courses skip, like problem solving and data storytelling. Most graduates land their first industry role within three months.",
  },

  talks: { eyebrow: 'on stage & on the page', title: 'Talks & writing' },

  contact: {
    eyebrow: 'say hello',
    title: 'Need a platform you can trust in ++five years?++',
    lede: "A role, a consulting job for Data Sparta, a training cohort or a talk. Tell me what you're building or what's breaking. I read every message myself.",
  },
};

/** The three hats, with evidence from the roles. */
export const hats = [
  {
    title: 'Data engineer',
    body: 'Pipelines, models and quality checks that hold up: medallion ingestion, dbt at scale, and validation grounded in what the real world can physically produce.',
    evidence: ['1,000+ dbt models behind 10-year forecasts', 'New-source onboarding −60%'],
  },
  {
    title: 'Platform engineer',
    body: 'The ground everything runs on, written as code: Kafka and Kubernetes at a terabyte an hour, a self-hosted lakehouse with automatic failover, and CI/CD instead of clicking.',
    evidence: ['−50% compute, $600K+ a year', 'Team grown 1 → 3 on everything-as-code'],
  },
  {
    title: 'Forward deployed engineer',
    body: "Embedded with the people who'll use it, inside their security rules. Requirements, delivery, on-call and root-cause analysis: I own it from first conversation to production support.",
    evidence: ['Resident engineer inside Telstra', 'Data Sparta clients, end to end'],
  },
];

/** What "AI-ready" means when I build it. Each point is backed by a role. */
export const aiReady = [
  {
    title: 'Governed access for agents',
    body: 'Agents query through APIs and pipeline metadata, not raw credentials, so every answer can say where it came from.',
    where: 'Hypersec · Data Sparta sporting clients',
  },
  {
    title: 'Data you can believe',
    body: 'Checks grounded in physics: a reading above what an asset can carry is flagged before a model or an agent ever sees it.',
    where: 'Western Power · Water Corporation',
  },
  {
    title: 'Fresh, fast, affordable',
    body: "Streaming at a terabyte an hour and serverless lakehouses with no idle warehouse, so AI workloads don't blow the budget.",
    where: 'Hypersec at Telstra · Life Trading',
  },
  {
    title: 'Models that reach production',
    body: 'Automated MLOps with cross-account governance: from prototype to live operations in minutes, not days.',
    where: 'Water Corporation',
  },
];

// Hire me

export const hire = {
  metaDescription:
    'Hire Sujal Dhungana as a data engineer, platform engineer or forward deployed engineer: AI-ready data platforms, infrastructure as code, streaming, MLOps and cost engineering. Perth, Western Australia.',
  eyebrow: 'data · platform · forward deployed',
  title: '++AI-ready++ platforms your team can still read in five years.',
  /** {years} is replaced with whole years since site.careerStart. */
  lede: '{years} years across mining, water, telecoms, energy, trading and my own consultancy, often embedded on site with the client. I build platforms that people and AI agents can trust, with governance written into the code from day one instead of bolted on at the end.',
  services: { eyebrow: "what I'm brought in for", title: 'Four problems I ==fix==' },
  rules: { eyebrow: 'how I work', title: 'The house rules' },
  toolbox: { eyebrow: 'on the bench', title: 'Toolbox', certified: 'Certified' },
  availability:
    'Full-time at Life Trading. Consulting and team training go through [Data Sparta](https://datasparta.com).',
  cta: {
    title: "Tell me what's breaking, or what you want to build.",
    body: 'I reply from my own inbox, usually within a couple of working days (Perth time).',
  },
};

export const services = [
  {
    title: 'AI-ready data platforms',
    body: 'Platforms where people and AI agents get governed, well-described access to data they can trust, with the MLOps to put models into live operations.',
    evidence: [
      'Hypersec: secure AI agent access, onboarding −60%',
      'Water Corp: model deployment days → minutes',
    ],
  },
  {
    title: 'Platform engineering & infrastructure as code',
    body: 'Streaming, lakehouse and Kubernetes platforms defined as code: Terraform, CDK, Databricks Asset Bundles, ArgoCD and Helm, so every environment is the same environment.',
    evidence: [
      'Western Power: manual UI → Asset Bundles + CI/CD',
      'Life Trading: self-hosted DuckLake, Patroni failover',
    ],
  },
  {
    title: 'Forward deployed delivery',
    body: 'Embedding with your team, inside your security environment, to take a product from requirements to production and support it against your SLAs.',
    evidence: ['Telstra: resident engineer, full product lifecycle', 'Secure pipeline creation days → hours'],
  },
  {
    title: 'Streaming & cost engineering',
    body: 'Finding the idle cores, the over-provisioned clusters and the warehouse that never switches off, then fixing them without losing reliability.',
    evidence: ['Telstra: −50% compute, $600K+/yr at 1 TB/hr', 'Life Trading: backtests hours → minutes'],
  },
];

export const principles = [
  {
    title: 'Everything as code',
    body: "Infrastructure, pipelines, standards, permissions. If it isn't in version control, it doesn't exist.",
  },
  {
    title: 'Velocity and reliability, together',
    body: "Self-service tooling so teams ship fast, with the guardrails built in so they don't have to think about them.",
  },
  {
    title: 'Leave it teachable',
    body: "Documentation and standards that the next engineer can pick up. That's the teacher in me.",
  },
];

// Ventures

export const ventures = {
  metaDescription:
    'Data Sparta and Data Profession Academy: the consultancy and the training academy Sujal Dhungana runs in Perth.',
  eyebrow: 'the other half of the week',
  title: "Things I'm building ++outside++ the day job.",
  lede: 'A consultancy that brings decent data work to small organisations, and an academy that turns aspiring analysts into people who deliver from day one.',
  cta: {
    title: "Got a pile of data? Let's sort it.",
    body: "Small business, sports club or non-profit: Data Sparta's first chat is free.",
  },
};
