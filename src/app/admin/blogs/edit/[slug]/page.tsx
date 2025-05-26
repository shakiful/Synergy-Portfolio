
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { BlogForm } from "@/components/admin/forms/BlogForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBlogPost } from "@/lib/firebase/services/blog";
import { notFound } from "next/navigation";

export default async function EditBlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Edit Blog Post"
        description={`Editing: ${post.title}`}
      />
      <Card>
        <CardHeader>
          <CardTitle>Blog Post Details</CardTitle>
          <CardDescription>Update the content of your blog post.</CardDescription>
        </CardHeader>
        <CardContent>
          <BlogForm post={post} />
        </CardContent>
      </Card>
    </div>
  );
}

