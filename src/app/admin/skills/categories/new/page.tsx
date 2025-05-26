
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { SkillCategoryForm } from "@/components/admin/forms/SkillCategoryForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewSkillCategoryPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Add New Skill Category"
        description="Create a new category to group your skills."
      />
      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
        </CardHeader>
        <CardContent>
          <SkillCategoryForm />
        </CardContent>
      </Card>
    </div>
  );
}
