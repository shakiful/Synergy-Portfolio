
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { SkillForm } from "@/components/admin/forms/SkillForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSkillCategories } from "@/lib/firebase/services/skills";

export default async function NewSkillPage() {
  const categories = await getSkillCategories();
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
          <SkillForm categories={categories} />
        </CardContent>
      </Card>
    </div>
  );
}
