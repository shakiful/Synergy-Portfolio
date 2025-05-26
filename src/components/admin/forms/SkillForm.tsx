
"use client";

import React from "react"; // Added import
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Skill, SkillCategory } from "@/lib/placeholder-data";
import { addSkillToCategory } from "@/lib/firebase/services/skills";
import { availableIcons } from "@/lib/icon-map";


const skillFormSchema = z.object({
  name: z.string().min(1, "Skill name cannot be empty.").max(50),
  iconName: z.string().optional(),
  categoryId: z.string().min(1, "You must select a category."),
});

type SkillFormValues = z.infer<typeof skillFormSchema>;

interface SkillFormProps {
  // skill?: Skill; // For editing, not implemented in this pass
  categories: SkillCategory[];
}

export function SkillForm({ categories }: SkillFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<SkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: "",
      iconName: "",
      categoryId: "",
    },
  });

  async function onSubmit(values: SkillFormValues) {
    setIsSubmitting(true);
    try {
      const skillData: Omit<Skill, 'id'> = { name: values.name, iconName: values.iconName };
      const result = await addSkillToCategory(values.categoryId, skillData);

      if (result.success) {
        toast({
          title: "Skill Added!",
          description: "The new skill has been successfully added to the category.",
        });
        router.push("/admin/skills");
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result.error || "An unknown error occurred.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Submission Error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category for this skill" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id!}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., React" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="iconName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon Name (Optional)</FormLabel>
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon (e.g., Code, Brain)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">No Icon</SelectItem>
                  {availableIcons.sort().map(iconKey => (
                    <SelectItem key={iconKey} value={iconKey}>
                      {iconKey}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Enter the name of a Lucide icon (e.g., Code, Brain, Database). Refer to icon-map.ts or Lucide documentation.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Skill
        </Button>
      </form>
    </Form>
  );
}
