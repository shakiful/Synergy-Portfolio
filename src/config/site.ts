export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Synergy Portfolio",
  description: "A personal portfolio showcasing web development and AI/ML skills.",
  navItems: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/skills" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  adminNavItems: [
    { label: "Dashboard", href: "/admin" },
    { label: "Manage Blogs", href: "/admin/blogs" },
    { label: "Manage Projects", href: "/admin/projects" },
    { label: "Manage Skills", href: "/admin/skills" },
  ],
  links: {
    github: "https://github.com/shakiful", // Replace with actual link
    linkedin: "https://www.linkedin.com/in/md-shakiful-islam-khan/", // Replace with actual link
  },
};
