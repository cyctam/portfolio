import type { Content } from "../types";

export const CONTENT: Content = {
  name: "Aditya Ilham Pratama",
  displayName: "Tama",

  github: "https://github.com/cyctam",
  linkedin: "https://www.linkedin.com/in/aditya-ilham-pratama-053761336",
  instagram: "https://www.instagram.com/tamthawng/",
  email: "adityailhampratama@gmail.com",

  location: "Jakarta, Indonesia",
  learning: "Vocational student currently diving into cloud infrastructure and IaC.",

  heroLabel: "Looking for a job",

  intro: "Cloud & DevOps enthusiast focused on building secure, automated infrastructure.",
  focus: ["Cloud Infrastructure", "DevOps & IaC", "Automation", "Backend Systems"],

  about: [
    "I'm Aditya Ilham Pratama a Cloud & DevOps enthusiast and a vocational student majoring in Computer & Network Engineering. I've been building web apps and cloud infrastructure through internships and personal projects, and I'm always down to learn from people who actually know their stuff.",
    "I'm big on clean, maintainable code and config, and I care about how systems actually work under the hood, not just getting them to work. I'm looking for a job or internship where I can contribute, keep learning, and grow alongside people who take the craft seriously.",
    "What drives me is building things that last, I love exploring where cloud, DevOps automation, and ML intersect, and turning that into modern, resilient systems. I'm also a cyber security enthusiast, always curious about how to make systems not just fast, but safe.",
  ],

  projects: [
    {
      name: "NEXA Cloud Data & Analytics Platform",
      category: "Cloud & DevOps",
      thumbnail: "projects/NEXA.png", 
      description:
        "An end-to-end cloud data and analytics platform for e-commerce intelligence on AWS, covering data ingestion, processing, storage, and infrastructure automation.",
      technologies: [
        "AWS",
        "Terraform",
        "Amazon S3",
        "Kinesis",
        "AWS Glue",
        "EMR / Spark",
        "Step Functions",
        "EventBridge",
        "Redshift",
        "DynamoDB",
        "AWS Amplify",
      ],
      repositoryUrl: "https://github.com/cyctam/nexa-cloud-analytics",
      liveDemoUrl: "https://nexa-cloud-analytics.vercel.app",
      note: "Cloud Data Engineering · Infrastructure as Code",
    },
    {
      name: "Stockly Enterprise",
      category: "Microservices & DevOps",
      thumbnail: "projects/stockly.png",
      description:
        "A B2B multi-tenant supply chain platform built with NestJS microservices, React, PostgreSQL, and Docker. Features event-driven architecture and enterprise dashboard design.",
      technologies: [
        "NestJS",
        "React",
        "PostgreSQL",
        "gRPC",
        "Docker",
        "Terraform",
        "GitHub Actions",
      ],
      repositoryUrl: "https://github.com/cyctam/stockly-enterprise-platform",
      liveDemoUrl: "https://stockly-enterprise-platform.vercel.app/dashboard",
      note: "Microservices Architecture · Cloud-Native Application",
    },
    {
      name: "AWS IoT Realtime Pipeline",
      category: "IoT & Serverless",
      thumbnail: "projects/mqtt.png",
      description:
        "A cloud-native, event-driven IoT data pipeline built with MQTT, AWS infrastructure, Terraform, and a real-time monitoring dashboard.",
      technologies: [
        "MQTT",
        "AWS IoT Core",
        "AWS Lambda",
        "Node.js",
        "TypeScript",
        "React",
        "Vite",
        "Terraform",
        "Docker",
      ],
      repositoryUrl: "https://github.com/cyctam/mqtt-iot-pipeline",
      liveDemoUrl: "https://https://mqtt-iot-pipeline.vercel.app/",
      note: "IoT Data Pipeline · AWS Serverless Architecture",
    },
  ],

  skills: {
    "Cloud & Infrastructure": ["AWS", "GCP", "Docker", "Kubernetes", "Terraform", "Linux"],
    "Programming Languages": ["Python", "Golang", "TypeScript", "JavaScript", "PHP"],
    Framework: ["React", "Next.js", "Laravel", "Node.js", "Tailwind CSS"],
    Databases: ["PostgreSQL", "MongoDB", "MySQL", "DynamoDB", "Amazon RDS"],
    "Tools & Workflow": ["Git", "GitHub", "Jenkins", "CI/CD", "Prometheus", "Grafana", "YAML", "JSON", "HTML/CSS"],
  },

  proficiency: [
    { label: "Cloud Platform", level: "comfortable" },
    { label: "DevOps & Infrastructure as Code", level: "familiar" },
    { label: "Programming & Backend", level: "comfortable" },
    { label: "Databases", level: "familiar" },
    { label: "Kubernetes", level: "familiar" },
  ],
};