import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, BookOpen, Code, Building, Brain } from 'lucide-react';
import { Card, CardBody, Chip } from '@nextui-org/react';

const timelineEvents = [
  {
    year: "2024 - Present",
    title: "Data Engineer",
    company: "Data Vanguard Pty Ltd",
    description: [
      "Developed fully automated end-to-end MLOps pipeline for real-time recommendations",
      "Reduced operational costs by 90%, saving over $30K annually",
      "Standardized data ingestion processes, reducing development efforts by 60%"
    ],
    icon: Code,
    type: "work",
    tags: ["MLOps", "Data Engineering", "Cost Optimization"]
  },
  {
    year: "2023 - Present",
    title: "Founder & Instructor",
    company: "Data Profession Academy",
    description: [
      "Taught 20+ students technical and soft skills for data analysis",
      "Helped majority of students land their first data analyst roles",
      "Designed hands-on curriculum with real-world data projects"
    ],
    icon: BookOpen,
    type: "venture",
    tags: ["Education", "Data Analytics", "Mentoring"]
  },
  {
    year: "2022 - 2024",
    title: "Senior Analyst - Data Engineering",
    company: "Water Corporation",
    description: [
      "Built MLOps pipeline reducing deployment time from days to minutes",
      "Developed ingestion platform reducing pipeline build time by 90%",
      "Implemented automated validation and testing frameworks"
    ],
    icon: Building,
    type: "work",
    tags: ["MLOps", "Data Engineering", "Automation"]
  },
  {
    year: "2020 - 2022",
    title: "Technology Consultant",
    company: "Visagio",
    description: [
      "Developed workforce planning tool saving tier-one mining company over $40M",
      "Built strategic dashboards for regulatory reporting",
      "Automated reporting processes cutting manual efforts by 50%"
    ],
    icon: Briefcase,
    type: "work",
    tags: ["Consulting", "Analytics", "Automation"]
  },
  {
    year: "2020",
    title: "RPA Developer",
    company: "Curtin University",
    description: [
      "Automated validation processes using Python and NLP",
      "Led development of Django-based website for university workflows",
      "Standardized 10+ business processes across departments"
    ],
    icon: Brain,
    type: "work",
    tags: ["RPA", "Python", "Process Automation"]
  },
  {
    year: "2020",
    title: "Master of Predictive Analytics",
    company: "Curtin University",
    description: [
      "Advanced predictive modeling, machine learning, and data analytics",
      "High distinction average with minor in Finance and Investment"
    ],
    icon: GraduationCap,
    type: "education",
    tags: ["Machine Learning", "Analytics", "Finance"]
  },
  {
    year: "2017",
    title: "Bachelor of Electronics and Communications",
    company: "Tribhuvan University",
    description: [
      "Specialized in telecommunications and embedded systems",
      "Graduated with distinction"
    ],
    icon: GraduationCap,
    type: "education",
    tags: ["Electronics", "Engineering", "Telecommunications"]
  }
];

export default function InteractiveTimeline() {
  const [selectedEvent, setSelectedEvent] = React.useState<number | null>(null);

  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#3ec1d3]/20"></div>
      <div className="space-y-12">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex items-center ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
              <Card
                isPressable
                onPress={() => setSelectedEvent(selectedEvent === index ? null : index)}
                className={`transition-all duration-300 ${
                  selectedEvent === index ? 'scale-105 border-[#3ec1d3]' : ''
                }`}
              >
                <CardBody className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <event.icon className="text-[#3ec1d3]" size={20} />
                    <span className="text-sm font-semibold text-[#3ec1d3]">{event.year}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{event.company}</p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {event.tags.map((tag, tagIndex) => (
                      <Chip
                        key={tagIndex}
                        size="sm"
                        className="bg-[#3ec1d3]/10 text-[#3ec1d3] text-xs"
                      >
                        {tag}
                      </Chip>
                    ))}
                  </div>
                  {selectedEvent === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-gray-500 dark:text-gray-400 mt-2"
                    >
                      <ul className="list-disc list-inside space-y-1">
                        {event.description.map((item, descIndex) => (
                          <li key={descIndex}>{item}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </CardBody>
              </Card>
            </div>
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute w-4 h-4 bg-[#3ec1d3] rounded-full"></div>
            </div>
            <div className="w-1/2"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}