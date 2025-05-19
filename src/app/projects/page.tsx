import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { mockProjects } from "@/lib/placeholder-data";

export default function ProjectsPage() {
  return (
    <SectionWrapper 
      title="My Projects" 
      subtitle="A selection of projects I've worked on, showcasing my skills and passion for development."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionWrapper>
  );
}
