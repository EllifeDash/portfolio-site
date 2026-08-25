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
  title: "IT Operations & Full-Stack Web Developer",
  tagline:
    "Full-stack developer building fast, offline-first web applications with React & Node",
  location: "Nankana Sahib, Punjab, Pakistan",
  timezone: "PKT (UTC+5)",
  summary:
    "IT operations professional with 5+ years in government infrastructure at Punjab Police, complemented by 2+ years of full-stack web development. I build practical, offline-first software for local needs — from clinic management systems to citizen-facing healthcare tools — and I write about the craft along the way.",
  contact: {
    email: "aeikay99@gmail.com",
    phone: ["+92 324 0096098", "+92 343 8587209"],
    whatsapp: true,
  } as ContactInfo,
  links: {
    linkedin: "https://www.linkedin.com/in/abdullah-tayyab-professional/",
    github: "https://github.com/EllifeDash",
    behance: "https://www.behance.net/abdullahtayyab1",
    facebook: "https://www.facebook.com/profile.php?id=61575288033668",
    instagram: "https://instagram.com/ellife_dash",
    website: "https://abdullahtayyab.dev",
    email: "aeikay99@gmail.com",
  },
  experience: [
    {
      role: "Front Desk Officer / IT Operations",
      organization: "Punjab Police",
      location: "Nankana Sahib, Pakistan",
      period: "Apr 2021 - Present",
      startDate: "2021-04-07",
      highlights: [
        "Operate a wide range of internal government systems — CMS (Complaints), FIR, PKM (Citizen Facilitation), Hotel Eye, TRS (Tenant Registration), AVLS (Vehicle Tracking), eFOAS (e-Filing), and more",
        "Manage front desk operations, public inquiries, data entry, document verification, and record management",
        "Certified CC-III recognition 10 times for performance excellence",
      ],
    },
    {
      role: "Computer Operator",
      organization: "Superior Group of Colleges",
      location: "Nankana Sahib, Pakistan",
      period: "May 2017 - May 2018",
      highlights: [
        "Data entry, document management, and system operations",
        "Technical assistance for computer-related tasks",
        "Recognized as Employee of the Month",
      ],
    },
  ] as ExperienceItem[],
  education: [
    {
      degree: "BSc (in progress)",
      field: "Computer Science (BSCS)",
      institution: "Virtual University of Pakistan",
      status: "in-progress",
      details: ["134 total credits, 122 earned (12 remaining)", "CGPA 2.43/4.0", "Expected graduation: 2026"],
    },
    {
      degree: "B.A.",
      field: "Computer Studies & English Literature",
      institution: "University of the Punjab",
      location: "Lahore, Pakistan",
      year: 2019,
      details: ["2017–2019", "Second Division"],
    },
    {
      degree: "Diploma",
      field: "Computer Operations",
      institution: "Innovative Institute",
      location: "Lahore, Pakistan",
      year: 2018,
      details: ["Office Management Suite (Word, Excel, PowerPoint)", "Graphic Design (Photoshop, Corel Draw)"],
    },
    {
      degree: "HSSC (FSc)",
      field: "General Science",
      institution: "Hira Public Higher Secondary School for Boys",
      location: "Nankana Sahib, Pakistan",
      board: "BISE Lahore",
      year: 2017,
      details: ["Marks: 635/1100"],
    },
    {
      degree: "SSC (Matric)",
      field: "Science (Computer Science)",
      institution: "Govt. M.C. Boys High School",
      location: "Nankana Sahib, Pakistan",
      board: "BISE Lahore",
      year: 2015,
      details: ["Marks: 794/1100", "Grade: A"],
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
    inProgress: [
      "CS50 — Harvard's Computer Science (edX)",
      "freeCodeCamp — Responsive Web Design",
      "freeCodeCamp — JavaScript Algorithms & Data Structures",
    ],
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
};
