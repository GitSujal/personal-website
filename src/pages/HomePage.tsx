import { motion } from 'framer-motion';
import { Button } from '@nextui-org/react';
import { Calendar, ArrowRight } from 'lucide-react';
import SEOHelmet from '../components/SEOHelmet';
import PassionSection from '../components/PassionSection';
import ProjectsSection from '../components/ProjectsSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import SkillsShowcase from '../components/SkillsShowcase';
import AchievementCard from '../components/cards/AchievementCard';
import { currentRoles } from '../data/currentRoles';
import { keyAchievements } from '../data/keyAchievements';
import { profileContent } from '../data/profileContent';
import { featuredTimelineEvents, featuredSpeakingHighlights } from '../data/featuredContent';
import { passions } from '../data/passions';
import { skillCategories, getSkillsByCategory } from '../data/skills';
import { THEME } from '../config/theme';

export default function HomePage() {
  return (
    <div>
      <SEOHelmet
        title="Sujal Dhungana - Data Engineer | DataOps & MLOps Expert"
        description="Sujal Dhungana is a Data Engineer specializing in DataOps, MLOps, and building scalable data pipelines. Explore projects, ventures, and expertise in data engineering."
        keywords="Data Engineer, DataOps Expert, MLOps Specialist, Scalable Pipelines, Analytics as a Service, Data Integration, Sujal Dhungana"
        url="https://sujaldhungana.com/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Sujal Dhungana - Data Engineer",
          "description": "Portfolio of Sujal Dhungana, a Data Engineer specializing in DataOps, MLOps, and scalable data pipelines.",
          "url": "https://sujaldhungana.com/",
          "isPartOf": { "@type": "WebSite", "url": "https://sujaldhungana.com" }
        }}
      />
      {/* Hero Section */}
      <section className={`py-20 ${THEME.gradients.hero}`}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {profileContent.name}
            </h1>
            <p className="text-xl md:text-2xl mb-4">
              {profileContent.highlight}
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              {profileContent.summaryShort}
            </p>
            
            {/* Key Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
              {keyAchievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: achievement.delay }}
                >
                  <AchievementCard
                    icon={achievement.icon}
                    value={achievement.value}
                    label={achievement.label}
                  />
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                as="a"
                href={profileContent.heroButtons.primary.href}
                className="bg-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors inline-flex items-center gap-2"
                style={{color: THEME.colors.primary.light}}
                size="lg"
              >
                {profileContent.heroButtons.primary.text}
                <ArrowRight size={20} />
              </Button>
              <Button
                as="a"
                href={profileContent.heroButtons.secondary.href}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white transition-colors inline-flex items-center gap-2"
                size="lg"
              >
                <Calendar size={20} />
                {profileContent.heroButtons.secondary.text}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Role Highlight */}
      <section className={THEME.backgrounds.section}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">{profileContent.sections.currentRoles.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              {profileContent.sections.currentRoles.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentRoles.map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  className={`${role.colorScheme.background} rounded-xl p-6`}
                >
                  <div className="text-center mb-4">
                    <h3 className={`text-xl font-bold ${role.colorScheme.primary} mb-2`}>
                      {role.title}
                    </h3>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{role.company}</p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-left">
                    {role.description}
                  </p>
                  <div className="space-y-2 text-xs text-left">
                    {role.highlights.map((highlight, highlightIndex) => (
                      <div key={highlightIndex} className="flex items-center gap-2">
                        <div className={`w-2 h-2 ${role.colorScheme.accent} rounded-full`}></div>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Passions Section */}
      <PassionSection passions={passions} />

      {/* Skills Overview */}
      <section className={THEME.backgrounds.sectionAlt}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">{profileContent.sections.skills.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {profileContent.sections.skills.description}
            </p>
          </motion.div>
          <SkillsShowcase skillCategories={skillCategories} getSkillsByCategory={getSkillsByCategory} />
          <div className="text-center mt-8">
            <Button
              as="a"
              href="/hire-me#skills"
              className={THEME.components.button.primary}
            >
              View Complete Skill Set
            </Button>
          </div>
        </div>
      </section>

      {/* Career Highlights Timeline */}
      <section className={THEME.backgrounds.section}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">{profileContent.sections.timeline.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {profileContent.sections.timeline.description}
            </p>
          </motion.div>
          
          {/* Show only recent/key experiences */}
          <div className="relative max-w-4xl mx-auto">
            <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${THEME.opacity.primary}`}></div>
            <div className="space-y-12">
              {featuredTimelineEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: event.position === 'left' ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`flex items-center ${event.position === 'right' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-1/2 ${event.position === 'left' ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className={`${event.colorScheme.background} p-6 rounded-lg ${event.id === 'data-academy' ? 'border border-green-200 dark:border-green-700' : ''}`}>
                      <span className={`text-sm font-bold ${event.colorScheme.primary}`}>{event.period}</span>
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{event.company}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        {event.description}
                      </p>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center w-12 h-12 z-10">
                    <div className={`absolute w-6 h-6 ${event.id === 'data-academy' ? 'bg-green-500' : `${THEME.colors.primary.lightBg} ${THEME.colors.primary.darkBg}`} rounded-full border-4 border-white dark:border-gray-800 shadow-lg`}></div>
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              as="a"
              href="/hire-me#timeline"
              className={THEME.components.button.primary}
            >
              {profileContent.sections.timeline.viewAllText}
            </Button>
          </div>
        </div>
      </section>

      {/* Speaking & Thought Leadership */}
      <section className={THEME.backgrounds.sectionAlt}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">{profileContent.sections.speaking.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {profileContent.sections.speaking.description}
            </p>
          </motion.div>
          
          {/* Featured Speaking Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredSpeakingHighlights.map((highlight) => (
              <motion.div
                key={highlight.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: highlight.delay }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{highlight.emoji}</div>
                  <h3 className="font-bold mb-2">{highlight.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              as="a"
              href="/hire-me#speaking"
              className={THEME.components.button.primary}
            >
              {profileContent.sections.speaking.viewAllText}
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Blog Section */}
      <BlogSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}