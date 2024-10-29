import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Users, Target, ArrowUpRight } from 'lucide-react';
import { Button, Card, CardBody } from '@nextui-org/react';

const ventures = [
  {
    title: "Data Profession Academy",
    description: "Empowering the next generation of data analysts through comprehensive technical and soft skill training.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2940&auto=format&fit=crop",
    features: [
      "Hands-on practical exercises and projects",
      "Career support and interview preparation",
      "Resume building assistance",
      "Industry-relevant curriculum"
    ],
    link: "https://dataprofessionacademy.com/",
    icon: Users
  },
  {
    title: "Data Sparta Pty Ltd",
    description: "Democratizing access to advanced data analytics for SMBs, enabling them to compete with larger enterprises.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    features: [
      "Customized data integration platform",
      "Real-time analytics and insights",
      "Automated decision-making tools",
      "Affordable pricing for SMBs"
    ],
    link: "#",
    icon: LineChart
  }
];

export default function VenturesPage() {
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
              My Ventures
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Building innovative solutions in data education and analytics
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ventures Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {ventures.map((venture, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gray-50 dark:bg-gray-700">
                  <CardBody>
                    <div className="aspect-video relative mb-6 rounded-lg overflow-hidden">
                      <img
                        src={venture.image}
                        alt={venture.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <venture.icon className="text-white" size={48} />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{venture.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {venture.description}
                    </p>
                    <ul className="space-y-3 mb-6">
                      {venture.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Target className="text-[#3ec1d3] dark:text-[#2a8591]" size={20} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      as="a"
                      href={venture.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#3ec1d3] dark:bg-[#2a8591] text-white w-full hover:bg-[#2596be] dark:hover:bg-[#1a6b85] transition-colors"
                      endContent={<ArrowUpRight size={20} />}
                    >
                      Visit Website
                    </Button>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}