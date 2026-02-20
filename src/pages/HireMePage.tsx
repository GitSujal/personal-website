import { motion } from 'framer-motion';
import { Award, Download, Calendar } from 'lucide-react';
import { Button } from '@nextui-org/react';
import SEOHelmet from '../components/SEOHelmet';
import ProjectsSection from '../components/ProjectsSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import InteractiveTimeline from '../components/InteractiveTimeline';
import CertificationBadges from '../components/CertificationBadges';
import SkillsShowcase from '../components/SkillsShowcase';
import SpeakingSection from '../components/SpeakingSection';
import { hirePageContent } from '../data/profileContent';
import { skillCategories, getSkillsByCategory } from '../data/skills';
import { certifications } from '../data/certifications';
import { THEME } from '../config/theme';

export default function HireMePage() {
  return (
    <div>
      <SEOHelmet
        title="Hire Sujal Dhungana - Data Engineer & DataOps Expert | Resume & Skills"
        description="Hire Sujal Dhungana, a skilled Data Engineer with expertise in DataOps, MLOps, cloud data platforms, and scalable pipeline architecture. View resume, skills, and certifications."
        keywords="Hire Data Engineer, DataOps Consultant, MLOps Expert, Data Pipeline Architect, Cloud Data Engineer, Sujal Dhungana Resume"
        url="https://sujaldhungana.com/hire-me"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "name": "Hire Sujal Dhungana",
          "description": "Professional profile and resume of Sujal Dhungana, Data Engineer.",
          "url": "https://sujaldhungana.com/hire-me",
          "mainEntity": {
            "@type": "Person",
            "name": "Sujal Dhungana",
            "jobTitle": "Data Engineer",
            "url": "https://sujaldhungana.com"
          }
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
                className="bg-white hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                style={{color: THEME.colors.primary.light}}
              >
                <Download size={20} />
                {hirePageContent.hero.buttons.download.text}
              </Button>
              <Button
                as="a"
                href={hirePageContent.hero.buttons.schedule.href}
                className="bg-transparent border-2 border-white text-white hover:bg-white transition-colors inline-flex items-center gap-2"
              >
                <Calendar size={20} />
                {hirePageContent.hero.buttons.schedule.text}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={THEME.backgrounds.section}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">{hirePageContent.sections.skills.title}</h2>
          <SkillsShowcase skillCategories={skillCategories} getSkillsByCategory={getSkillsByCategory} />
        </div>
      </section>

      {/* Career Timeline Section */}
      <section className={THEME.backgrounds.sectionAlt}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-2">
            <Calendar className={THEME.components.icon.primary} />
            {hirePageContent.sections.timeline.title}
          </h2>
          <InteractiveTimeline />
        </div>
      </section>

      {/* Certifications Section */}
      <section className={THEME.backgrounds.section}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 flex items-center gap-2">
            <Award className={THEME.components.icon.primary} />
            {hirePageContent.sections.certifications.title}
          </h2>
          <CertificationBadges certifications={certifications} />
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