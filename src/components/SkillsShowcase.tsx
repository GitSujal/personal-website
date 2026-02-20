import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody } from '@nextui-org/react';
import { SkillCategory } from '../data/skills';

interface SkillsShowcaseProps {
  skillCategories: SkillCategory[];
  getSkillsByCategory: (categoryId: string) => string[];
  className?: string;
}

/**
 * Skills Showcase Component
 * Displays skills grouped by category
 * Accepts skill data and retrieval function via props - fully data-agnostic
 */
export default function SkillsShowcase({
  skillCategories,
  getSkillsByCategory,
  className = '',
}: SkillsShowcaseProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {skillCategories.map((category, index) => {
        const IconComponent = category.icon;
        const categorySkills = getSkillsByCategory(category.id);
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardBody className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-12 h-12 rounded-full ${category.colorBg} flex items-center justify-center`}>
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`${category.colorBg} px-3 py-1 rounded-full text-sm`}
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
        );
      })}
    </div>
  );
}