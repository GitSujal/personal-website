import React from 'react';
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { motion } from 'framer-motion';
import { BookOpen, ArrowUpRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

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