# 🚀 Modern Portfolio Website Template

> **Build your amazing portfolio website for FREE!** A modern, responsive, and fully customizable portfolio template built with React, TypeScript, and TailwindCSS.

## ✨ Features

- 🎨 **Modern Design** - Clean, professional, and mobile-responsive
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🎯 **Easy Customization** - Simply update your details in the data folder
- 📱 **Fully Responsive** - Looks great on all devices
- 🌙 **Dark/Light Mode** - Built-in theme switching
- 📊 **Interactive Components** - Smooth animations with Framer Motion
- 🔍 **SEO Optimized** - Meta tags and structured data included
- 🚀 **Deploy Ready** - Easy deployment to Vercel, Netlify, or any hosting platform

## 🌟 What You Get

This template includes everything you need for a professional portfolio:

### 🏠 **Homepage**
- Hero section with your photo and introduction
- Skills showcase with interactive categories
- Featured projects carousel
- Current roles and achievements
- Career timeline highlights
- Speaking engagements
- Contact information

### 💼 **Hire Me Page**
- Detailed professional summary
- Complete skills breakdown
- Full career timeline
- Professional certifications
- Call-to-action buttons

### 🚀 **Ventures Page**
- Your companies and projects
- Business achievements
- Entrepreneurial journey

## 📸 Live Demo

> **See it in action**: Visit [Sujal's Portfolio](https://sujal.datasparta.com) to see this template live!

*Your portfolio will look just as professional - simply replace the content with yours.*

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: TailwindCSS + NextUI Components
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **Routing**: React Router
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed on your computer
- Basic knowledge of editing text files (no coding experience required!)

### 1. Clone the Repository
```bash
git clone https://github.com/GitSujal/personal-website.git
cd personal-website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Navigate to `http://localhost:5173` to see your portfolio website!

### 5. Start Customizing!
Head to the [Customization Guide](#-customization-guide) below to make it yours! 🎨

## 🎯 Customization Guide

**🎉 It's incredibly simple!** Just update the data files with your information - no complex coding required!

### Step 1: Update Your Profile Information
Edit `/src/data/profileContent.ts`:
```typescript
export const profileContent: ProfileContent = {
  name: "Your Name",                    // Your full name
  highlight: "Your Job Title | Skills", // Professional headline
  summaryShort: "Brief description of what you do...",
  summaryLong: "Detailed description for the hire page...",
  heroButtons: {
    primary: {
      text: "View Full Profile",
      href: "/hire-me"                   // or any page you want
    },
    secondary: {
      text: "Let's Connect",
      href: "#contact"                   // Link to contact section
    }
  },
  // ... rest of the configuration
};
```

### Step 2: Add Your Projects
Edit `/src/data/projects.ts`:
```typescript
export const projects: Project[] = [
  {
    title: "Your Amazing Project",
    date: "2024",
    description: "Brief description of what this project does and its impact.",
    tech: "React, Node.js, PostgreSQL",  // Technologies used
    image: "https://your-image-url.com",  // Project screenshot
    link: "https://your-project.com"      // Live demo or GitHub link
  },
  // Add as many projects as you want...
];
```

### Step 3: Update Your Skills
Edit `/src/data/skills.ts`:
```typescript
export const skills: Skill[] = [
  { name: "JavaScript", category: "Programming Languages" },
  { name: "React", category: "Frontend Frameworks" },
  { name: "Node.js", category: "Backend Technologies" },
  // Add all your skills...
];
```

### Step 4: Essential Files to Customize

| File | Description | Priority |
|------|-------------|----------|
| 📝 `profileContent.ts` | Your name, title, bio | **REQUIRED** |
| 🚀 `projects.ts` | Your project portfolio | **REQUIRED** |
| 🛠️ `skills.ts` | Your technical skills | **REQUIRED** |
| 💼 `currentRoles.ts` | Current job positions | Recommended |
| 📚 `timelineEvents.ts` | Career milestones | Recommended |
| 🏆 `certifications.ts` | Professional certifications | Optional |
| 🎤 `speakingEngagements.ts` | Speaking events | Optional |
| 🏢 `ventures.ts` | Your companies/ventures | Optional |
| ✍️ `blogPosts.ts` | Your blog articles | Optional |
| 🎯 `keyAchievements.ts` | Key accomplishments | Optional |

### Step 5: Replace Images and Assets
1. Add your profile photo to `public/` folder
2. Update image URLs in data files to point to your images
3. Replace `public/favicon.ico` with your favicon
4. Update any project screenshots

## 🗂️ File Structure

```
src/
├── data/              # 📊 All your personal data (EDIT THESE!)
│   ├── profileContent.ts    # Main profile information
│   ├── projects.ts          # Your projects portfolio
│   ├── skills.ts           # Technical skills
│   ├── currentRoles.ts     # Current positions
│   ├── timelineEvents.ts   # Career timeline
│   ├── certifications.ts   # Certifications
│   └── ...                 # Other data files
├── components/        # 🧩 Reusable UI components
├── pages/            # 📄 Website pages
└── ...
```

## 🎨 Customization Tips

### Colors and Styling
- Edit `tailwind.config.js` to customize colors and styling
- Update CSS variables in `src/index.css` for global styles

### Images and Assets
- Add your images to the `public/` folder
- Update image URLs in the data files to point to your assets

### Favicon and Meta
- Replace `public/favicon.ico` with your favicon
- Update meta tags in `index.html`

## 🚀 Deployment

### Deploy to Vercel (Recommended - FREE)
1. Create a [Vercel account](https://vercel.com)
2. Push your customized code to GitHub
3. Import your repository in Vercel dashboard
4. Deploy with zero configuration! 🎉

### Deploy to Netlify (Also FREE)
1. Create a [Netlify account](https://netlify.com)
2. Build the project: `npm run build`
3. Drag and drop the `dist/` folder to Netlify

### Deploy to GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Build: `npm run build`
4. Deploy: `npm run deploy`

### Other Hosting Platforms
For any static hosting provider:
1. Build the project: `npm run build`
2. Upload the `dist/` folder to your hosting provider

## 💡 FAQ

### Q: Do I need to know how to code?
**A:** No! You only need to edit text files in the `src/data/` folder. Just replace the example information with yours.

### Q: Can I add more sections?
**A:** Yes! The template is designed to be extensible. You can duplicate existing data files and components.

### Q: How do I change colors/styling?
**A:** Edit `tailwind.config.js` for colors and `src/index.css` for global styles.

### Q: Can I use this for commercial purposes?
**A:** Yes! This template is MIT licensed - use it for personal or commercial projects.

### Q: How do I add my own domain?
**A:** Configure your domain in your hosting provider's dashboard (Vercel, Netlify, etc.).

### Q: The build is failing, what should I do?
**A:** Make sure all required fields in the data files are filled. Check the console for error messages.

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🤝 Contributing

Found a bug or have a feature request? Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🌟 Show Your Support

If this template helped you build your portfolio, please give it a ⭐ star!

---

**Made with ❤️ for the developer community. Build your amazing portfolio website for free!**

### 💡 Need Help?

- Check the [Issues](https://github.com/GitSujal/personal-website/issues) for common questions
- Create a new issue if you need help with customization
- Star the repo if you found it useful!

---

> **Original Portfolio**: Visit [Sujal's Portfolio](https://sujal.datasparta.com) to see this template in action!