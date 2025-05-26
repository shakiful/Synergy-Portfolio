
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { BlogForm } from "@/components/admin/forms/BlogForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Create New Blog Post"
        description="Write and publish a new article."
      />
      <Card>
        <CardHeader>
          <CardTitle>Blog Post Details</CardTitle>
          <CardDescription>Fill in the content for your new blog post.</CardDescription>
        </CardHeader>
        <CardContent>
          <BlogForm />
        </CardContent>
      </Card>
    </div>
  );
}
