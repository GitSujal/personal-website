import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@nextui-org/react';
import { Download, Calendar, ArrowRight, TrendingUp, Users, Award } from 'lucide-react';
import PassionSection from '../components/PassionSection';
import ProjectsSection from '../components/ProjectsSection';
import BlogSection from '../components/BlogSection';
import CarouselSection from '../components/CarouselSection';
import ContactSection from '../components/ContactSection';
import SpeakingSection from '../components/SpeakingSection';
import InteractiveTimeline from '../components/InteractiveTimeline';
import SkillsShowcase from '../components/SkillsShowcase';

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
            <p className="text-xl md:text-2xl mb-4">
              Principal Data Engineer | Platform Engineering Expert
            </p>
            <p className="text-lg mb-8 max-w-3xl mx-auto">
              Seasoned Data Engineer with a passion for building robust, scalable data platforms that stand the test of time. 
              Specializing in the crucial balance between developer velocity and enterprise-grade reliability.
            </p>
            
            {/* Key Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <TrendingUp className="mx-auto mb-2" size={32} />
                <div className="text-2xl font-bold">$600K+</div>
                <div className="text-sm">Annual Cost Savings</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <Users className="mx-auto mb-2" size={32} />
                <div className="text-2xl font-bold">1TB/hr</div>
                <div className="text-sm">Data Processing Scale</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <Award className="mx-auto mb-2" size={32} />
                <div className="text-2xl font-bold">20+</div>
                <div className="text-sm">Students Mentored</div>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                as="a"
                href="/hire-me"
                className="bg-white text-[#3ec1d3] dark:text-[#2a8591] px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors inline-flex items-center gap-2"
                size="lg"
              >
                View Full Profile
                <ArrowRight size={20} />
              </Button>
              <Button
                as="a"
                href="#contact"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#3ec1d3] dark:hover:text-[#2a8591] transition-colors inline-flex items-center gap-2"
                size="lg"
              >
                <Calendar size={20} />
                Let's Connect
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
            <h2 className="text-3xl font-bold mb-4">Currently Making Impact At</h2>
            <div className="bg-gradient-to-r from-[#3ec1d3]/10 to-[#2596be]/10 dark:from-[#2a8591]/10 dark:to-[#1a6b85]/10 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-[#3ec1d3] dark:text-[#2a8591] mb-2">
                Resident Platform Engineer at Telstra
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Optimizing data pipelines processing 1TB/hr, achieving 50% cost reduction worth $600K+ annually
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#3ec1d3] rounded-full"></div>
                  <span>Kubernetes & ClickHouse optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#3ec1d3] rounded-full"></div>
                  <span>Event-based scaling implementation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#3ec1d3] rounded-full"></div>
                  <span>RESTful APIs for K8s automation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#3ec1d3] rounded-full"></div>
                  <span>Platform uptime exceeding SLA</span>
                </div>
              </div>
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
            <h2 className="text-3xl font-bold mb-4">Technical Expertise</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Deep expertise across the modern data stack, from infrastructure to machine learning
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
            <h2 className="text-3xl font-bold mb-4">Career Journey Highlights</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A track record of delivering enterprise-scale solutions and driving significant business impact
            </p>
          </motion.div>
          
          {/* Show only recent/key experiences */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#3ec1d3]/20"></div>
            <div className="space-y-12">
              {/* Current Role */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex items-center"
              >
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <span className="text-sm font-bold text-[#3ec1d3] dark:text-[#2a8591]">Oct 2024 - Present</span>
                    <h3 className="text-xl font-bold mb-2">Resident Platform Engineer</h3>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">Telstra</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      Optimized 1TB/hr data pipelines, saved $600K+ annually through Kubernetes and ClickHouse optimization
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-12 h-12 z-10">
                  <div className="absolute w-6 h-6 bg-[#3ec1d3] dark:bg-[#2a8591] rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
                </div>
                <div className="w-1/2"></div>
              </motion.div>

              {/* Principal Data Engineer */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center flex-row-reverse"
              >
                <div className="w-1/2 pl-8">
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <span className="text-sm font-bold text-[#3ec1d3] dark:text-[#2a8591]">Apr 2024 - Present</span>
                    <h3 className="text-xl font-bold mb-2">Principal Data Engineer</h3>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">Data Vanguards Pty Ltd</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      Architected world's first warehouse-agnostic agentic data platform, reduced costs by 90%
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-12 h-12 z-10">
                  <div className="absolute w-6 h-6 bg-[#3ec1d3] dark:bg-[#2a8591] rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
                </div>
                <div className="w-1/2"></div>
              </motion.div>

              {/* Data Profession Academy */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center"
              >
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">Aug 2023 - Present</span>
                    <h3 className="text-xl font-bold mb-2">Founder | Instructor</h3>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">Data Profession Academy</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      Mentored 20+ students, majority secured roles within 3 months
                    </p>
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-12 h-12 z-10">
                  <div className="absolute w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
                </div>
                <div className="w-1/2"></div>
              </motion.div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              as="a"
              href="/hire-me#timeline"
              className="bg-[#3ec1d3] dark:bg-[#2a8591] text-white hover:bg-[#2596be] dark:hover:bg-[#1a6b85] transition-colors"
            >
              View Complete Career Timeline
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
            <h2 className="text-3xl font-bold mb-4">Thought Leadership & Speaking</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Actively contributing to the data engineering community through speaking engagements and knowledge sharing
            </p>
          </motion.div>
          
          {/* Featured Speaking Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="text-center">
                <div className="text-3xl mb-2">🏛️</div>
                <h3 className="font-bold mb-2">OzWater Conference 2024</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Top paper on ML for Centrifuge Performance Prediction
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="text-center">
                <div className="text-3xl mb-2">🎤</div>
                <h3 className="font-bold mb-2">Data Engineering Summit</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Keynote on Modern Data Pipeline Architecture
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <div className="text-center">
                <div className="text-3xl mb-2">👥</div>
                <h3 className="font-bold mb-2">AWS Community Day</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Panel on Building Scalable Data Solutions
                </p>
              </div>
            </motion.div>
          </div>

          <div className="text-center">
            <Button
              as="a"
              href="/hire-me#speaking"
              className="bg-[#3ec1d3] dark:bg-[#2a8591] text-white hover:bg-[#2596be] dark:hover:bg-[#1a6b85] transition-colors"
            >
              View All Speaking Engagements
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <ProjectsSection />

      {/* Blog Section */}
      <BlogSection />

      {/* Events Carousel */}
      <CarouselSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}