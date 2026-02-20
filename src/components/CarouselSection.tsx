import React from 'react';
import { Image } from '@nextui-org/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Camera } from 'lucide-react';
import { events } from '../data/events';
import { THEME } from '../config/theme';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function CarouselSection() {
  return (
    <section id="events" className={THEME.backgrounds.sectionAlt}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Camera className={THEME.components.icon.primary} />
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
                    <span className={`${THEME.colors.primary.lightBg} px-3 py-1 rounded-full text-sm`}>
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