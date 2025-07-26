// Mock data for Arya's Portfolio

export const portfolioData = {
  personal: {
    name: "Arya G Guddad",
    title: "AI & Quantum Technology Student",
    subtitle: "Defense Tech Enthusiast | Cybersecurity Researcher | Future Innovation Leader",
    phone: "+91 81380 24979",
    email: "aryagg4321@gmail.com",
    linkedin: "linkedin.com/in/arya-g-guddad-85892a36b",
    location: "Coimbatore, Tamil Nadu",
    resumeUrl: "/resume-arya-guddad.pdf" // This will be implemented in backend
  },

  summary: `First-year B.Tech student specializing in Artificial Intelligence and Quantum Technology at Amrita Vishwa Vidyapeetham. Passionate about applying AI in defense, cybersecurity, and autonomous systems. Strong foundation in programming and web development, with a keen analytical interest in geopolitical dynamics and intelligence strategy. A motivated team player, aspiring to contribute to national security through research and innovation in next-gen defense technology.`,

  skills: {
    programming: ["Java", "Python"],
    webDevelopment: ["HTML", "CSS", "JavaScript", "Git"],
    professional: ["Leadership", "Team Collaboration", "Public Speaking"],
    domainInterests: ["Geopolitics", "Cybersecurity", "Autonomous Defense Systems", "Intelligence Analysis"],
    tools: ["VS Code", "GitHub", "Scratch", "Blender", "Linux (basic)", "OpenCV (familiar)"]
  },

  education: {
    degree: "B.Tech in Artificial Intelligence & Quantum Technology",
    institution: "Amrita Vishwa Vidyapeetham, Coimbatore",
    expectedGraduation: "2029",
    coursework: [
      "Introduction to AI",
      "Data Structures", 
      "Linear Algebra",
      "Quantum Computing Basics"
    ]
  },

  projects: [
    {
      id: 1,
      title: "Interactive War Timeline Website",
      status: "In Progress",
      description: "Collaboratively developing a web platform that visualizes major wars in history through an interactive timeline. Responsible for UI design, data organization, and front-end implementation using modern web tools.",
      technologies: ["HTML", "CSS", "JavaScript", "UI/UX Design"],
      demoAvailable: false,
      demoUrl: null,
      githubUrl: null // Will be added later
    }
  ],

  certifications: [
    {
      title: "Creating 3D Environments in Blender",
      provider: "Udemy",
      status: "In Progress",
      completionDate: null
    },
    {
      title: "Web Stack Development",
      provider: "Udemy", 
      status: "In Progress",
      completionDate: null
    }
  ],

  achievements: [
    "First-year student in prestigious AI & Quantum Technology program",
    "Active contributor to collaborative web development projects",
    "Passionate researcher in defense technology applications",
    "Strong analytical skills in geopolitical intelligence"
  ]
};

export default portfolioData;