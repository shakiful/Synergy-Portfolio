
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AdminPageHeader } from "@/components/admin/shared/AdminPageHeader";
import { PlusCircle, Edit, Trash2, List } from "lucide-react";
import { getSkillCategories, deleteSkillCategory, deleteSkillFromCategory } from "@/lib/firebase/services/skills";
import type { SkillCategory, Skill } from "@/lib/placeholder-data";
import { DeleteItemButton } from "@/components/admin/shared/DeleteItemButton";
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
                // const Icon = category.title ? getIcon(category.title.toLowerCase().replace(/\s+/g, '-')) : Zap; // Icon for category title - not used in current layout
                return (
                <AccordionItem value={category.id!} key={category.id!}>
                  <div className="flex items-center justify-between w-full px-4 border-b group"> {/* Overall header row, border-b if AccordionItem doesn't handle it well for all children*/}
                    <AccordionTrigger className="flex-grow text-left p-0 hover:no-underline focus-visible:ring-inset focus-visible:ring-ring [&>svg]:transition-transform [&>svg]:duration-200 group-data-[state=open]:[&>svg]:rotate-180">
                      {/* py-4 is on the span to control height, matching original trigger */}
                      <span className="font-semibold text-lg py-4">{category.title}</span>
                      {/* ChevronDown is automatically added by AccordionTrigger from ui/accordion */}
                    </AccordionTrigger>

                    {/* Action buttons are siblings to AccordionTrigger's clickable area */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit Category" asChild>
                        <Link href={`/admin/skills/categories/edit/${category.id}`} onClick={(e) => e.stopPropagation()}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <div onClick={(e) => e.stopPropagation()}> {/* Wrapper to stop propagation for DeleteItemButton */}
                         <DeleteItemButton
                            itemId={category.id!}
                            deleteAction={deleteSkillCategory}
                            itemType="skill category"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                         />
                      </div>
                    </div>
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
                                 {/* Edit skill button can be a future enhancement linking to a dedicated edit skill page */}
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

