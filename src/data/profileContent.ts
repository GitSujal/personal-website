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
  highlight: "Principal Data Engineer | Platform Engineering | Data Instructor",
  summaryShort: "Seasoned Data Engineer with a passion for building robust, scalable data platforms that stand the test of time. Specializing in the crucial balance between developer velocity and enterprise-grade reliability.",
  summaryLong: "Seasoned Data Engineer with a passion for building robust, scalable data platforms that stand the test of time. Specialising in exploring the crucial balance between developer velocity and enterprise-grade reliability. Deeply committed to \"Everything as Code\" and DevOps principles to build self-service tooling, standardised pipelines, and efficient orchestration systems that empower teams while embedding critical data governance, security controls, and maintainability.",
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
    description: "Seasoned Data Engineer with a passion for building robust, scalable data platforms that stand the test of time. Specialising in exploring the crucial balance between developer velocity and enterprise-grade reliability. Deeply committed to \"Everything as Code\" and DevOps principles to build self-service tooling, standardised pipelines, and efficient orchestration systems that empower teams while embedding critical data governance, security controls, and maintainability.",
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
