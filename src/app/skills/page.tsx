
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { SkillCard } from "@/components/shared/SkillCard";
import { getSkillCategories } from "@/lib/firebase/services/skills";
import type { SkillCategory } from "@/lib/placeholder-data";

export default async function SkillsPage() {
  const skillCategories: SkillCategory[] = await getSkillCategories();

  return (
    <SectionWrapper 
      title="My Expertise"
      subtitle="A comprehensive overview of my technical skills in web development and AI/ML."
    >
      {skillCategories.length > 0 ? (
        <div className="space-y-12">
          {skillCategories.map((category: SkillCategory) => (
            <div key={category.id}>
              <h3 className="text-2xl font-semibold mb-6 text-center md:text-left text-primary/90">{category.title}</h3>
              {category.skills && category.skills.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                  {category.skills.map((skill) => (
                    <SkillCard key={skill.id || skill.name} skill={skill} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No skills listed in this category yet.</p>
              )}
            </div>
          ))}
        </div>
      ) : (
         <p className="text-center text-muted-foreground text-lg">No skills categories found. Check back soon or add some in the admin panel!</p>
      )}
    </SectionWrapper>
  );
}
