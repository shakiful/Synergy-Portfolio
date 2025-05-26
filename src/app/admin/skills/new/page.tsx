
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { SkillForm } from "@/components/admin/forms/SkillForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSkillCategories } from "@/lib/firebase/services/skills";
import type { SkillCategory } from "@/lib/placeholder-data";

interface SimplifiedSkillCategory {
  id: string;
  title: string;
}

export default async function NewSkillPage() {
  const categories: SkillCategory[] = await getSkillCategories();

  if (!categories || categories.length === 0) {
    return (
         <div className="space-y-6">
            <AdminPageHeader
                title="Add New Skill"
                description="First, create a skill category to add skills."
            />
            <p className="text-muted-foreground">
                You need to have at least one skill category before adding a skill.
                Please <a href="/admin/skills/categories/new" className="text-primary hover:underline">add a skill category</a> first.
            </p>
        </div>
    )
  }

  const simplifiedCategories: SimplifiedSkillCategory[] = categories.map(category => ({
    id: category.id!,
    title: category.title,
  }));

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Add New Skill"
        description="Add a new skill to one of your categories."
      />
      <Card>
        <CardHeader>
          <CardTitle>Skill Details</CardTitle>
        </CardHeader>
        <CardContent>
          <SkillForm categories={simplifiedCategories} />
        </CardContent>
      </Card>
    </div>
  );
}
