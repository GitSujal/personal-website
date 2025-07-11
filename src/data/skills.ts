import { LucideIcon, Code, Database, LineChart, Cog, Network, Users } from 'lucide-react';

// Individual skill interface
export interface Skill {
  name: string;
  category: string;
}

// Skill category interface for grouped display
export interface SkillCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  description?: string;
  color: string;
  colorBg?: string; // For showcase component
}

// Master skills list - single source of truth
export const skills: Skill[] = [
  // Programming Languages
  { name: "Python", category: "programming" },
  { name: "SQL", category: "programming" },
  { name: "PySpark", category: "programming" },
  { name: "R", category: "programming" },
  { name: "C", category: "programming" },
  { name: "C++", category: "programming" },
  { name: "JavaScript", category: "programming" },
  { name: "Bash", category: "programming" },

  // Cloud & Infrastructure
  { name: "AWS (Glue, Sagemaker, Redshift, Athena, Step Functions, DynamoDB, SQS, Lambda, S3)", category: "cloud" },
  { name: "AWS EKS", category: "cloud" },
  { name: "AWS ECS", category: "cloud" },
  { name: "AWS Lambda", category: "cloud" },
  { name: "AWS Step Functions", category: "cloud" },
  { name: "ClickHouse", category: "cloud" },
  { name: "Azure", category: "cloud" },
  { name: "Kubernetes", category: "cloud" },
  { name: "ArgoCD", category: "cloud" },
  { name: "Helm", category: "cloud" },
  { name: "Ansible", category: "cloud" },

  // Data Engineering & Processing
  { name: "Data Modeling", category: "dataEngineering" },
  { name: "Data Pipelines", category: "dataEngineering" },
  { name: "Data Warehousing", category: "dataEngineering" },
  { name: "ETL/ELT", category: "dataEngineering" },
  { name: "MLOps", category: "dataEngineering" },
  { name: "AWS Glue", category: "dataEngineering" },
  { name: "DBT", category: "dataEngineering" },
  { name: "Apache Iceberg", category: "dataEngineering" },
  { name: "AWS MSK (Managed Kafka)", category: "dataEngineering" },
  { name: "AWS OpenSearch", category: "dataEngineering" },
  { name: "DynamoDB", category: "dataEngineering" },
  { name: "AWS RDS", category: "dataEngineering" },

  // DevOps & Infrastructure as Code
  { name: "Cloudformation", category: "devops" },
  { name: "CDK", category: "devops" },
  { name: "Terraform", category: "devops" },
  { name: "CI/CD with Azure DevOps", category: "devops" },
  { name: "AWS CodeCommit", category: "devops" },
  { name: "CodeBuild", category: "devops" },
  { name: "CodePipeline", category: "devops" },
  { name: "GitLab", category: "devops" },
  { name: "Artifactory", category: "devops" },

  // Visualization & Monitoring
  { name: "PowerBI", category: "visualization" },
  { name: "Quicksight", category: "visualization" },
  { name: "Spotfire", category: "visualization" },
  { name: "Prometheus", category: "visualization" },
  { name: "Grafana", category: "visualization" },
  { name: "QuickSight", category: "visualization" },

  // Interpersonal Skills
  { name: "Stakeholder Management", category: "interpersonal" },
  { name: "Consulting", category: "interpersonal" },
  { name: "Requirement Analysis", category: "interpersonal" }
];

// Skill categories for organization and display
export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "Programming Languages",
    icon: Code,
    description: "Python, SQL, PySpark, R, C, C++, JavaScript",
    color: "text-blue-500",
    colorBg: "bg-blue-500/10 text-blue-500"
  },
  {
    id: "cloud",
    title: "Cloud Services",
    icon: Database,
    description: "AWS (Glue, Sagemaker, Redshift, Athena, Step Functions, DynamoDB, SQS, Lambda, S3), ClickHouse, Azure",
    color: "text-green-500",
    colorBg: "bg-green-500/10 text-green-500"
  },
  {
    id: "dataEngineering",
    title: "Data Engineering",
    icon: Network,
    description: "Data Modeling, Data Pipelines, Data Warehousing, ETL/ELT, MLOps",
    color: "text-orange-500",
    colorBg: "bg-orange-500/10 text-orange-500"
  },
  {
    id: "devops",
    title: "DataOps & IAC",
    icon: Cog,
    description: "Cloudformation, CDK, Terraform, CI/CD with Azure DevOps, AWS CodeCommit, CodeBuild and CodePipeline",
    color: "text-purple-500",
    colorBg: "bg-purple-500/10 text-purple-500"
  },
  {
    id: "visualization",
    title: "Visualization",
    icon: LineChart,
    description: "PowerBI, Quicksight, Spotfire",
    color: "text-red-500",
    colorBg: "bg-red-500/10 text-red-500"
  },
  {
    id: "interpersonal",
    title: "Interpersonal Skills",
    icon: Users,
    description: "Stakeholder Management, Consulting, Requirement Analysis",
    color: "text-teal-500",
    colorBg: "bg-teal-500/10 text-teal-500"
  }
];

// Helper function to get skills by category
export const getSkillsByCategory = (categoryId: string): string[] => {
  return skills
    .filter(skill => skill.category === categoryId)
    .map(skill => skill.name);
};

// Helper function to get category by id
export const getCategoryById = (categoryId: string): SkillCategory | undefined => {
  return skillCategories.find(category => category.id === categoryId);
};

// Helper function to get all unique skill names
export const getAllSkillNames = (): string[] => {
  return skills.map(skill => skill.name);
};
