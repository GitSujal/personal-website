export interface SpeakingEngagement {
  id: string;
  eventName: string;
  talkTitle: string;
  location: string;
  date: string;
  summary: string;
  image: string;
  eventType: 'conference' | 'meetup' | 'workshop' | 'panel' | 'keynote';
  audience?: string;
  technologies?: string[];
  videoUrl?: string;
  slidesUrl?: string;
}

export const speakingEngagements: SpeakingEngagement[] = [
  {
    id: 'ozwater-2024',
    eventName: 'OzWater Conference 2024',
    talkTitle: 'ML Model for Centrifuge Performance Prediction using Real-time Operational Data',
    location: 'Sydney Convention Centre, Sydney',
    date: 'May 2024',
    summary: 'Presented groundbreaking research on productionising ML models for industrial equipment performance prediction. The paper was voted as one of the top papers at the conference, demonstrating innovative approaches to real-time data processing and predictive analytics in water treatment facilities.',
    image: '/speaking-images/ozwater-2024.jpg', // TODO: Replace with actual image
    eventType: 'conference',
    audience: '500+ water industry professionals',
    technologies: ['Machine Learning', 'Real-time Analytics', 'AWS SageMaker', 'Industrial IoT'],
    // videoUrl: '', // Add when available
    // slidesUrl: '', // Add when available
  },
  {
    id: 'aws-community-day-perth-2024',
    eventName: 'AWS Community Day Perth',
    talkTitle: 'Building Scalable Data Solutions on AWS: From Prototype to Production',
    location: 'Perth Convention Centre, Perth',
    date: 'March 2024',
    summary: 'Led a panel discussion on architecting and scaling data solutions on AWS. Shared insights on best practices for data pipeline design, cost optimization strategies, and the journey from proof-of-concept to enterprise-grade production systems.',
    image: '/speaking-images/aws-community-day-2024.jpg', // TODO: Replace with actual image
    eventType: 'panel',
    audience: '300+ cloud professionals',
    technologies: ['AWS', 'Data Architecture', 'Cost Optimization', 'DevOps'],
  },
  {
    id: 'data-engineering-summit-2024',
    eventName: 'Data Engineering Summit Melbourne',
    talkTitle: 'Modern Data Pipeline Architecture: Balancing Velocity and Reliability',
    location: 'Melbourne Tech Hub, Melbourne',
    date: 'February 2024',
    summary: 'Delivered a keynote presentation on the crucial balance between developer velocity and enterprise-grade reliability in data engineering. Discussed "Everything as Code" principles, self-service tooling, and embedding data governance into automated pipelines.',
    image: '/speaking-images/data-engineering-summit-2024.jpg', // TODO: Replace with actual image
    eventType: 'keynote',
    audience: '400+ data engineers',
    technologies: ['Data Engineering', 'DevOps', 'Infrastructure as Code', 'Data Governance'],
  },
  {
    id: 'perth-data-meetup-2023',
    eventName: 'Perth Data Science & Analytics Meetup',
    talkTitle: 'From Data Analyst to Data Engineer: Career Transition Strategies',
    location: 'Spacecubed, Perth',
    date: 'November 2023',
    summary: 'Shared personal journey and practical advice for data professionals looking to transition into data engineering roles. Covered technical skills development, portfolio building, and navigating the job market in Australia.',
    image: '/speaking-images/perth-data-meetup-2023.jpg', // TODO: Replace with actual image
    eventType: 'meetup',
    audience: '80+ data professionals',
    technologies: ['Career Development', 'Data Engineering', 'Professional Growth'],
  },
  {
    id: 'clickhouse-perth-2024',
    eventName: 'ClickHouse Perth User Group',
    talkTitle: 'Optimizing Real-time Analytics with ClickHouse: Lessons from Production',
    location: 'Telstra Perth Office, Perth',
    date: 'September 2024',
    summary: 'Presented real-world case study on optimizing data pipelines processing 1TB/hr of log data using ClickHouse. Shared performance tuning techniques, cost optimization strategies, and architectural decisions that resulted in 50% cost reduction.',
    image: '/speaking-images/clickhouse-perth-2024.jpg', // TODO: Replace with actual image
    eventType: 'meetup',
    audience: '60+ database professionals',
    technologies: ['ClickHouse', 'Real-time Analytics', 'Performance Optimization', 'Cost Engineering'],
  },
  {
    id: 'python-wa-workshop-2023',
    eventName: 'Python WA Workshop Series',
    talkTitle: 'Data Engineering with Python: Building Production-Ready Pipelines',
    location: 'University of Western Australia, Perth',
    date: 'August 2023',
    summary: 'Conducted a hands-on workshop teaching Python developers how to build robust data pipelines. Covered data validation, error handling, monitoring, and deployment strategies using modern Python tools and AWS services.',
    image: '/speaking-images/python-wa-workshop-2023.jpg', // TODO: Replace with actual image
    eventType: 'workshop',
    audience: '40+ Python developers',
    technologies: ['Python', 'Data Pipelines', 'AWS', 'Data Validation', 'Monitoring'],
  }
];

// Helper function to get events by type
export const getEventsByType = (type: SpeakingEngagement['eventType']) => {
  return speakingEngagements.filter(event => event.eventType === type);
};

// Helper function to get recent events
export const getRecentEvents = (limit: number = 3) => {
  return speakingEngagements
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};