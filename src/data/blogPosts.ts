export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  link: string;
  readTime: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Data Analyst Career in Australia 2024",
    date: "March 2024",
    excerpt: "Navigate your path to becoming a successful data analyst in Australia with this comprehensive guide for 2024.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    link: "https://dataprofessionacademy.com/blog/data-analyst-career-in-australia-2024",
    readTime: "10 min read",
    category: "Career Guide"
  },
  {
    title: "Pandas Just Got 150x Faster",
    date: "March 2024",
    excerpt: "Discover how the latest updates in Pandas library have dramatically improved performance for data wrangling tasks.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    link: "https://dataprofessionacademy.com/blog/pandas-150x-faster",
    readTime: "8 min read",
    category: "Technical"
  },
  {
    title: "Data Analyst, Not a Data Scientist",
    date: "February 2024",
    excerpt: "Understanding the key differences between data analysts and data scientists, and how to excel in your chosen path.",
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=2940&auto=format&fit=crop",
    link: "https://dataprofessionacademy.com/blog/data-analyst-not-a-data-scientist",
    readTime: "7 min read",
    category: "Career Insights"
  },
  {
    title: "Can I Get a Data Analyst Job Without a Degree?",
    date: "January 2024",
    excerpt: "Exploring alternative pathways to becoming a data analyst without traditional academic qualifications.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2940&auto=format&fit=crop",
    link: "https://www.linkedin.com/pulse/can-i-get-data-analyst-job-without-degree-sujal-dhungana/",
    readTime: "6 min read",
    category: "Career Advice"
  },
  {
    title: "10 Things I Do Daily as a Data Analyst",
    date: "January 2024",
    excerpt: "A day in the life of a data analyst: essential practices and habits for success in the field.",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2664&auto=format&fit=crop",
    link: "https://www.linkedin.com/pulse/10-things-i-do-daily-data-analyst-sujal-dhungana-ryy2c/",
    readTime: "8 min read",
    category: "Professional Tips"
  }
];
