
import type { LucideIcon } from 'lucide-react';
import { Code, Brain, Database, Cloud, Palette, Smartphone, Briefcase, Rocket, TrendingUp, MessageSquare, Zap, UserCircle, ShieldCheck, Server, GanttChartSquare, Settings, Construction, Package, PenTool, LayoutGrid, Share2, BarChartBig, Bot } from 'lucide-react';

export const iconMap: { [key: string]: LucideIcon } = {
  Code,
  Brain,
  Database,
  Cloud,
  Palette,
  Smartphone,
  Briefcase,
  Rocket,
  TrendingUp,
  MessageSquare,
  Zap,
  UserCircle,
  ShieldCheck,
  Server,
  GanttChartSquare,
  Settings,
  Construction,
  Package,
  PenTool,
  LayoutGrid,
  Share2,
  BarChartBig,
  Bot,
  // Add more icons here as needed
  // Make sure the string key matches what you'll store in Firestore
  'html5': Code,
  'css3-scss': Palette,
  'javascript': Zap,
  'typescript': Code,
  'react-nextjs': Smartphone,
  'nodejs-express': Briefcase,
  'rest-graphql': Code,
  'sql': Database,
  'nosql': Database,
  'git-github': Code,
  'responsive-design': Smartphone,
  'performance-optimization': TrendingUp,
  'python': Code,
  'tensorflow-keras': Brain,
  'pytorch': Brain,
  'scikit-learn': Brain,
  'nlp': MessageSquare,
  'computer-vision': UserCircle,
  'data-analysis': Database,
  'cloud-ai': Cloud,
  'mlops': Rocket,
  'genkit': Bot, // Assuming Bot icon for Genkit
};

export const getIcon = (iconName?: string): LucideIcon | undefined => {
  if (!iconName) return undefined;
  return iconMap[iconName.toLowerCase()] || undefined; // Return undefined if not found to handle gracefully
};

export const availableIcons = Object.keys(iconMap);
