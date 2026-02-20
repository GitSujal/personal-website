import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Chip } from '@nextui-org/react';
import { timelineEvents } from '../data/timelineEvents';
import { getTimelineTypeColor, getTimelineTypeIcon } from '../utils/colorMappings';
import { THEME } from '../config/theme';

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
                className={`transition-all duration-300 hover:shadow-lg ${
                  selectedEvent === index ? `scale-105 border-2 ${THEME.colors.primary.lightBorder} ${THEME.colors.primary.darkBorder}` : 'hover:scale-102'
                }`}
              >
                <CardBody className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <event.icon className={`${THEME.components.icon.primary} dark:text-[#2a8591]`} size={24} />
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${THEME.colors.primary.lightClass} ${THEME.colors.primary.darkClass}`}>{event.year}</span>
                      <span className="text-xs">{getTimelineTypeIcon(event.type)}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{event.title}</h3>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">{event.company}</p>
                  {event.location && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{event.location}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {event.tags.map((tag, tagIndex) => (
                      <Chip
                        key={tagIndex}
                        size="sm"
                        className={getTimelineTypeColor(event.type)}
                        variant="flat"
                      >
                        {tag}
                      </Chip>
                    ))}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p className="font-medium mb-2">Key Achievements:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {event.description.slice(0, 3).map((item, descIndex) => (
                        <li key={descIndex}>{item}</li>
                      ))}
                    </ul>
                    {event.description.length > 3 && (
                      <p className="text-[#3ec1d3] dark:text-[#2a8591] text-xs mt-2 cursor-pointer">
                        Click to see {event.description.length - 3} more achievements...
                      </p>
                    )}
                  </div>
                  {selectedEvent === index && event.description.length > 3 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-gray-600 dark:text-gray-300 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600"
                    >
                      <p className="font-medium mb-2">Additional Achievements:</p>
                      <ul className="list-disc list-inside space-y-1">
                        {event.description.slice(3).map((item, descIndex) => (
                          <li key={descIndex}>{item}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </CardBody>
              </Card>
            </div>
            <div className="relative flex items-center justify-center w-12 h-12 z-10">
              <div className="absolute w-6 h-6 bg-[#3ec1d3] dark:bg-[#2a8591] rounded-full border-4 border-white dark:border-gray-900 shadow-lg"></div>
            </div>
            <div className="w-1/2"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}