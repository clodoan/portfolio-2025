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
        "Designed and implemented user-friendly interfaces for desktop and mobile platforms, enhancing user engagement.",
        "Created seamless onboarding experiences for native apps, streamlining identity verification processes.",
        "Redesigned mobile document scan flow, boosting conversion rates from 60% to over 90%.",
        "Maintained a high-quality design system using Figma, Tailwind, NextJS, and ReactJS, ensuring design consistency.",
      ],
    },
    {
      title: "Designer",
      company: "MainStreet",
      location: "Remote",
      startDate: "Jun 2021",
      endDate: "Nov 2022",
      description:
        "MainStreet helps startups discover & claim Federal and State tax credits in minutes, saving each company more than +50K on average. Designing our core R&D Taxes experience, the company's primary revenue source.",
      bullets: [
        "I lead the design of this core value proposition from when founders apply for credits to the moment they redeem them.",
        "Led the design and implementation of the company's first Design System, improving the communication between Engineering and Design and helping to build new features more efficiently.",
      ],
    },
    {
      title: "Cofounder | Head of Product and Design",
      company: "Dorothy",
      location: "New York, New York, United States",
      startDate: "Mar 2020",
      endDate: "Dec 2021",
      description:
        "We created new ways to prepare and financially recover from natural disasters. Dorothy is backed by Plug and Play, Hustle Fund, CDL, and UrbanX, among other VC funds.",
      bullets: ["I managed the Product and Design strategy and built our MVP."],
    },
    {
      title: "Product Design Manager",
      company: "Banco Galicia",
      location: "Argentina",
      startDate: "Jan 2018",
      endDate: "May 2019",
      bullets: [
        "Managed the first in-house Design team which implemented the bank's first Design System and conducted substantial design improvements for the apps (iOS & Android), online banking (web-app), and the customer loyalty platform.",
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
      title: "Freelance Product Designer",
      company: "Explore-Share.com",
      location: "Buenos Aires, Argentina",
      startDate: "Feb 2018",
      endDate: "Apr 2019",
      bullets: [
        "Redesigned all booking flows to enhance user experience, resulting in a more modern and intuitive interface.",
        "Successfully migrated design assets from Sketch to Figma",
        "Established foundational elements for a comprehensive design system",
      ],
    },
    {
      title: "Head of Argentinian Acceleration Program",
      company: "Masisa Lab",
      location: "Buenos Aires Province, Argentina",
      startDate: "Sep 2016",
      endDate: "Sep 2017",
      bullets: [
        "Spearheaded the Argentinian edition of Masisa's acceleration program, driving innovation in architecture and construction.",
        "Identified and selected high-potential startups, enhancing the program's impact on the industry.",
        "Provided mentorship to incubated companies, shaping product iterations and market strategies.",
      ],
    },
    {
      title: "Partner & Head of Product Design",
      company: "CRAN.IO",
      location: "Buenos Aires, Argentina",
      startDate: "Oct 2014",
      endDate: "Aug 2016",
      bullets: [
        "Oversaw the product and design strategy for more than ten seed-stage startups and helped them build their first versions of their products.",
        "Directed a company spinoff, Prismetic Analytics, which provided information about visitors in brick-and-mortar stores using infrared sensors and a cloud-based client.",
      ],
    },
    {
      title: "Co-Founder",
      company: "WoodpeckeR",
      location: "Buenos Aires, Argentina",
      startDate: "Nov 2012",
      endDate: "Nov 2014",
      bullets: [
        "Created and designed wooden wireless speakers and cases for smartphones",
        "Awarded the 'Innovative Design' Prize in the 'International Design Fair 2013' in Metropolitan Design Center of Buenos Aires (CMD).",
        "Permanent stock in Museum of Latin American Modern Art (MALBA) official store (2013)",
      ],
    },
    {
      title: "Co-founder • CEO",
      company: "ComeCasero • 500 Startups Latin America",
      location: "Mexico City Area, Mexico",
      startDate: "Oct 2013",
      endDate: "Oct 2014",
      description:
        "ComeCasero was an online marketplace for homemade food to discover and order the best meals from neighboring cooks.",
      bullets: [
        "Led the food marketplace operations and products in Buenos Aires and Mexico City.",
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
    },
    {
      degree: "High School",
      school: "Colegio Nacional de Buenos Aires",
      startYear: "2002",
      endYear: "2006",
    },
    {
      degree: "Lean UI/UX",
      school: "Universidad de Palermo",
      startYear: "2015",
    },
  ],
  skills: [
    {
      title: "Design Tools",
      skills: ["Figma", "Sketch", "AI Generative Design"],
    },
    {
      title: "Development",
      skills: ["React", "NextJS", "Tailwind CSS"],
    },
  ],
  lastUpdated: "January 2024",
};
