import type { LucideIcon } from 'lucide-react';
import { Code, Brain, Database, Cloud, Palette, Smartphone, Briefcase, Rocket, TrendingUp, MessageSquare, Zap, UserCircle } from 'lucide-react';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  dataAiHint?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface Skill {
  name: string;
  icon?: LucideIcon;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered E-commerce Platform',
    description: 'A full-stack e-commerce website with personalized product recommendations using collaborative filtering and NLP for reviews. Highlighting key contributions in backend AI model integration and frontend UI for recommendations.',
    technologies: ['Next.js', 'TypeScript', 'Python', 'Flask', 'PostgreSQL', 'Docker', 'Stripe API', 'Tailwind CSS'],
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'ecommerce shopping',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: '2',
    title: 'Real-time Data Visualization Dashboard',
    description: 'A dashboard application that visualizes real-time streaming data using WebSockets and Recharts, with anomaly detection features. Focused on performant data handling and intuitive UI/UX design.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'WebSocket', 'Recharts', 'Kafka', 'Shadcn UI'],
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'dashboard charts',
    liveUrl: '#',
  },
  {
    id: '3',
    title: 'Synergy Portfolio (This Site)',
    description: 'My personal portfolio built with Next.js, showcasing my projects, skills, and an AI-powered project recommendation tool. Demonstrates proficiency in modern web technologies and AI integration.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'Genkit'],
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'portfolio abstract',
  },
];

export const mockSkills: SkillCategory[] = [
  {
    title: 'Web Development',
    skills: [
      { name: 'HTML5', icon: Code },
      { name: 'CSS3 & SCSS', icon: Palette },
      { name: 'JavaScript (ES6+)', icon: Zap },
      { name: 'TypeScript', icon: Code },
      { name: 'React & Next.js', icon: Smartphone },
      { name: 'Node.js & Express', icon: Briefcase },
      { name: 'REST APIs & GraphQL', icon: Code },
      { name: 'SQL (PostgreSQL, MySQL)', icon: Database },
      { name: 'NoSQL (MongoDB, Firebase)', icon: Database },
      { name: 'Git & GitHub', icon: Code },
      { name: 'Responsive Design', icon: Smartphone },
      { name: 'Performance Optimization', icon: TrendingUp },
    ],
  },
  {
    title: 'AI & Machine Learning',
    skills: [
      { name: 'Python', icon: Code },
      { name: 'TensorFlow & Keras', icon: Brain },
      { name: 'PyTorch', icon: Brain },
      { name: 'Scikit-learn', icon: Brain },
      { name: 'Natural Language Processing (NLP)', icon: MessageSquare },
      { name: 'Computer Vision (OpenCV)', icon: UserCircle }, // using UserCircle as a generic CV icon
      { name: 'Data Analysis (Pandas, NumPy)', icon: Database },
      { name: 'Cloud AI (Google AI, AWS SageMaker)', icon: Cloud },
      { name: 'Model Deployment & MLOps', icon: Rocket },
      { name: 'Genkit & Firebase Genkit', icon: Zap},
    ],
  },
];

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  dataAiHint?: string;
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'getting-started-with-ai-in-web-dev',
    title: 'Integrating AI into Modern Web Development',
    date: '2024-07-15',
    excerpt: 'Discover how AI is transforming web development and how you can start leveraging its power in your projects. This post covers key concepts and practical examples.',
    content: '<p>Artificial Intelligence (AI) is no longer a futuristic concept but a present-day reality transforming various industries, and web development is no exception. Integrating AI into web applications can lead to more personalized user experiences, smarter functionalities, and automated processes.</p><h3>Key Areas of AI in Web Development:</h3><ul><li><strong>Personalization:</strong> AI algorithms can analyze user behavior to provide tailored content, product recommendations, and UI adjustments.</li><li><strong>Chatbots and Virtual Assistants:</strong> NLP-powered chatbots enhance customer support and user engagement.</li><li><strong>Data Analysis and Insights:</strong> AI can process vast amounts of data to provide actionable insights for businesses.</li><li><strong>Accessibility:</strong> AI tools can help in creating more accessible websites, for instance, by auto-generating alt text for images.</li></ul><p>Getting started involves understanding basic machine learning concepts, choosing the right tools and frameworks (like TensorFlow.js for client-side AI or Python libraries for backend processing), and identifying specific use cases where AI can add significant value to your web application.</p>',
    imageUrl: 'https://placehold.co/800x450.png',
    dataAiHint: 'ai web development'
  },
  {
    id: '2',
    slug: 'mastering-nextjs-server-components',
    title: 'A Deep Dive into Next.js Server Components',
    date: '2024-06-28',
    excerpt: 'Explore the benefits and implementation details of Next.js Server Components for building performant React applications. Learn how they reduce client-side JavaScript and improve initial load times.',
    content: '<p>Next.js Server Components represent a paradigm shift in how we build React applications, allowing developers to write UI components that run on the server. This significantly reduces the amount of JavaScript sent to the client, leading to faster load times and improved performance.</p><h3>Benefits of Server Components:</h3><ul><li><strong>Zero Client-Side JavaScript:</strong> For components that are purely presentational or fetch data on the server, no JS needs to be shipped to the browser.</li><li><strong>Direct Backend Access:</strong> Server Components can directly access server-side resources like databases or file systems without needing to create API endpoints.</li><li><strong>Improved Performance:</strong> Reduced bundle sizes and less client-side rendering work lead to faster perceived performance.</li></ul><p>Understanding when to use Server Components versus Client Components is key. Interactive UI elements still require Client Components, but much of the page can often be rendered on the server.</p>',
    imageUrl: 'https://placehold.co/800x450.png',
    dataAiHint: 'nextjs code'
  },
];
