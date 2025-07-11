import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardBody, Image, Chip } from "@nextui-org/react";
import { Mic, MapPin, Calendar, Users, Play, FileText } from 'lucide-react';
import { speakingEngagements, type SpeakingEngagement } from '../data/speakingEngagements';

const getEventTypeColor = (type: SpeakingEngagement['eventType']) => {
  switch (type) {
    case 'keynote':
      return 'bg-purple-500/10 text-purple-500';
    case 'conference':
      return 'bg-blue-500/10 text-blue-500';
    case 'panel':
      return 'bg-green-500/10 text-green-500';
    case 'workshop':
      return 'bg-orange-500/10 text-orange-500';
    case 'meetup':
      return 'bg-teal-500/10 text-teal-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
};

const getEventTypeIcon = (type: SpeakingEngagement['eventType']) => {
  switch (type) {
    case 'keynote':
      return '🎤';
    case 'conference':
      return '🏛️';
    case 'panel':
      return '👥';
    case 'workshop':
      return '🛠️';
    case 'meetup':
      return '☕';
    default:
      return '📢';
  }
};

export default function SpeakingSection() {
  return (
    <section id="speaking" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <Mic className="text-[#3ec1d3] dark:text-[#2a8591]" />
          <h2 className="text-3xl font-bold">Speaking Engagements & Public Presence</h2>
        </div>
        
        <div className="mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
            Actively contributing to the data engineering community through speaking engagements, 
            workshops, and thought leadership. Sharing insights from real-world implementations 
            and helping fellow professionals navigate the evolving data landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakingEngagements.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:scale-105 transition-transform duration-200 h-full">
                <CardHeader className="p-0">
                  <div className="relative">
                    <Image
                      alt={event.talkTitle}
                      className="object-cover h-48 w-full"
                      src={event.image}
                      fallbackSrc="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940&auto=format&fit=crop"
                    />
                    <div className="absolute top-3 left-3">
                      <Chip
                        size="sm"
                        className={getEventTypeColor(event.eventType)}
                        variant="flat"
                        startContent={<span className="text-xs">{getEventTypeIcon(event.eventType)}</span>}
                      >
                        {event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1)}
                      </Chip>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="p-4 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="text-[#3ec1d3] dark:text-[#2a8591]" size={16} />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{event.date}</span>
                  </div>
                  
                  <h4 className="font-bold text-lg mb-2 line-clamp-2">{event.talkTitle}</h4>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-[#3ec1d3] dark:text-[#2a8591]">{event.eventName}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="text-gray-400" size={14} />
                    <span className="text-sm text-gray-500 dark:text-gray-400">{event.location}</span>
                  </div>

                  {event.audience && (
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="text-gray-400" size={14} />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{event.audience}</span>
                    </div>
                  )}
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {event.summary}
                  </p>
                  
                  {event.technologies && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {event.technologies.map((tech, techIndex) => (
                        <Chip
                          key={techIndex}
                          size="sm"
                          className="bg-[#3ec1d3]/10 text-[#3ec1d3] dark:bg-[#2a8591]/10 dark:text-[#2a8591]"
                          variant="flat"
                        >
                          {tech}
                        </Chip>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 mt-auto">
                    {event.videoUrl && (
                      <a
                        href={event.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-[#3ec1d3] dark:text-[#2a8591] hover:underline"
                      >
                        <Play size={12} />
                        Watch
                      </a>
                    )}
                    {event.slidesUrl && (
                      <a
                        href={event.slidesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-[#3ec1d3] dark:text-[#2a8591] hover:underline"
                      >
                        <FileText size={12} />
                        Slides
                      </a>
                    )}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Interested in Having Me Speak?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              I'm always excited to share knowledge and insights with the data community. 
              Whether it's a conference, meetup, workshop, or corporate event, I'd love to contribute.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-[#3ec1d3] dark:bg-[#2a8591] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#2596be] dark:hover:bg-[#1a6b85] transition-colors"
            >
              <Mic size={20} />
              Invite Me to Speak
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}