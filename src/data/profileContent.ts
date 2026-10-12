export interface ProfileContent {
  name: string;
  highlight: string;
  summaryShort: string;
  summaryLong: string;
  heroButtons: {
    primary: {
      text: string;
      href: string;
    };
    secondary: {
      text: string;
      href: string;
    };
  };
  sections: {
    skills: {
      title: string;
      description: string;
    };
    currentRoles: {
      title: string;
      description: string;
    };
    timeline: {
      title: string;
      description: string;
      viewAllText: string;
    };
    speaking: {
      title: string;
      description: string;
      viewAllText: string;
    };
  };
}

export const profileContent: ProfileContent = {
  name: "Sujal Dhungana",
  highlight: "Senior Data Engineer | Principal Data Engineer | Data Instructor",
  summaryShort: "Senior Data Engineer at Western Power specialising in Databricks, DBT, and Snowflake. Passionate about building robust, scalable data platforms and streamlining infrastructure with IaC.",
  summaryLong: "Senior Data Engineer at Western Power with a passion for building robust, scalable data platforms that stand the test of time. Proven track record in migrating click-and-drag infrastructures to Infrastructure as Code (IaC) using Databricks Asset Bundles, enhancing developer productivity and ensuring consistency. Expert in implementing enterprise standards for dbt and data modelling, and currently focused on optimising end-to-end pipelines for critical network forecast models.",
  heroButtons: {
    primary: {
      text: "View Full Profile",
      href: "/hire-me"
    },
    secondary: {
      text: "Let's Connect",
      href: "#contact"
    }
  },
  sections: {
    skills: {
      title: "Technical Expertise",
      description: "Deep expertise across the modern data stack, from infrastructure to machine learning"
    },
    currentRoles: {
      title: "Currently Making Impact At",
      description: "Driving innovation across multiple organizations"
    },
    timeline: {
      title: "Career Journey Highlights",
      description: "A track record of delivering enterprise-scale solutions and driving significant business impact",
      viewAllText: "View Complete Career Timeline"
    },
    speaking: {
      title: "Thought Leadership & Speaking",
      description: "Actively contributing to the data engineering community through speaking engagements and knowledge sharing",
      viewAllText: "View All Speaking Engagements"
    }
  }
};

// HireMePage specific content
export interface HirePageContent {
  hero: {
    title: string;
    description: string;
    buttons: {
      download: {
        text: string;
        href: string;
      };
      schedule: {
        text: string;
        href: string;
      };
    };
  };
  sections: {
    skills: {
      title: string;
    };
    timeline: {
      title: string;
    };
    certifications: {
      title: string;
    };
  };
}

export const hirePageContent: HirePageContent = {
  hero: {
    title: "Let's Work Together",
    description: "Senior Data Engineer at Western Power with a passion for building robust, scalable data platforms that stand the test of time. Expert in Databricks, DBT, and Snowflake, with a strong focus on Infrastructure as Code (IaC) and enterprise data modelling standards. Dedicated to building self-service tooling and standardised pipelines that empower teams while ensuring critical data governance and maintainability.",
    buttons: {
      download: {
        text: "Download Resume",
        href: "/public/Sujal_Dhungana_Resume.pdf"
      },
      schedule: {
        text: "Schedule Consultation",
        href: "#contact"
      }
    }
  },
  sections: {
    skills: {
      title: "Technical Expertise"
    },
    timeline: {
      title: "Career Journey"
    },
    certifications: {
      title: "Professional Certifications"
    }
  }
};
