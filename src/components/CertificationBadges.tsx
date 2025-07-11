import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Chip } from '@nextui-org/react';
import { certifications } from '../data/certifications';

export default function CertificationBadges() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {certifications.map((cert, index) => {
        const IconComponent = cert.icon;
        return (
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
                    <IconComponent size={24} />
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
        );
      })}
    </div>
  );
}