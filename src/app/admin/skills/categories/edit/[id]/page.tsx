
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { SkillCategoryForm } from "@/components/admin/forms/SkillCategoryForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSkillCategory } from "@/lib/firebase/services/skills";
import { notFound } from "next/navigation";

export default async function EditSkillCategoryPage({ params }: { params: { id: string } }) {
  const category = await getSkillCategory(params.id);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Edit Skill Category"
        description={`Editing category: ${category.title}`}
      />
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
        </CardHeader>
        <CardContent>
          <SkillCategoryForm category={category} />
        </CardContent>
      </Card>
    </div>
  );
}
