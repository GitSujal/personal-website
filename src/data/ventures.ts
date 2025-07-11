import { LucideIcon, LineChart, BookOpen, Users, TrendingUp, Building2, Award } from 'lucide-react';

export interface VentureFeature {
  title: string;
  description: string;
}

export interface VentureImpact {
  [key: string]: string;
}

export interface VentureStat {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
}

export interface Venture {
  title: string;
  tagline: string;
  description: string;
  image: string;
  founded: string;
  status: string;
  impact: VentureImpact;
  features: VentureFeature[];
  technologies: string[];
  achievements: string[];
  link: string;
  icon: LucideIcon;
  color: string;
}

// Venture Statistics - Highlights for hero section
export const ventureStats: VentureStat[] = [
  {
    icon: Users,
    label: "Students Trained",
    value: "20+",
    description: "Across Data Profession Academy"
  },
  {
    icon: TrendingUp,
    label: "Job Placement Rate",
    value: "85%",
    description: "Within 3 months of graduation"
  },
  {
    icon: Building2,
    label: "Active Ventures",
    value: "2",
    description: "Education & Analytics platforms"
  },
  {
    icon: Award,
    label: "Industry Impact",
    value: "High",
    description: "Recognized innovation in data education"
  }
];

export const ventures: Venture[] = [
  {
    title: "Data Profession Academy",
    tagline: "Empowering the Next Generation of Data Analysts",
    description: "A comprehensive training academy focused on bridging the gap between academic knowledge and industry-ready skills. We don't just teach tools - we build complete data professionals.",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2940&auto=format&fit=crop",
    founded: "August 2023",
    status: "Active",
    impact: {
      studentsTrained: "20+",
      jobPlacementRate: "85%",
      avgTimeToJob: "3 months",
      industryPartners: "5+"
    },
    features: [
      {
        title: "Comprehensive 12-Week Curriculum",
        description: "From Python fundamentals to advanced analytics and storytelling"
      },
      {
        title: "Hands-on Project Portfolio",
        description: "Real-world projects that demonstrate industry-ready skills"
      },
      {
        title: "Career Support & Mentorship",
        description: "Resume building, interview prep, and ongoing career guidance"
      },
      {
        title: "Industry-Relevant Training",
        description: "Curriculum designed with input from hiring managers and industry leaders"
      },
      {
        title: "Soft Skills Development",
        description: "Communication, problem-solving, and data storytelling capabilities"
      },
      {
        title: "Job Placement Assistance",
        description: "Direct connections with hiring partners and job referral network"
      }
    ],
    technologies: ["Python", "SQL", "Power BI", "Excel", "Statistics", "Data Storytelling"],
    achievements: [
      "85% job placement rate within 3 months of graduation",
      "Students placed at major companies including mining, finance, and tech sectors",
      "Developed partnerships with 5+ industry employers",
      "Created Australia's most practical data analyst curriculum",
      "Built a community of 100+ data professionals"
    ],
    link: "https://dataprofessionacademy.com/",
    icon: BookOpen,
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    title: "Data Sparta Pty Ltd",
    tagline: "Democratizing Advanced Analytics for SMBs",
    description: "Making enterprise-grade data analytics accessible and affordable for small and medium businesses. We believe every business deserves data-driven insights, not just the Fortune 500.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    founded: "2024",
    status: "In Development",
    impact: {
      targetMarket: "SMB Sector",
      costReduction: "70%",
      implementationTime: "Days not Months",
      scalability: "Cloud-Native"
    },
    features: [
      {
        title: "Warehouse-Agnostic Platform",
        description: "Bring your own warehouse - works with Redshift, Snowflake, BigQuery, and more"
      },
      {
        title: "AI-Powered Data Integration",
        description: "Automated data source discovery and intelligent schema mapping"
      },
      {
        title: "Self-Service Analytics",
        description: "Empower business users with intuitive, no-code analytics tools"
      },
      {
        title: "Real-Time Insights",
        description: "Live dashboards and automated alerting for critical business metrics"
      },
      {
        title: "Affordable Pricing Model",
        description: "Subscription-based pricing that scales with your business growth"
      },
      {
        title: "Enterprise-Grade Security",
        description: "Bank-level security with role-based access and data governance"
      }
    ],
    technologies: ["AWS", "Apache Iceberg", "ClickHouse", "Python", "React", "AI/ML", "Kubernetes"],
    achievements: [
      "Architected world's first warehouse-agnostic agentic data platform",
      "Reduced typical implementation costs by 70% compared to traditional solutions",
      "Built scalable architecture handling enterprise workloads",
      "Developed AI agents for automated data pipeline management",
      "Created innovative pricing model accessible to SMBs"
    ],
    link: "#",
    icon: LineChart,
    color: "bg-green-500/10 text-green-500"
  }
];
