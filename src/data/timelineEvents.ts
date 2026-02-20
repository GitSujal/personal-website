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
    year: "Sep 2025 - Present",
    title: "Senior Data Engineer",
    company: "Western Power",
    location: "Perth, WA",
    description: [
      "Engineered large-scale data architecture for massive volumes of network telemetry, demographic, and meteorological datasets",
      "Designed and maintained 1000+ interdependent dbt models for data transformation and ML feature engineering",
      "Championed Everything-as-Code culture replacing manual UI development with Databricks Asset Bundles and dbt",
      "Enabled automated, seamless deployment of pipelines across multiple environments",
      "Built internal developer tooling and helper scripts automating enterprise data governance",
      "Authored comprehensive Data Engineering Starter Guide providing codebase for best practices",
      "Led technical onboarding and team mentorship, scaling data engineering function from 1 to 3 engineers",
      "Instilled culture of pragmatic excellence, code quality, and end-to-end ownership"
    ],
    icon: Server,
    type: "work",
    tags: ["dbt", "Databricks", "Data Governance", "CI/CD", "Team Leadership", "Data Architecture"]
  },
  {
    year: "Oct 2024 - Aug 2025",
    title: "Resident Platform Engineer (Contractor)",
    company: "Telstra",
    location: "Perth, WA",
    description: [
      "Architected and operated event-driven data ingestion platform (AWS MSK/Kafka) processing 1TB/hour of security telemetry",
      "Engineered near-real-time pipelines using Vector for denoising and transforming logs before Clickhouse and OpenSearch",
      "Minimized source-to-sink latency while processing massive data volumes",
      "Reduced compute costs by 50% (saving $600,000+ annually) through decoupling I/O and CPU operations",
      "Optimized Kafka components and implemented event-based scaling for Kubernetes resources",
      "Secured end-to-end architecture with strict VPC isolation, TLS encryption, SASL/SCRAM authentication, and OAuth2",
      "Built internal Python tooling and RESTful APIs for Kubernetes application provisioning and management",
      "Reduced secure data pipeline creation time from days to hours through automation",
      "Maintained platform uptime above SLA through rigorous change management and automated rolling updates",
      "Led on-call incident response with deep-dive root cause analysis and SOP documentation"
    ],
    icon: Server,
    type: "work",
    tags: ["AWS MSK", "Kafka", "Vector", "ClickHouse", "OpenSearch", "Kubernetes", "Security", "Cost Optimization"]
  },
  {
    year: "Apr 2024 - Sep 2025",
    title: "Principal Data Engineer",
    company: "Data Vanguards Pty Ltd",
    location: "Perth, WA",
    description: [
      "Architected warehouse-agnostic Data Platform (Redshift, Athena, Snowflake) as Technical Lead",
      "Built OAuth2-secured APIs integrated with pipeline metadata for context-aware AI agents",
      "Enabled secure analytical reporting with seamless warehouse flexibility",
      "Developed high-frequency serverless data ingestion pipeline for IoT telemetry using Lambda, SQS, DynamoDB, Redshift",
      "Enabled near real-time analytics with least-privilege IAM security and structured logging",
      "Standardized data ingestion with Medallion architecture reducing onboarding time by 60%",
      "Built reusable, modular pipelines significantly lowering platform maintenance overhead",
      "Redesigned legacy AWS pipeline resolving performance bottlenecks and reducing costs by 90%",
      "Achieved $30,000+ annual savings through comprehensive optimization",
      "Established end-to-end observability using Prometheus, Grafana, and custom CloudWatch metrics",
      "Engineered fully automated MLOps pipeline for training, deploying, and operating ML models",
      "Delivered real-time item recommendations for large-scale national auction platform"
    ],
    icon: Code,
    type: "work",
    tags: ["Data Architecture", "AWS", "Serverless", "MLOps", "OAuth2", "Medallion", "Cost Optimization", "AI Agents"]
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
