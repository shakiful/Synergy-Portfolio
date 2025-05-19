import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SkillCard } from "@/components/shared/SkillCard";
import { mockSkills } from "@/lib/placeholder-data";
import type { SkillCategory } from "@/lib/placeholder-data";

export default function SkillsPage() {
  return (
    <SectionWrapper 
      title="My Expertise"
      subtitle="A comprehensive overview of my technical skills in web development and AI/ML."
    >
      <div className="space-y-12">
        {mockSkills.map((category: SkillCategory) => (
          <div key={category.title}>
            <h3 className="text-2xl font-semibold mb-6 text-center md:text-left text-primary/90">{category.title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {category.skills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
