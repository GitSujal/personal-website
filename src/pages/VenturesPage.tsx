import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Users, Target, ArrowUpRight, Calendar, MapPin, TrendingUp, Award, BookOpen, Building2 } from 'lucide-react';
import { Button, Card, CardBody, Chip } from '@nextui-org/react';
import SEOHelmet from '../components/SEOHelmet';

const ventures = [
  {
    title: "Data Profession Academy",
    tagline: "Empowering the Next Generation of Data Analysts",
    description: "A comprehensive training academy focused on bridging the gap between academic knowledge and industry-ready skills. We don't just teach tools - we build complete data professionals.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2940&auto=format&fit=crop",
    founded: "August 2023",
    status: "Active",
    impact: {
      studentsTrained: "20+",
      jobPlacementRate: "85%",
      avgTimeToJob: "3 months",
      industryPartners: "5+"
    },
    features: [
      {
        title: "Comprehensive 12-Week Curriculum",
        description: "From Python fundamentals to advanced analytics and storytelling"
      },
      {
        title: "Hands-on Project Portfolio",
        description: "Real-world projects that demonstrate industry-ready skills"
      },
      {
        title: "Career Support & Mentorship",
        description: "Resume building, interview prep, and ongoing career guidance"
      },
      {
        title: "Industry-Relevant Training",
        description: "Curriculum designed with input from hiring managers and industry leaders"
      },
      {
        title: "Soft Skills Development",
        description: "Communication, problem-solving, and data storytelling capabilities"
      },
      {
        title: "Job Placement Assistance",
        description: "Direct connections with hiring partners and job referral network"
      }
    ],
    technologies: ["Python", "SQL", "Power BI", "Excel", "Statistics", "Data Storytelling"],
    achievements: [
      "85% job placement rate within 3 months of graduation",
      "Students placed at major companies including mining, finance, and tech sectors",
      "Developed partnerships with 5+ industry employers",
      "Created Australia's most practical data analyst curriculum",
      "Built a community of 100+ data professionals"
    ],
    link: "https://dataprofessionacademy.com/",
    icon: BookOpen,
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    title: "Data Sparta Pty Ltd",
    tagline: "Democratizing Advanced Analytics for SMBs",
    description: "Making enterprise-grade data analytics accessible and affordable for small and medium businesses. We believe every business deserves data-driven insights, not just the Fortune 500.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    founded: "2024",
    status: "In Development",
    impact: {
      targetMarket: "SMB Sector",
      costReduction: "70%",
      implementationTime: "Days not Months",
      scalability: "Cloud-Native"
    },
    features: [
      {
        title: "Warehouse-Agnostic Platform",
        description: "Bring your own warehouse - works with Redshift, Snowflake, BigQuery, and more"
      },
      {
        title: "AI-Powered Data Integration",
        description: "Automated data source discovery and intelligent schema mapping"
      },
      {
        title: "Self-Service Analytics",
        description: "Empower business users with intuitive, no-code analytics tools"
      },
      {
        title: "Real-Time Insights",
        description: "Live dashboards and automated alerting for critical business metrics"
      },
      {
        title: "Affordable Pricing Model",
        description: "Subscription-based pricing that scales with your business growth"
      },
      {
        title: "Enterprise-Grade Security",
        description: "Bank-level security with role-based access and data governance"
      }
    ],
    technologies: ["AWS", "Apache Iceberg", "ClickHouse", "Python", "React", "AI/ML", "Kubernetes"],
    achievements: [
      "Architected world's first warehouse-agnostic agentic data platform",
      "Reduced typical implementation costs by 70% compared to traditional solutions",
      "Built scalable architecture handling enterprise workloads",
      "Developed AI agents for automated data pipeline management",
      "Created innovative pricing model accessible to SMBs"
    ],
    link: "#",
    icon: LineChart,
    color: "bg-green-500/10 text-green-500"
  }
];

const ventureStats = [
  {
    icon: Users,
    label: "Students Trained",
    value: "20+",
    description: "Across Data Profession Academy"
  },
  {
    icon: TrendingUp,
    label: "Job Placement Rate",
    value: "85%",
    description: "Within 3 months of graduation"
  },
  {
    icon: Building2,
    label: "Active Ventures",
    value: "2",
    description: "Education & Analytics platforms"
  },
  {
    icon: Award,
    label: "Industry Impact",
    value: "High",
    description: "Recognized innovation in data education"
  }
];

export default function VenturesPage() {
  return (
    <div className="pt-16">
      <SEOHelmet
        title="My Ventures - Sujal Dhungana | Data Education & Analytics Innovation"
        description="Explore Sujal Dhungana's entrepreneurial ventures: Data Profession Academy empowering data analysts and Data Sparta democratizing analytics for SMBs."
        keywords="Data Profession Academy, Data Sparta, Data Education, Analytics Platform, SMB Analytics, Data Training, Entrepreneurship"
        url="https://sujaldhungana.com/ventures"
      />

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
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                >
                  <stat.icon className="mx-auto mb-2" size={32} />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm font-medium">{stat.label}</div>
                  <div className="text-xs opacity-80">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white dark:bg-gray-800">
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
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-16">
            {ventures.map((venture, index) => (
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
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <venture.icon className="text-white" size={64} />
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
                          <venture.icon className={venture.color.split(' ')[1]} size={32} />
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
                              <div className="text-xl font-bold text-[#3ec1d3] dark:text-[#2a8591]">{value}</div>
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
                                <Target className={venture.color.split(' ')[1]} size={20} className="mt-0.5 shrink-0" />
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
                                <Award className={venture.color.split(' ')[1]} size={16} className="mt-1 shrink-0" />
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
                          className={`w-full ${venture.color.includes('blue') ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors`}
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
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-16 bg-white dark:bg-gray-800">
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
                className="bg-[#3ec1d3] dark:bg-[#2a8591] text-white hover:bg-[#2596be] dark:hover:bg-[#1a6b85] transition-colors"
              >
                Partner With Me
              </Button>
              <Button
                as="a"
                href="https://dataprofessionacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-[#3ec1d3] dark:border-[#2a8591] text-[#3ec1d3] dark:text-[#2a8591] hover:bg-[#3ec1d3] dark:hover:bg-[#2a8591] hover:text-white transition-colors"
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