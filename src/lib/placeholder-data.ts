
// Data types are now primarily for Firestore and will be fetched from there.
// Mock data arrays are removed.

export interface Project {
  id?: string; // Firestore document ID, optional for new projects
  title: string;
  description: string;
  technologies: string[]; // Array of technology names
  imageUrl: string;
  dataAiHint?: string;
  liveUrl?: string;
  repoUrl?: string;
  createdAt?: any; // Firestore Timestamp
}

export interface Skill {
  id?: string; // Can be a unique ID generated for the skill
  name: string;
  iconName?: string; // Store the string name of the Lucide icon
}

export interface SkillCategory {
  id?: string; // Firestore document ID
  title: string;
  skills: Skill[]; // Array of Skill objects
  createdAt?: any; // Firestore Timestamp
}

export interface BlogPost {
  id?: string; // Firestore document ID (will be the slug)
  slug: string;
  title: string;
  date: string; // Store as ISO string or Firestore Timestamp
  excerpt: string;
  content: string; // HTML content
  imageUrl?: string;
  dataAiHint?: string;
  createdAt?: any; // Firestore Timestamp
  // Add any other fields like author, tags, etc.
}

// Mock data arrays (mockProjects, mockSkills, mockBlogPosts) are removed
// as data will now come from Firebase.
