import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, Users } from 'lucide-react';

export default function PassionSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">My Passions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sustainable Pipelines Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/hire-me"
              className="block h-full"
            >
              <div className="h-full p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#3ec1d3] dark:hover:border-[#2a8591]">
                <Code className="text-[#3ec1d3] dark:text-[#2a8591] mb-4" size={32} />
                <h3 className="text-xl font-bold mb-4">Building Sustainable Pipelines</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Passionate about creating robust and scalable data pipelines that solve real business problems and stand the test of time.
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Next Generation Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              to="/ventures"
              className="block h-full"
            >
              <div className="h-full p-6 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#3ec1d3] dark:hover:border-[#2a8591]">
                <Users className="text-[#3ec1d3] dark:text-[#2a8591] mb-4" size={32} />
                <h3 className="text-xl font-bold mb-4">Nurturing the Next Generation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Dedicated to teaching and mentoring the next generation of data professionals through Data Profession Academy and Data Sparta.
                </p>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}