export interface ContactInfo {
  type: "location" | "email" | "website" | "linkedin";
  label: string;
  value: string;
  url?: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  description?: string;
  bullets?: string[];
  awards?: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  field?: string;
  startYear: string;
  endYear?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    about: string;
    contacts: ContactInfo[];
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  lastUpdated: string;
}

export const resumeData: ResumeData = {
  personal: {
    name: "Claudio Angrigiani",
    title: "Design Engineer",
    about:
      "I've been designing and building digital products for over 10 years, focusing on creating flows and components that are both functional and visually perfect. Working with tools like Figma, Tailwind, NextJS, and React, I design and develop clean design systems that help teams build and scale their products efficiently.",
    contacts: [
      {
        type: "location",
        label: "East Coast, United States",
        value: "East Coast, United States",
      },
      {
        type: "email",
        label: "angrigianicr@gmail.com",
        value: "angrigianicr@gmail.com",
        url: "mailto:angrigianicr@gmail.com",
      },
      {
        type: "website",
        label: "claudio.land",
        value: "claudio.land",
        url: "https://claudio.land",
      },
      {
        type: "linkedin",
        label: "linkedin.com/in/claudioangrigiani",
        value: "linkedin.com/in/claudioangrigiani",
        url: "https://linkedin.com/in/claudioangrigiani",
      },
    ],
  },
  experience: [
    {
      title: "Design Engineer",
      company: "Footprint",
      location: "United States",
      startDate: "Dec 2022",
      bullets: [
        "Designed and maintained the dashboard and onboarding experiences for the company's core product.",
        "Designed a seamless onboarding experiences for native apps, using App Clips for more seamless identity verification.",
        "Redesigned mobile document scan flow, boosting conversion rates from 60% to over 90%.",
        "Maintained a high-quality design system on both design and code sides, using Figma, Tailwind, NextJS, and ReactJS, ensuring design consistency and scalability.",
      ],
    },
    {
      title: "Designer",
      company: "MainStreet",
      location: "Remote",
      startDate: "Jun 2021",
      endDate: "Nov 2022",
      description:
        "MainStreet helps startups discover & claim Federal and State tax credits in minutes, saving each company more than +50K on average.",
      bullets: [
        "Designed the company's core R&D tax credit product, which served as the primary revenue source, overseeing the complete user journey from credit application to redemption for startup founders.",
        "Designed and implemented the company's first Design System, improving the communication between Engineering and Design and helping to build new features more efficiently.",
      ],
    },
    {
      title: "Co-founder | Head of Product and Design",
      company: "Dorothy",
      location: "New York, New York, United States",
      startDate: "Mar 2020",
      endDate: "Dec 2021",
      description:
        "We created new ways to prepare and financially recover from natural disasters. Dorothy is backed by Plug and Play, Hustle Fund, CDL, and UrbanX, among other VC funds.",
      bullets: [
        "I managed the Engineering and Design strategy, hiring and leading our initial team of ML Engineers to build our product.",
        "Led the technical side of fundraising processes, including the company's first pre-seed and seed rounds.",
      ],
    },
    {
      title: "Head of Product Design",
      company: "Banco Galicia",
      location: "Argentina",
      startDate: "Jan 2018",
      endDate: "May 2019",
      bullets: [
        "Managed the first in-house Design team of 8 people, which implemented the bank's first Design System and conducted substantial design improvements for the apps (iOS & Android), online banking (web-app), and the customer loyalty platform.",
      ],
    },
    {
      title: "Sr. Product Designer",
      company: "Banco Galicia",
      location: "Argentina",
      startDate: "Sep 2017",
      endDate: "Jan 2018",
      bullets: [
        "Designed and implemented key features in the App and Online Banking platform, including new token-based authentication, wire-transfer process, in-app credit card payment, investments, checking accounts, and personal finance management tool.",
      ],
    },
    {
      title: "Staff Product Designer (Contract)",
      company: "Explore-Share.com",
      location: "Buenos Aires, Argentina",
      startDate: "Feb 2018",
      endDate: "Apr 2019",
      bullets: [
        "Redesigned all booking flows to enhance user experience.",
        "Successfully migrated all design assets from Sketch to Figma.",
        "Established foundational elements for a comprehensive design system.",
      ],
    },
    {
      title: "Head of Argentinian Acceleration Program",
      company: "Masisa Lab",
      location: "Buenos Aires Province, Argentina",
      startDate: "Sep 2016",
      endDate: "Sep 2017",
      bullets: [
        "Led the Argentinian launch of Masisa's acceleration program, fostering innovation in architecture and construction.",
        "Sourced and selected top-performing startups, significantly increasing the program's industry influence.",
        "Mentored incubated companies, guiding product development and refining go-to-market strategies.",
      ],
    },
    {
      title: "Partner & Head of Product Design",
      company: "CRAN.IO",
      location: "Buenos Aires, Argentina",
      startDate: "Oct 2014",
      endDate: "Aug 2016",
      description:
        "CRAN.IO was a hardware and software agency that provided services to startups and companies.",
      bullets: [
        "Led product and design strategy for over ten seed-stage startups, guiding them from concept to launch of their initial products.",
        "Launched and managed Prismetic Analytics, a spinoff that delivered actionable in-store visitor insights using infrared sensor technology and a cloud-based analytics platform.",
      ],
    },
    {
      title: "Co-Founder",
      company: "WoodpeckeR",
      location: "Buenos Aires, Argentina",
      startDate: "Nov 2012",
      endDate: "Nov 2014",
      description:
        "WoodpeckeR was an industrial design studio that created wooden products for smartphones, tablets, and other devices.",
      bullets: [
        "Awarded the 'Innovative Design' Prize in the 'International Design Fair 2013' in Metropolitan Design Center of Buenos Aires (CMD).",
        "Permanent stock in Museum of Latin American Modern Art (MALBA) official store (2013)",
      ],
    },
    {
      title: "Co-founder & CEO",
      company: "ComeCasero (a 500 Startups Latin America company)",
      location: "Mexico City Area, Mexico",
      startDate: "Oct 2013",
      endDate: "Oct 2014",
      description:
        "ComeCasero was an online marketplace for homemade food to discover and order the best meals from neighboring cooks.",
      bullets: [
        "Co-founded the company with a friend and we raised a seed round from 500 Startups Latin America.",
        "Designed the company's first version of the product and led launch strategy and operations in Mexico City.",
      ],
    },
  ],
  education: [
    {
      degree: "Master of Integrated Product Design",
      school: "University of Pennsylvania",
      field: "Product Design",
      startYear: "2019",
      endYear: "2021",
    },
    {
      degree: "MS, Industrial Engineering",
      school: "Instituto Tecnológico de Buenos Aires",
      field: "Industrial Engineering",
      startYear: "2007",
      endYear: "2013",
    },
    {
      degree: "MS, Exchange Semester",
      school: "KTH Royal Institute of Technology",
      field: "Environmental Science",
      startYear: "2011",
      endYear: "2012",
    },
    {
      degree: "High School",
      school: "Colegio Nacional de Buenos Aires",
      startYear: "2002",
      endYear: "2006",
    },
  ],
  skills: [
    {
      title: "Design Tools",
      skills: ["Figma", "Sketch"],
    },
    {
      title: "Development",
      skills: ["React", "NextJS", "Tailwind CSS", "Python"],
    },
  ],
  lastUpdated: "January 2024",
};
