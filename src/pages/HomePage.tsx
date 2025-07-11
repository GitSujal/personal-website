import { motion } from 'framer-motion';
import { Button } from '@nextui-org/react';
import { Calendar, ArrowRight } from 'lucide-react';
import PassionSection from '../components/PassionSection';
import ProjectsSection from '../components/ProjectsSection';
import BlogSection from '../components/BlogSection';
import CarouselSection from '../components/CarouselSection';
import ContactSection from '../components/ContactSection';
import SkillsShowcase from '../components/SkillsShowcase';
import { currentRoles } from '../data/currentRoles';
import { keyAchievements } from '../data/keyAchievements';
import { profileContent } from '../data/profileContent';
import { featuredTimelineEvents, featuredSpeakingHighlights } from '../data/featuredContent';

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[#3ec1d3] to-[#2596be] dark:from-[#2a8591] dark:to-[#1a6b85]">
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
              {keyAchievements.map((achievement) => {
                const IconComponent = achievement.icon;
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: achievement.delay }}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                  >
                    <IconComponent className="mx-auto mb-2" size={32} />
                    <div className="text-2xl font-bold">{achievement.value}</div>
                    <div className="text-sm">{achievement.label}</div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                as="a"
                href={profileContent.heroButtons.primary.href}
                className="bg-white text-[#3ec1d3] dark:text-[#2a8591] px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors inline-flex items-center gap-2"
                size="lg"
              >
                {profileContent.heroButtons.primary.text}
                <ArrowRight size={20} />
              </Button>
              <Button
                as="a"
                href={profileContent.heroButtons.secondary.href}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#3ec1d3] dark:hover:text-[#2a8591] transition-colors inline-flex items-center gap-2"
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
      <section className="py-16 bg-white dark:bg-gray-800">
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
      <PassionSection />

      {/* Skills Overview */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
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
          <SkillsShowcase />
          <div className="text-center mt-8">
            <Button
              as="a"
              href="/hire-me#skills"
              className="bg-[#3ec1d3] dark:bg-[#2a8591] text-white hover:bg-[#2596be] dark:hover:bg-[#1a6b85] transition-colors"
            >
              View Complete Skill Set
            </Button>
          </div>
        </div>
      </section>

      {/* Career Highlights Timeline */}
      <section className="py-16 bg-white dark:bg-gray-800">
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
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#3ec1d3]/20"></div>
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
                    <div className={`absolute w-6 h-6 ${event.id === 'data-academy' ? 'bg-green-500' : 'bg-[#3ec1d3] dark:bg-[#2a8591]'} rounded-full border-4 border-white dark:border-gray-800 shadow-lg`}></div>
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
              className="bg-[#3ec1d3] dark:bg-[#2a8591] text-white hover:bg-[#2596be] dark:hover:bg-[#1a6b85] transition-colors"
            >
              {profileContent.sections.timeline.viewAllText}
            </Button>
          </div>
        </div>
      </section>

      {/* Speaking & Thought Leadership */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
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
              className="bg-[#3ec1d3] dark:bg-[#2a8591] text-white hover:bg-[#2596be] dark:hover:bg-[#1a6b85] transition-colors"
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