import React from 'react';
import { motion } from 'framer-motion';
import PassionSection from '../components/PassionSection';
import ProjectsSection from '../components/ProjectsSection';
import BlogSection from '../components/BlogSection';
import CarouselSection from '../components/CarouselSection';
import ContactSection from '../components/ContactSection';

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
              Sujal Dhungana
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              A passionate Data Engineer who likes building data pipelines that solve business problems and can stand the test of time.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="#contact"
                className="bg-white text-[#3ec1d3] dark:text-[#2a8591] px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
              >
                Contact Me
              </a>
              <a
                href="#projects"
                className="border-2 border-white text-white px-6 py-2 rounded-full font-semibold hover:bg-white hover:text-[#3ec1d3] dark:hover:text-[#2a8591] transition-colors"
              >
                View Projects
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <PassionSection />
      <ProjectsSection />
      <BlogSection />
      <CarouselSection />
      <ContactSection />
    </div>
  );
}