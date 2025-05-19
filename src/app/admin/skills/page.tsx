import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { mockSkills } from "@/lib/placeholder-data"; // Using mock data
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { PlusCircle, Edit, Trash2, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminSkillsPage() {
  // In a real app, fetch skills from Firebase/backend
  const skillCategories = mockSkills;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Manage Skills"
        description="Organize your skills by category and update them as needed."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/skills/categories/new"> {/* Placeholder */}
                <List className="mr-2 h-4 w-4" /> Add Category
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/skills/new"> {/* Placeholder */}
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Skill
              </Link>
            </Button>
          </div>
        }
      />

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Skill Categories</CardTitle>
          <CardDescription>
            Your skills, organized by category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {skillCategories.length > 0 ? (
            <Accordion type="multiple" className="w-full">
              {skillCategories.map((category, index) => (
                <AccordionItem value={`item-${index}`} key={category.title}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-semibold text-lg">{category.title}</span>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit Category (placeholder)" onClick={(e) => e.stopPropagation()}>
                          <Edit className="h-4 w-4" />
                        </Button>
                         <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive" title="Delete Category (placeholder)" onClick={(e) => e.stopPropagation()}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 pt-2 pl-4">
                      {category.skills.map((skill) => (
                        <li key={skill.name} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                          <div className="flex items-center">
                            {skill.icon && <skill.icon className="mr-2 h-5 w-5 text-primary" />}
                            <span>{skill.name}</span>
                          </div>
                          <div className="space-x-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7" title="Edit Skill (placeholder)">
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive" title="Delete Skill (placeholder)">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
             <p className="text-muted-foreground text-center py-8">No skills found. Start by adding categories and skills!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
