
"use client";

import React from "react"; // Added import
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
// No longer need full SkillCategory type here
import { addSkillCategory, updateSkillCategory } from "@/lib/firebase/services/skills";

const skillCategoryFormSchema = z.object({
  title: z.string().min(2, "Category title must be at least 2 characters.").max(50),
});

type SkillCategoryFormValues = z.infer<typeof skillCategoryFormSchema>;

interface SkillCategoryFormProps {
  category?: { id: string; title: string }; // Updated to expect only id and title
}

export function SkillCategoryForm({ category }: SkillCategoryFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<SkillCategoryFormValues>({
    resolver: zodResolver(skillCategoryFormSchema),
    defaultValues: {
      title: category?.title || "",
    },
  });

  async function onSubmit(values: SkillCategoryFormValues) {
    setIsSubmitting(true);
    try {
      let result;
      if (category?.id) {
        result = await updateSkillCategory(category.id, values);
      } else {
        result = await addSkillCategory(values);
      }

      if (result.success) {
        toast({
          title: category?.id ? "Category Updated!" : "Category Added!",
          description: category?.id ? "The skill category has been successfully updated." : "The new skill category has been successfully added.",
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Frontend Technologies" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {category?.id ? "Update Category" : "Add Category"}
        </Button>
      </form>
    </Form>
  );
}
