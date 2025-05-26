
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { getBlogPosts, deleteBlogPost } from "@/lib/firebase/services/blog";
import type { BlogPost } from "@/lib/placeholder-data";
import { DeleteItemButton } from "@/components/admin/shared/DeleteItemButton";
import { format } from 'date-fns';

export default async function AdminBlogsPage() {
  const posts: BlogPost[] = await getBlogPosts();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Manage Blog Posts"
        description="Create, edit, and delete your blog posts."
        actions={
          <Button asChild>
            <Link href="/admin/blogs/new">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Post
            </Link>
          </Button>
        }
      />

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>All Blog Posts</CardTitle>
          <CardDescription>
            A list of all blog posts in your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {posts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.date ? format(new Date(post.date), 'MM/dd/yyyy') : 'N/A'}</TableCell>
                      <TableCell><Badge variant="secondary">Published</Badge></TableCell> {/* Status can be dynamic later */}
                      <TableCell className="text-right space-x-2">
                        <Button variant="outline" size="icon" asChild title="Edit">
                          <Link href={`/admin/blogs/edit/${post.slug}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DeleteItemButton itemId={post.slug} deleteAction={deleteBlogPost} itemType="blog post" />
                      </TableCell>
                    </>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-8">No blog posts found. Start by adding a new one!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
