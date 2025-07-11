import { LucideIcon, Database, BarChart } from 'lucide-react';

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  icon: LucideIcon;
  description: string;
  skills: string[];
  color: string;
  link: string;
}

export const certifications: Certification[] = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    icon: Database,
    description: "Demonstrates expertise in designing distributed systems and applications on the AWS platform, including compute, networking, storage, and database AWS services.",
    skills: [
      "AWS Architecture",
      "Cloud Security",
      "Cost Optimization",
      "High Availability",
      "Disaster Recovery",
      "Performance Optimization"
    ],
    color: "bg-[#FF9900]/10 text-[#FF9900]",
    link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/"
  },
  {
    title: "Azure Data Engineer Associate",
    issuer: "Microsoft",
    date: "2024",
    icon: Database,
    description: "This certification demonstrates expertise in designing and implementing data solutions that use Azure services for data storage, processing, and security.",
    skills: [
      "Data storage design",
      "Data processing",
      "Azure Synapse",
      "Azure Data Lake",
      "Azure SQL Database",
      "Azure Cosmos DB",
      "Data security"
    ],
    color: "bg-[#0078D4]/10 text-[#0078D4]",
    link: "https://learn.microsoft.com/en-us/credentials/certifications/azure-data-engineer/"
  },
  {
    title: "ClickHouse Developer",
    issuer: "ClickHouse Academy",
    date: "2024",
    icon: BarChart,
    description: "The ClickHouse Developer course certifies proficiency in creating and optimizing ClickHouse applications, including efficient data modeling, storage, and query optimization.",
    skills: [
      "ClickHouse architecture",
      "Query optimization",
      "Data modeling",
      "Real-time analytics",
      "Performance tuning"
    ],
    color: "bg-[#FFCC01]/10 text-[#FFCC01]",
    link: "https://clickhouse.com/learn"
  }
];
