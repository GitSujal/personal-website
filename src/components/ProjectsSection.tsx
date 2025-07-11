import React from 'react';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { motion } from 'framer-motion';
import { FolderGit2 } from 'lucide-react';
import { projects } from '../data/projects';

function ProjectsSection() {
  return (
    <section id="projects" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <FolderGit2 className="text-[#3ec1d3]" />
          <h2 className="text-3xl font-bold">Featured Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:scale-105 transition-transform duration-200">
                <CardHeader className="p-0">
                  <Image
                    alt={project.title}
                    className="object-cover h-48 w-full"
                    src={project.image}
                  />
                </CardHeader>
                <CardBody className="p-4">
                  <p className="text-tiny text-default-500">{project.date}</p>
                  <h4 className="font-bold text-large">{project.title}</h4>
                  <p className="text-sm text-default-500 mb-2">{project.description}</p>
                  <p className="text-xs text-[#3ec1d3] font-semibold">{project.tech}</p>
                  <a 
                    href={project.link}
                    className="text-[#3ec1d3] hover:underline mt-2 inline-block"
                  >
                    View Project →
                  </a>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;