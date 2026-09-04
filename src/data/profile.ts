export interface ExperienceItem {
  role: string;
  organization: string;
  location: string;
  period: string;
  startDate: string;
  highlights: string[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location?: string;
  year?: number;
  status?: string;
  details: string[];
}

export interface ContactInfo {
  email: string;
  phone: string[];
  whatsapp: boolean;
}

export const profile = {
  name: "Abdullah Tayyab",
  alias: "Ellife Dash",
  title: "Full-Stack Developer specialized in MERN, Electron, and Offline-First PWAs",
  tagline:
    "Full-Stack Developer · Offline-First Web Apps & PWAs",
  location: "Nankana Sahib, Punjab, Pakistan",
  timezone: "PKT (UTC+5)",
  summary:
    "Full-stack developer specializing in offline-first web applications and progressive web apps (PWAs) — software that keeps running through dead zones, power cuts, and bad connections. Five-plus years operating mission-critical systems for a government department taught me what \"reliable\" actually costs. I build that discipline into every freelance project, from clinic software to browser extensions.",
  contact: {
    email: "aeikay99@gmail.com",
    phone: ["+92 324 0096098", "+92 343 8587209"],
    whatsapp: true,
  } as ContactInfo,
  links: {
    linkedin: "https://www.linkedin.com/in/abdullahtayyab-dev/",
    github: "https://github.com/EllifeDash",
    x: "https://x.com/_abdullahtayyab",
    aboutme: "https://about.me/abdullahtayyab",
    behance: "https://www.behance.net/abdullahtayyab1",
    facebook: "https://www.facebook.com/profile.php?id=61575288033668",
    instagram: "https://instagram.com/ellife_dash",
    website: "https://abdullahtayyab.dev",
    email: "contact@abdullahtayyab.dev",
    bebee: "https://beebee.com/bee/abdullahtayyab",
    apsense: "https://apsense.com/user/ellifedash",
    websiteLaunches: "https://websitelaunches.com/site/abdullahtayyab.dev",
    personalwebsites: "https://abdullah-tayyab.personalwebsites.org",
    now: "https://abdullahtayyab.dev/now",
    ideas: "https://abdullahtayyab.dev/ideas",
    friends: "https://abdullahtayyab.dev/friends",
  },
  experience: [
    {
      role: "Front Desk Officer / IT Operations",
      organization: "Punjab Police",
      location: "Nankana Sahib, Pakistan",
      period: "Apr 2021 - Present",
      startDate: "2021-04-07",
      highlights: [
        "Operate internal government systems — complaints (CMS), FIR, citizen facilitation (PKM), tenant registration (TRS), vehicle tracking (AVLS), e-filing (eFOAS), and more",
        "Handle front-desk operations, public inquiries, document verification, and records management",
        "Recognized with CC-III performance commendations 10 times",
      ],
    },
    {
      role: "Computer Operator",
      organization: "Superior Group of Colleges",
      location: "Nankana Sahib, Pakistan",
      period: "May 2017 - May 2018",
      highlights: [
        "Data entry, document management, and system operations",
        "Technical support for computer-related issues",
        "Named Employee of the Month",
      ],
    },
  ] as ExperienceItem[],
  education: [
    {
      degree: "BSc",
      field: "Computer Science (BSCS)",
      institution: "Virtual University of Pakistan",
      status: "completed",
      details: ["134 total credits earned", "CGPA 2.43/4.0", "Graduated: 2026"],
    },
    {
      degree: "B.A.",
      field: "Computer Studies & English Literature",
      institution: "University of the Punjab",
      location: "Lahore, Pakistan",
      year: 2019,
      details: ["2017–2019"],
    },
    {
      degree: "Diploma",
      field: "Computer Operations",
      institution: "Innovative Institute",
      location: "Lahore, Pakistan",
      year: 2018,
      details: ["Office suite (Word, Excel, PowerPoint)", "Graphic design (Photoshop, CorelDRAW)"],
    },
  ] as EducationItem[],
  techStack: {
    frontend: ["React", "HTML5", "CSS3", "Tailwind CSS", "JavaScript (ES6+)"],
    backend: ["Node.js", "Express.js"],
    database: ["MongoDB", "SQLite", "Postgres", "Supabase"],
    desktop: ["Electron"],
    browser: ["Chrome Extension (MV3)"],
    tools: ["Git", "VS Code", "Postman", "n8n", "GitHub Actions"],
    deployment: ["GitHub Pages"],
  },
  skills: {
    technical: [
      "Web Development (MERN Stack)",
      "Government IT Systems Operations",
      "Database Management (SQLite, Postgres, MongoDB)",
      "Chrome Extension Development",
      "Desktop App Development (Electron)",
      "PWA Architecture",
      "Automation & CI/CD (GitHub Actions)",
    ],
    soft: [
      "Public Dealing & Citizen Facilitation",
      "Complaint Resolution & Reporting",
      "Data Entry & Document Management",
      "Cross-functional Team Coordination",
    ],
  },
  certifications: {
    completed: [
      "CS50 — Harvard's Computer Science (edX)",
      "freeCodeCamp — Responsive Web Design",
      "freeCodeCamp — JavaScript Algorithms & Data Structures",
    ],
    inProgress: [],
  },
  languages: [
    { language: "Urdu", proficiency: "Native" },
    { language: "English", proficiency: "Professional" },
    { language: "Punjabi", proficiency: "Native" },
  ],
  interests: [
    "Web Development",
    "IT Operations",
    "Clinic Management Systems",
    "Automation",
    "Problem Solving",
    "Chess",
    "Gaming (PUBG Mobile)",
  ],
  now: {
    title: "Building reliable software",
    description:
      "Full-Stack Developer focused on reliability and mission-critical systems.",
    activities: [
      "Working on Aafiyat — offline-first patient management system for clinics",
      "Maintaining Nankana Home Care and CMS Extension",
      "Finishing BSc in Computer Science at Virtual University of Pakistan",
      "Continuing CS50 and freeCodeCamp certifications",
    ],
  },
};
