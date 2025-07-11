export interface Project {
  title: string;
  date: string;
  description: string;
  tech: string;
  image: string;
  link: string;
}

export const projects: Project[] = [
  {
    title: "MLOps Pipeline for Horse Auctioneer",
    date: "2024",
    description: "Automated end-to-end MLOps pipeline for generating item recommendations for potential bidders.",
    tech: "AWS SageMaker, Step Functions, Lambda",
    image: "https://images.unsplash.com/photo-1599689019338-50deb475f380?q=80&w=2940&auto=format&fit=crop",
    link: "#"
  },
  {
    title: "Data Ingestion Platform",
    date: "2023",
    description: "Standardized data ingestion platform reducing development effort by 60% while maintaining data quality.",
    tech: "AWS Glue, S3, Apache Iceberg",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2944&auto=format&fit=crop",
    link: "#"
  },
  {
    title: "Real-time Analytics Pipeline",
    date: "2023",
    description: "High-frequency ingestion pipeline for IoT data enabling near real-time analytics capabilities.",
    tech: "AWS Lambda, SQS, DynamoDB, Redshift",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    link: "#"
  }
];
