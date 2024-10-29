import React from 'react';
import { Image } from '@nextui-org/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Camera } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const events = [
  {
    title: "OzWater Conference 2024",
    date: "May 2024",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940&auto=format&fit=crop",
    description: "Presenting research on ML model for Centrifuge Performance Prediction",
    location: "Sydney Convention Centre"
  },
  {
    title: "AWS Community Day Perth",
    date: "March 2024",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2940&auto=format&fit=crop",
    description: "Panel discussion on building scalable data solutions on AWS",
    location: "Perth Convention Centre"
  },
  {
    title: "Data Engineering Summit",
    date: "February 2024",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2940&auto=format&fit=crop",
    description: "Keynote speaker on modern data pipeline architecture",
    location: "Melbourne Tech Hub"
  }
];

export default function CarouselSection() {
  return (
    <section id="events" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Camera className="text-[#3ec1d3]" />
          <h2 className="text-3xl font-bold">Events & Talks</h2>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="rounded-xl overflow-hidden"
        >
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[500px] w-full">
                <Image
                  src={event.image}
                  alt={event.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#3ec1d3] px-3 py-1 rounded-full text-sm">
                      {event.date}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{event.title}</h3>
                  <p className="text-lg mb-2">{event.description}</p>
                  <p className="text-sm text-gray-300">{event.location}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}