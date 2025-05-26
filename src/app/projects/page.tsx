
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { getProjects } from "@/lib/firebase/services/projects";
import type { Project } from "@/lib/placeholder-data";

export default async function ProjectsPage() {
  const projects: Project[] = await getProjects();

  return (
    <SectionWrapper 
      title="My Projects" 
      subtitle="A selection of projects I've worked on, showcasing my skills and passion for development."
    >
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">No projects found. Check back soon or add some in the admin panel!</p>
      )}
    </SectionWrapper>
  );
}
