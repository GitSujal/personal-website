import { LucideIcon, Briefcase, GraduationCap, BookOpen, Code, Building, Server, Users } from 'lucide-react';

export interface TimelineEvent {
  year: string;
  title: string;
  company: string;
  location?: string;
  description: string[];
  icon: LucideIcon;
  type: 'work' | 'venture' | 'education' | 'volunteer';
  tags: string[];
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: "Oct 2024 - Present",
    title: "Resident Platform Engineer (Contractor)",
    company: "Telstra",
    location: "Perth, WA",
    description: [
      "Optimised data pipelines ingesting over 1TB/hr of log data to Clickhouse and Opensearch",
      "Separated IO-bound and CPU-bound operations with parallelization to utilise idle CPU cores",
      "Implemented event-based scaling of Kubernetes resources",
      "Achieved 50% reduction in compute cost, saving over $600,000 per annum without compromising latency",
      "Designed and built suite of internal toolings and RESTful APIs for K8s application provisioning",
      "Reduced data pipeline creation time from days to hours through automation",
      "Ensured platform uptime exceeds SLA through rigorous change management and incident response"
    ],
    icon: Server,
    type: "work",
    tags: ["Kubernetes", "ClickHouse", "OpenSearch", "Cost Optimization", "Platform Engineering", "APIs"]
  },
  {
    year: "Apr 2024 - Present",
    title: "Principal Data Engineer",
    company: "Data Vanguards Pty Ltd",
    location: "Perth, WA",
    description: [
      "Technical Lead: Architected world's first Warehouse agnostic (Bring your own warehouse) agentic Data Platform",
      "Empowered AI agents with comprehensive, governed access to pipeline metadata and data models",
      "Established data provenance and enabled secure, context-aware analytical reports",
      "Developed fully automated end-to-end MLOPs pipeline for item recommendations (horse auctioneer)",
      "Built lightweight high-frequency ingestion pipeline for IoT data with near real-time analytics",
      "Used native AWS APIs, Lambda, SQS, DynamoDB, Glue Catalogue and Redshift",
      "Designed Data Ingestion Platform with Medallion layers following modern data architecture",
      "Reduced new data source onboarding time by 60% through standardized pipelines",
      "Redesigned ingestion pipeline enhancing reliability while reducing operational costs by 90%",
      "Achieved annual savings of over $30K in cloud expenses"
    ],
    icon: Code,
    type: "work",
    tags: ["MLOps", "Data Architecture", "AI Agents", "AWS", "Cost Optimization", "Real-time Analytics"]
  },
  {
    year: "Aug 2023 - Present",
    title: "Founder | Instructor",
    company: "Data Profession Academy",
    location: "Perth, WA",
    description: [
      "Designed and delivered 12-week data analytics curriculum to 20+ aspiring professionals",
      "Majority of students secured their first industry role within 3 months of completion",
      "Provided comprehensive mentorship covering technical skills (Python, SQL, PowerBI)",
      "Developed non-technical skills including Problem Solving and Data Storytelling",
      "Empowered students to become well-rounded data analysts ready to deliver value from day one"
    ],
    icon: BookOpen,
    type: "venture",
    tags: ["Education", "Data Analytics", "Mentoring", "Python", "SQL", "PowerBI"]
  },
  {
    year: "May 2022 - Apr 2024",
    title: "Senior Data Engineer",
    company: "Water Corporation",
    location: "Perth, WA",
    description: [
      "Created end-to-end MLOPs pipeline leveraging AWS native cloud stacks",
      "Used SageMaker, Code Build, Step Functions, Lambda for seamless deployment",
      "Reduced time to production from days to minutes with minimal manual intervention",
      "Enabled cross-account deployment of ML models with governance and approval workflows",
      "Productionised ML model to predict Centrifuge Performance using real-time operational data",
      "Paper voted one of the top papers in OzWater conference 2024",
      "Designed end-to-end ingestion platform with Apache Iceberg tables in S3",
      "Incorporated data quality reporting and dimensional modelling with SCD capabilities",
      "Cut pipeline build time from 2 days to 2 hours with config-driven approach",
      "Reduced cloud costs by 50% through optimization",
      "Developed automated reporting platform enabling self-serve analytics",
      "Reduced model build time by 50% and eliminated production delays",
      "Built large-scale data ingestion pipelines for PI, GIS, SQL servers",
      "Implemented business logic using PySpark in AWS Glue ETL",
      "Facilitated management of AUD 2.3 billion worth of assets through objective risk assessment",
      "Automated data validation and quality assurance reducing test times from days to hours"
    ],
    icon: Building,
    type: "work",
    tags: ["MLOps", "AWS", "Apache Iceberg", "PySpark", "Data Quality", "SageMaker", "Real-time Analytics"]
  },
  {
    year: "Aug 2020 - May 2022",
    title: "Technology Consultant",
    company: "Visagio",
    location: "Perth, WA",
    description: [
      "Developed time and attendance tool for tier-one mining company",
      "Provided enhanced visibility into workforce consumption and future forecasts",
      "Empowered supervisors to optimise daily plans resulting in over $40 million in savings",
      "Built strategic workforce planning tool enabling demographic projections over 5-10 year horizons",
      "Incorporated current demographics with scenario modelling capabilities",
      "Generated realistic and actionable workforce forecasts",
      "Developed and redesigned multiple mission-critical dashboards using Power BI and Spotfire",
      "Restructured dashboards with best practices in data modelling and transformation",
      "Significantly increased dashboard responsiveness and maintainability"
    ],
    icon: Briefcase,
    type: "work",
    tags: ["Consulting", "Power BI", "Spotfire", "Workforce Analytics", "Mining Industry", "Cost Savings"]
  },
  {
    year: "2020",
    title: "Master of Predictive Analytics",
    company: "Curtin University",
    location: "Bentley, Western Australia",
    description: [
      "Minor in Finance and Investment",
      "GPA: 8.0/10 (High Distinction)",
      "Advanced predictive modeling, machine learning, and data analytics",
      "Specialized in statistical analysis and financial modeling"
    ],
    icon: GraduationCap,
    type: "education",
    tags: ["Machine Learning", "Predictive Analytics", "Finance", "Statistics"]
  },
  {
    year: "Jul 2021 - Aug 2021",
    title: "Python Instructor",
    company: "Nepalese Engineers in WA",
    location: "Perth, WA",
    description: [
      "Conducted 5-week-long Python programming masterclass with 20+ participants",
      "Covered basics of Python programming and specific use cases for different engineering fields",
      "Included applications for electrical, mechanical and other engineering disciplines"
    ],
    icon: Code,
    type: "volunteer",
    tags: ["Python", "Teaching", "Engineering", "Community Service"]
  },
  {
    year: "Jan 2020 - Dec 2020",
    title: "Student Volunteer",
    company: "John Curtin Leadership Academy",
    location: "Perth, WA",
    description: [
      "Led volunteer team to help Curtin C3 project conduct various activities",
      "Organized 'Design-A-Thon' conducted in May 2020",
      "Led team to organize online event 'WA's Sustainable Future'",
      "Featured speakers from Deloitte, Curtin University and CleanState",
      "Attracted 50+ participants to sustainability-focused event"
    ],
    icon: Users,
    type: "volunteer",
    tags: ["Leadership", "Event Management", "Sustainability", "Community Engagement"]
  },
  {
    year: "2017",
    title: "Bachelor of Electronics and Communications Engineering",
    company: "Tribhuvan University",
    location: "Kathmandu, Nepal",
    description: [
      "GPA: 8.0/10 (High Distinction)",
      "Specialized in telecommunications and embedded systems",
      "Strong foundation in engineering principles and problem-solving"
    ],
    icon: GraduationCap,
    type: "education",
    tags: ["Electronics", "Engineering", "Telecommunications", "Embedded Systems"]
  }
];
