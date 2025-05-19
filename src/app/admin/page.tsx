import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, Layers, Lightbulb, BarChart3 } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Admin Dashboard</h1>
        {/* Add any global admin actions here */}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-accent" />
              Site Overview
            </CardTitle>
            <CardDescription>Quick stats and summary.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Welcome to the admin panel. From here you can manage your portfolio content.
            </p>
            {/* Placeholder for stats */}
            <div className="mt-4 space-y-2">
              <p><strong>Total Projects:</strong> {3} (mock)</p>
              <p><strong>Total Blog Posts:</strong> {2} (mock)</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-6 w-6 text-accent" />
              Manage Projects
            </CardTitle>
            <CardDescription>Add, edit, or remove project showcases.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/projects">Go to Projects</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-accent" />
              Manage Blog Posts
            </CardTitle>
            <CardDescription>Create new blog posts or edit existing ones.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/blogs">Go to Blog Posts</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-accent" />
               Manage Skills
            </CardTitle>
            <CardDescription>Update your skills categories and items.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/skills">Go to Skills</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
