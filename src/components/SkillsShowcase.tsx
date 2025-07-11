import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Cog, LineChart } from 'lucide-react';
import { Card, CardBody } from '@nextui-org/react';

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    skills: ["Python", "SQL", "PySpark", "R", "C", "C++", "JavaScript", "Bash"],
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    title: "Platforms & Data Orchestration",
    icon: Database,
    skills: [
      "AWS (EKS, ECS, Lambda, Step Functions)",
      "Kubernetes",
      "ArgoCD",
      "Helm",
      "Ansible"
    ],
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    title: "Data Processing & Warehousing",
    icon: Cog,
    skills: [
      "Python",
      "SQL",
      "AWS Glue",
      "DBT",
      "ClickHouse",
      "Apache Iceberg",
      "AWS MSK (Managed Kafka)",
      "AWS OpenSearch",
      "DynamoDB",
      "AWS RDS"
    ],
    color: "bg-green-500/10 text-green-500"
  },
  {
    title: "GitOps & Infrastructure as Code",
    icon: LineChart,
    skills: [
      "CloudFormation",
      "CDK",
      "Terraform",
      "CI/CD",
      "Azure DevOps",
      "GitLab",
      "Artifactory"
    ],
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    title: "Monitoring & Visualization",
    icon: LineChart,
    skills: [
      "Prometheus",
      "Grafana",
      "Power BI",
      "QuickSight"
    ],
    color: "bg-red-500/10 text-red-500"
  }
];

export default function SkillsShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skillCategories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <div className={`shrink-0 w-12 h-12 rounded-full ${category.color} flex items-center justify-center`}>
                  <category.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className={`${category.color} px-3 py-1 rounded-full text-sm`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}