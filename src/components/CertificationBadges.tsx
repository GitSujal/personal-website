import React from 'react';
import { motion } from 'framer-motion';
import { Database, BarChart } from 'lucide-react';
import { Card, CardBody, Chip } from '@nextui-org/react';

const certifications = [
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

export default function CertificationBadges() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {certifications.map((cert, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <div className={`shrink-0 w-12 h-12 rounded-full ${cert.color} flex items-center justify-center`}>
                  <cert.icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{cert.title}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{cert.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{cert.issuer}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {cert.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <Chip
                        key={skillIndex}
                        size="sm"
                        className={cert.color}
                        variant="flat"
                      >
                        {skill}
                      </Chip>
                    ))}
                  </div>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3ec1d3] hover:underline text-sm mt-4 inline-block"
                  >
                    View Certificate →
                  </a>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}