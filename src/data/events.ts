export interface Event {
  title: string;
  date: string;
  image: string;
  description: string;
  location: string;
}

export const events: Event[] = [
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
