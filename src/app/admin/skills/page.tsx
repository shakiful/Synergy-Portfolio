
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { PlusCircle, Edit, List } from "lucide-react"; // Removed Trash2 as it's handled by DeleteItemButton
import { getSkillCategories, deleteSkillCategory, deleteSkillFromCategory } from "@/lib/firebase/services/skills";
import type { SkillCategory, Skill } from "@/lib/placeholder-data";
import { DeleteItemButton } from "@/components/admin/shared/DeleteItemButton";
import { CategoryActions } from "@/components/admin/skills/CategoryActions"; // New component
import { getIcon } from "@/lib/icon-map";
import { Zap } from "lucide-react"; // Default icon

async function handleDeleteSkill(categoryId: string, skillId: string) {
  "use server";
  if (!categoryId || !skillId) return { success: false, error: "Category ID and Skill ID are required." };
  return deleteSkillFromCategory(categoryId, skillId);
}

export default async function AdminSkillsPage() {
  const skillCategories: SkillCategory[] = await getSkillCategories();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Manage Skills"
        description="Organize your skills by category and update them as needed."
        actions={
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/skills/categories/new">
                <List className="mr-2 h-4 w-4" /> Add Category
              </Link>
            </Button>
            <Button asChild>
              <Link href="/admin/skills/new">
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
              {skillCategories.map((category) => {
                return (
                <AccordionItem value={category.id!} key={category.id!}>
                  <div className="flex items-center justify-between w-full px-4 border-b group">
                    <AccordionTrigger className="flex-grow text-left p-0 hover:no-underline focus-visible:ring-inset focus-visible:ring-ring [&>svg]:transition-transform [&>svg]:duration-200 group-data-[state=open]:[&>svg]:rotate-180">
                      <span className="font-semibold text-lg py-4">{category.title}</span>
                    </AccordionTrigger>
                    <CategoryActions
                        categoryId={category.id!}
                        categoryTitle={category.title}
                        deleteAction={deleteSkillCategory}
                    />
                  </div>
                  <AccordionContent>
                    {category.skills && category.skills.length > 0 ? (
                        <ul className="space-y-2 pt-2 pl-4">
                        {category.skills.map((skill) => {
                            const SkillIcon = getIcon(skill.iconName) || Zap;
                            return (
                            <li key={skill.id || skill.name} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50">
                                <div className="flex items-center">
                                <SkillIcon className="mr-2 h-5 w-5 text-primary" />
                                <span>{skill.name}</span>
                                </div>
                                <div className="space-x-1">
                                  <Button variant="ghost" size="icon" className="h-7 w-7" title="Edit Skill (placeholder)" disabled>
                                    <Edit className="h-3.5 w-3.5" />
                                  </Button>
                                  <DeleteItemButton
                                    itemId={skill.id!}
                                    deleteAction={(skillId) => handleDeleteSkill(category.id!, skillId)}
                                    itemType="skill"
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive"
                                  />
                                </div>
                            </li>
                            );
                        })}
                        </ul>
                    ) : (
                        <p className="text-muted-foreground text-sm pl-4 pt-2">No skills in this category yet. <Link href="/admin/skills/new" className="text-primary hover:underline">Add a skill</Link>.</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )})}
            </Accordion>
          ) : (
             <p className="text-muted-foreground text-center py-8">No skills found. Start by adding categories and skills!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
