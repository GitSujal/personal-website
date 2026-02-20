import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { THEME } from '../config/theme';
import { Passion } from '../data/passions';

interface PassionSectionProps {
  passions: Passion[];
  title?: string;
}

/**
 * Passion Section Component
 * Displays passion cards in a grid layout
 * Accepts passion data via props - data-agnostic presentation component
 */
export default function PassionSection({
  passions: passionList,
  title = 'My Passions',
}: PassionSectionProps) {
  return (
    <section className={THEME.backgrounds.section}>
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {passionList.map((passion, index) => {
            const IconComponent = passion.icon;
            return (
              <motion.div
                key={passion.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={passion.link} className="block h-full">
                  <div
                    className={`h-full p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-all duration-300 ${THEME.patterns.borderHoverPrimary}`}
                  >
                    <IconComponent className={`${THEME.components.icon.primary} mb-4`} size={32} />
                    <h3 className="text-xl font-bold mb-4">{passion.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{passion.description}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}