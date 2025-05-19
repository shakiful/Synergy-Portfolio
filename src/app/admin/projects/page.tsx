import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockProjects } from "@/lib/placeholder-data"; // Using mock data
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { PlusCircle, Edit, Trash2 } from "lucide-react";

export default function AdminProjectsPage() {
  // In a real app, fetch projects from Firebase/backend
  const projects = mockProjects;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Manage Projects"
        description="Add, edit, and organize your portfolio projects."
        actions={
          <Button asChild>
            <Link href="/admin/projects/new"> {/* Placeholder for new project form */}
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Project
            </Link>
          </Button>
        }
      />

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>
            A list of all projects in your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Technologies</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map(tech => (
                          <Badge key={tech} variant="outline">{tech}</Badge>
                        ))}
                        {project.technologies.length > 3 && <Badge variant="outline">...</Badge>}
                      </div>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                       <Button variant="outline" size="icon" asChild title="Edit">
                        <Link href={`/admin/projects/edit/${project.id}`}> {/* Placeholder */}
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="destructive" size="icon" title="Delete (placeholder)">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-8">No projects found. Start by adding a new one!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
