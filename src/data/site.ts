/**
 * Site-wide facts and copy that don't belong to a collection.
 * Every figure here comes from Sujal's résumé or previous site. Anything not yet
 * confirmed is wrapped as a TODO (see `todo()` and <Todo />), never invented.
 */

export const site = {
  name: 'Sujal Dhungana',
  url: 'https://sujal.datasparta.com',
  domain: 'sujal.datasparta.com',
  email: 'sujal@datasparta.com',
  linkedin: 'https://www.linkedin.com/in/dhunganasujal/',
  linkedinLabel: 'linkedin.com/in/dhunganasujal',
  location: 'Perth, Western Australia',
  timezone: 'AWST (UTC+8)',
  roles: 'Data engineer · Platform engineer · Forward deployed engineer',
  description:
    'Sujal Dhungana is a data, platform and forward deployed engineer in Perth building AI-ready data platforms: streaming at a terabyte an hour, serverless lakehouses, MLOps and secure data access for AI agents, all defined as code. Founder of Data Sparta.',
  dataSparta: 'https://datasparta.com',
  academy: 'https://dataprofessionacademy.com',
  /** Years in industry, counted from the first full-time role (Visagio, Aug 2020). */
  careerStart: '2020-08',
  resume: '/Sujal_Dhungana_Resume.pdf',
} as const;

export const navigation = [
  { name: 'Work', href: '/#work' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Ventures', href: '/ventures/' },
  { name: 'Lab', href: '/lab/' },
] as const;

export interface Stat {
  value: string;
  label: string;
  source: string;
}

export const stats: Stat[] = [
  { value: '$600K+', label: 'compute saved per year', source: 'Hypersec at Telstra · −50% compute' },
  { value: '1 TB/hr', label: 'security telemetry streamed through Kafka', source: 'Hypersec at Telstra' },
  {
    value: 'Hours→min',
    label: 'backtest run time on a multi-TB lakehouse',
    source: 'Life Trading · DuckLake',
  },
  { value: '20+', label: 'analysts trained, most hired within 3 months', source: 'Data Profession Academy' },
];

export interface DashboardStat extends Stat {
  /** Clean rows the lab's pipeline must deliver before this tile unlocks. */
  unlockAt: number;
}

const mlops: Stat = {
  value: 'Days→min',
  label: 'ML model deployment time',
  source: 'Water Corporation · MLOps',
};
const dbt: Stat = {
  value: '1,000+',
  label: 'dbt models behind 10-year demand forecasts',
  source: 'Western Power · Snowflake',
};
const onboarding: Stat = {
  value: '−60%',
  label: 'new-source onboarding time',
  source: 'Hypersec · medallion ingestion',
};

/** The six "receipts" on the homepage. Every figure is quoted from src/content/roles, nothing new. */
export const receipts: Stat[] = [stats[0]!, stats[1]!, stats[2]!, mlops, dbt, onboarding];

/** Tiles for the lab's "data sea" dashboard, in unlock order. Same sources as above. */
export const dashboardStats: DashboardStat[] = [
  { ...stats[0]!, unlockAt: 50 },
  { ...onboarding, unlockAt: 120 },
  { ...mlops, unlockAt: 200 },
  { ...stats[1]!, unlockAt: 300 },
  { ...dbt, unlockAt: 420 },
  { ...stats[2]!, unlockAt: 560 },
  {
    value: 'Days→hrs',
    label: 'secure pipeline creation',
    source: 'Hypersec · Python tooling & REST APIs',
    unlockAt: 720,
  },
  { ...stats[3]!, unlockAt: 900 },
];

export const toolbox = [
  {
    label: 'Key skills',
    value:
      'AI-ready data platforms, distributed systems, event-driven architecture, data engineering, DataOps, data infrastructure, data modelling, data warehousing',
  },
  { label: 'Languages', value: 'Python, SQL, PySpark, Bash, JavaScript' },
  {
    label: 'Platforms & orchestration',
    value: 'AWS (Lambda, Step Functions, EKS, ECS, SageMaker), Kubernetes, Databricks, ArgoCD, Helm',
  },
  {
    label: 'Processing & warehousing',
    value:
      'Kafka (AWS MSK), dbt, Snowflake, DuckDB, DuckLake, ClickHouse, Apache Iceberg, AWS Glue, OpenSearch, DynamoDB, RDS',
  },
  {
    label: 'GitOps & IaC',
    value: 'Terraform, CDK, CloudFormation, Databricks Asset Bundles, CI/CD, GitLab, Azure DevOps',
  },
  { label: 'Observability', value: 'Prometheus, Grafana' },
];

/** Community involvement, from the résumé. Shown on the CV and beside the talks. */
export const involvement = {
  title: 'Speaker & Workshop Host',
  org: 'Perth Data Engineering Meetup · Google Developer Group (GDG) Perth',
  body: 'Spoke at the Perth Data Engineering Meetup on building reusable pipelines and at GDG Perth on embedding AI tools into everyday engineering workflows. Ran webinars and one-day workshops teaching data engineering and analytics fundamentals to the wider tech community.',
};

export const certifications = [
  { title: 'AWS Solutions Architect', issuer: 'Amazon Web Services', year: '2024' },
  { title: 'Azure Data Engineer Associate', issuer: 'Microsoft', year: '2024' },
  { title: 'ClickHouse Developer', issuer: 'ClickHouse Academy', year: '2024' },
];
