import React from 'react';
import { motion } from 'framer-motion';
import { Target, ArrowUpRight, Calendar, Award } from 'lucide-react';
import { Button, Card, CardBody, Chip } from '@nextui-org/react';
import SEOHelmet from '../components/SEOHelmet';
import AchievementCard from '../components/cards/AchievementCard';
import { ventures, ventureStats } from '../data/ventures';
import { THEME } from '../config/theme';

export default function VenturesPage() {
  return (
    <div>
      <SEOHelmet
        title="My Ventures - Sujal Dhungana | Data Education & Analytics Innovation"
        description="Explore Sujal Dhungana's entrepreneurial ventures: Data Profession Academy empowering data analysts and Data Sparta democratizing analytics for SMBs."
        keywords="Data Profession Academy, Data Sparta, Data Education, Analytics Platform, SMB Analytics, Data Training, Entrepreneurship"
        url="https://sujaldhungana.com/ventures"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "My Ventures - Sujal Dhungana",
          "description": "Entrepreneurial ventures by Sujal Dhungana in data education and analytics.",
          "url": "https://sujaldhungana.com/ventures",
          "isPartOf": { "@type": "WebSite", "url": "https://sujaldhungana.com" }
        }}
      />

      {/* Hero Section */}
      <section className={`py-20 ${THEME.gradients.hero} text-white`}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              My Ventures
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Building innovative solutions that democratize data education and make advanced analytics accessible to everyone. 
              From training the next generation of data professionals to creating cutting-edge platforms for SMBs.
            </p>
            
            {/* Venture Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {ventureStats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <AchievementCard
                    icon={stat.icon}
                    value={stat.value}
                    label={stat.label}
                    description={stat.description}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className={THEME.backgrounds.section}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">Entrepreneurial Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              My ventures are driven by a simple belief: <strong>data expertise shouldn't be limited to Fortune 500 companies</strong>. 
              Whether it's training individuals to become industry-ready data professionals or building platforms that make 
              enterprise-grade analytics accessible to small businesses, I'm committed to democratizing data capabilities 
              and creating opportunities for everyone to thrive in the data-driven economy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ventures Section */}
      <section className={THEME.backgrounds.sectionAlt}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-16">
            {ventures.map((venture, index) => {
              const IconComponent = venture.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white dark:bg-gray-800 shadow-xl">
                    <CardBody className="p-0">
                      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                        {/* Image Section */}
                        <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                          <div className="aspect-video lg:aspect-square relative overflow-hidden">
                            <img
                              src={venture.image}
                              alt={venture.title}
                              className="object-cover w-full h-full"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <IconComponent className="text-white" size={64} />
                            </div>
                            <div className="absolute top-4 left-4">
                              <Chip
                                className={venture.color}
                                variant="flat"
                                startContent={<Calendar size={14} />}
                              >
                                Founded {venture.founded}
                              </Chip>
                            </div>
                            <div className="absolute top-4 right-4">
                              <Chip
                                className={venture.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}
                                variant="flat"
                              >
                                {venture.status}
                              </Chip>
                            </div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className={`p-8 lg:p-12 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                          <div className="flex items-center gap-3 mb-4">
                            <IconComponent className={venture.color.split(' ')[1]} size={32} />
                            <div>
                              <h2 className="text-3xl font-bold">{venture.title}</h2>
                              <p className="text-lg text-gray-600 dark:text-gray-300">{venture.tagline}</p>
                            </div>
                          </div>

                          <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                            {venture.description}
                          </p>

                          {/* Impact Metrics */}
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            {Object.entries(venture.impact).map(([key, value], impactIndex) => (
                              <div key={impactIndex} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className={`text-xl font-bold ${THEME.colors.primary.lightClass} ${THEME.colors.primary.darkClass}`}>{value}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Technologies */}
                          <div className="mb-6">
                            <h4 className="font-semibold mb-3">Technologies & Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {venture.technologies.map((tech, techIndex) => (
                                <Chip
                                  key={techIndex}
                                  size="sm"
                                  className={venture.color}
                                  variant="flat"
                                >
                                  {tech}
                                </Chip>
                              ))}
                            </div>
                          </div>

                          {/* Key Features */}
                          <div className="mb-6">
                            <h4 className="font-semibold mb-3">Key Features & Offerings</h4>
                            <div className="space-y-3">
                              {venture.features.slice(0, 3).map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-start gap-3">
                                  <Target className={`${venture.color.split(' ')[1]} mt-0.5 shrink-0`} size={20} />
                                  <div>
                                    <h5 className="font-medium">{feature.title}</h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Key Achievements */}
                          <div className="mb-8">
                            <h4 className="font-semibold mb-3">Key Achievements</h4>
                            <ul className="space-y-2">
                              {venture.achievements.slice(0, 3).map((achievement, achievementIndex) => (
                                <li key={achievementIndex} className="flex items-start gap-2">
                                  <Award className={`${venture.color.split(' ')[1]} mt-1 shrink-0`} size={16} />
                                  <span className="text-sm">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* CTA Button */}
                          <Button
                            as="a"
                            href={venture.link}
                            target={venture.link !== '#' ? "_blank" : undefined}
                            rel={venture.link !== '#' ? "noopener noreferrer" : undefined}
                            className={`w-full ${venture.color.includes('blue') ? 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700' : 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'} text-white transition-colors`}
                            endContent={venture.link !== '#' ? <ArrowUpRight size={20} /> : undefined}
                            isDisabled={venture.link === '#'}
                          >
                            {venture.link !== '#' ? 'Visit Website' : 'Coming Soon'}
                          </Button>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className={THEME.backgrounds.section}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-6">Looking Ahead</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
              These ventures represent just the beginning of my mission to democratize data capabilities. 
              As the data landscape continues to evolve, I'm committed to building solutions that bridge 
              the gap between cutting-edge technology and practical business needs, ensuring that 
              organizations of all sizes can harness the power of their data.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                as="a"
                href="/hire-me#contact"
                className={THEME.components.button.primary}
              >
                Partner With Me
              </Button>
              <Button
                as="a"
                href="https://dataprofessionacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className={THEME.components.button.secondary}
                endContent={<ArrowUpRight size={20} />}
              >
                Explore Data Profession Academy
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}