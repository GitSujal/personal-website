import React from 'react';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { motion } from 'framer-motion';
import { BookOpen, ArrowUpRight } from 'lucide-react';

const blogPosts = [
  {
    title: "Data Analyst Career in Australia 2024",
    date: "March 2024",
    excerpt: "Navigate your path to becoming a successful data analyst in Australia with this comprehensive guide for 2024.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    link: "https://dataprofessionacademy.com/blog/data-analyst-career-in-australia-2024",
    readTime: "10 min read",
    category: "Career Guide"
  },
  {
    title: "Pandas Just Got 150x Faster",
    date: "March 2024",
    excerpt: "Discover how the latest updates in Pandas library have dramatically improved performance for data wrangling tasks.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    link: "https://dataprofessionacademy.com/blog/pandas-150x-faster",
    readTime: "8 min read",
    category: "Technical"
  },
  {
    title: "Data Analyst, Not a Data Scientist",
    date: "February 2024",
    excerpt: "Understanding the key differences between data analysts and data scientists, and how to excel in your chosen path.",
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=2940&auto=format&fit=crop",
    link: "https://dataprofessionacademy.com/blog/data-analyst-not-a-data-scientist",
    readTime: "7 min read",
    category: "Career Insights"
  },
  {
    title: "Can I Get a Data Analyst Job Without a Degree?",
    date: "January 2024",
    excerpt: "Exploring alternative pathways to becoming a data analyst without traditional academic qualifications.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2940&auto=format&fit=crop",
    link: "https://www.linkedin.com/pulse/can-i-get-data-analyst-job-without-degree-sujal-dhungana/",
    readTime: "6 min read",
    category: "Career Advice"
  },
  {
    title: "10 Things I Do Daily as a Data Analyst",
    date: "January 2024",
    excerpt: "A day in the life of a data analyst: essential practices and habits for success in the field.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2664&auto=format&fit=crop",
    link: "https://www.linkedin.com/pulse/10-things-i-do-daily-data-analyst-sujal-dhungana-ryy2c/",
    readTime: "8 min read",
    category: "Professional Tips"
  }
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="text-[#3ec1d3] dark:text-[#2a8591]" />
          <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                isPressable
                as="a"
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform duration-200"
              >
                <CardHeader className="p-0">
                  <Image
                    alt={post.title}
                    className="object-cover h-48 w-full"
                    src={post.image}
                  />
                </CardHeader>
                <CardBody className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-tiny text-default-500">{post.date}</span>
                    <span className="text-tiny bg-[#3ec1d3]/10 dark:bg-[#2a8591]/10 text-[#3ec1d3] dark:text-[#2a8591] px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-large mb-2">{post.title}</h4>
                  <p className="text-sm text-default-500 mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-tiny text-default-500">{post.readTime}</span>
                    <div className="flex items-center gap-1 text-[#3ec1d3] dark:text-[#2a8591] hover:underline">
                      Read More
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}