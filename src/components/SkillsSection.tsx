import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, LineChart, Cog, Network, Users } from 'lucide-react';

const skills = [
  {
    icon: Code,
    title: "Programming Languages",
    description: "Python, SQL, PySpark, R, C, C++, JavaScript",
    color: "text-blue-500"
  },
  {
    icon: Database,
    title: "Cloud Services",
    description: "AWS (Glue, Sagemaker, Redshift, Athena, Step Functions, DynamoDB, SQS, Lambda, S3), ClickHouse, Azure",
    color: "text-green-500"
  },
  {
    icon: Cog,
    title: "DataOps & IAC",
    description: "Cloudformation, CDK, Terraform, CI/CD with Azure DevOps, AWS CodeCommit, CodeBuild and CodePipeline",
    color: "text-purple-500"
  },
  {
    icon: Network,
    title: "Data Engineering",
    description: "Data Modeling, Data Pipelines, Data Warehousing, ETL/ELT, MLOps",
    color: "text-orange-500"
  },
  {
    icon: LineChart,
    title: "Visualization",
    description: "PowerBI, Quicksight, Spotfire",
    color: "text-red-500"
  },
  {
    icon: Users,
    title: "Interpersonal Skills",
    description: "Stakeholder Management, Consulting, Requirement Analysis",
    color: "text-teal-500"
  }
];

function SkillsSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-shadow"
            >
              <skill.icon className={`${skill.color} mb-4`} size={32} />
              <h3 className="text-xl font-bold mb-2">{skill.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{skill.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;