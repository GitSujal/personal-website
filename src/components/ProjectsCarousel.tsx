import React from 'react';
import { Image } from '@nextui-org/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FolderGit2 } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const projects = [
  {
    title: "MLOps Pipeline for Horse Auctioneer",
    image: "https://images.unsplash.com/photo-1599689019338-50deb475f380?q=80&w=2940&auto=format&fit=crop",
    description: "Automated end-to-end MLOps pipeline for generating item recommendations",
    tech: "AWS SageMaker, Step Functions, Lambda"
  },
  {
    title: "Data Ingestion Platform",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2944&auto=format&fit=crop",
    description: "Standardized data ingestion platform reducing development effort by 60%",
    tech: "AWS Glue, S3, Apache Iceberg"
  },
  {
    title: "Real-time Analytics Pipeline",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    description: "High-frequency ingestion pipeline for IoT data with near real-time analytics",
    tech: "AWS Lambda, SQS, DynamoDB, Redshift"
  }
];

export default function ProjectsCarousel() {
  return (
    <section id="projects" className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <FolderGit2 className="text-[#3ec1d3]" />
          <h2 className="text-3xl font-bold">Featured Projects</h2>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="rounded-xl"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[400px] w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="mb-2">{project.description}</p>
                  <p className="text-[#3ec1d3]">{project.tech}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}