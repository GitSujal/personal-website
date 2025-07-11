import { motion } from 'framer-motion';
import { Award, Download, Calendar } from 'lucide-react';
import { Button } from '@nextui-org/react';
import ProjectsSection from '../components/ProjectsSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import InteractiveTimeline from '../components/InteractiveTimeline';
import CertificationBadges from '../components/CertificationBadges';
import SkillsShowcase from '../components/SkillsShowcase';
import SpeakingSection from '../components/SpeakingSection';
import { hirePageContent } from '../data/profileContent';

export default function HireMePage() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-[#3ec1d3] to-[#2596be] dark:from-[#2a8591] dark:to-[#1a6b85] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {hirePageContent.hero.title}
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {hirePageContent.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                as="a"
                href={hirePageContent.hero.buttons.download.href}
                download
                className="bg-white text-[#3ec1d3] dark:text-[#2a8591] hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                <Download size={20} />
                {hirePageContent.hero.buttons.download.text}
              </Button>
              <Button
                as="a"
                href={hirePageContent.hero.buttons.schedule.href}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#3ec1d3] dark:hover:text-[#2a8591] transition-colors inline-flex items-center gap-2"
              >
                <Calendar size={20} />
                {hirePageContent.hero.buttons.schedule.text}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">{hirePageContent.sections.skills.title}</h2>
          <SkillsShowcase />
        </div>
      </section>

      {/* Career Timeline Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-2">
            <Calendar className="text-[#3ec1d3] dark:text-[#2a8591]" />
            {hirePageContent.sections.timeline.title}
          </h2>
          <InteractiveTimeline />
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-2">
            <Award className="text-[#3ec1d3] dark:text-[#2a8591]" />
            {hirePageContent.sections.certifications.title}
          </h2>
          <CertificationBadges />
        </div>
      </section>

      {/* Speaking Engagements Section */}
      <SpeakingSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Blog Section */}
      <BlogSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}