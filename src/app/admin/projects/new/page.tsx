
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { ProjectForm } from "@/components/admin/forms/ProjectForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Add New Project"
        description="Fill in the details for your new project."
      />
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Provide information about the project you want to showcase.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}
