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
  roles: 'Data engineer · Founder · Teacher',
  description:
    'Sujal Dhungana is a data engineer in Perth building data platforms that stand the test of time: infrastructure as code, MLOps, and cost engineering. Founder of Data Profession Academy.',
  resume: '/Sujal_Dhungana_Resume.pdf',
} as const;

export interface Stat {
  value: string;
  label: string;
  source: string;
}

export const stats: Stat[] = [
  { value: '$600K+', label: 'compute saved per year', source: 'Telstra · −50% cost' },
  { value: '1 TB/hr', label: 'log data, ingested reliably', source: 'Telstra · ClickHouse' },
  { value: 'Days→min', label: 'ML model time-to-production', source: 'Water Corporation' },
  { value: '20+', label: 'analysts trained, most hired within 3 months', source: 'Data Profession Academy' },
];

export const services = [
  {
    title: 'Platform engineering & infrastructure as code',
    body: 'Moving click-ops estates into code. Databricks Asset Bundles, Terraform, CDK, Kubernetes with ArgoCD and Helm, so every environment is the same environment.',
    evidence: ['Western Power: click-ops → Asset Bundles', 'Telstra: K8s provisioning APIs, days → hours'],
  },
  {
    title: 'Pipelines & data modelling',
    body: 'Ingestion platforms with medallion layers, Iceberg tables, dbt standards and dimensional models that analysts can trust and extend.',
    evidence: ['Data Vanguards: onboarding −60%', 'Water Corp: build time 2 days → 2 hrs'],
  },
  {
    title: 'MLOps',
    body: 'Taking models from notebook to production with governance, approvals and cross-account deployment, then keeping them there.',
    evidence: ['Water Corp: time-to-prod days → minutes', 'OzWater 2024: voted a top paper'],
  },
  {
    title: 'Cost engineering',
    body: 'Finding the idle cores, the over-provisioned clusters and the pipelines that run because nobody turned them off.',
    evidence: ['Telstra: −50% compute, $600K+/yr', 'Data Vanguards: ops cost −90%'],
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

export const toolbox = [
  { label: 'Languages', value: 'Python, SQL, PySpark, R, Bash, JavaScript' },
  { label: 'Data platforms', value: 'Databricks, Snowflake, dbt, ClickHouse, Apache Iceberg, Redshift, Glue' },
  { label: 'Cloud & runtime', value: 'AWS (EKS, ECS, Lambda, Step Functions, SageMaker), Azure, Kubernetes' },
  { label: 'As code', value: 'Terraform, CDK, CloudFormation, Databricks Asset Bundles, ArgoCD, Helm' },
  { label: 'Observe & report', value: 'Prometheus, Grafana, Power BI, QuickSight' },
];

export const certifications = [
  { title: 'AWS Solutions Architect', issuer: 'Amazon Web Services', year: '2024' },
  { title: 'Azure Data Engineer Associate', issuer: 'Microsoft', year: '2024' },
  { title: 'ClickHouse Developer', issuer: 'ClickHouse Academy', year: '2024' },
];
