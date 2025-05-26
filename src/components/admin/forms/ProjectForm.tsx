
"use client";

import React from "react"; // Added import
import { useForm, useFieldArray } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/placeholder-data";
import { addProject, updateProject } from "@/lib/firebase/services/projects";

const projectFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(100),
  description: z.string().min(10, "Description must be at least 10 characters.").max(1000),
  imageUrl: z.string().url("Must be a valid URL for the image."),
  dataAiHint: z.string().optional().describe("Keywords for AI image search (max 2 words)."),
  liveUrl: z.string().url("Must be a valid URL.").optional().or(z.literal('')),
  repoUrl: z.string().url("Must be a valid URL.").optional().or(z.literal('')),
  technologies: z.array(z.string().min(1, "Technology name cannot be empty.")).min(1, "At least one technology is required."),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface ProjectFormProps {
  project?: Project; // Optional: for editing existing project
}

export function ProjectForm({ project }: ProjectFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const defaultValues: Partial<ProjectFormValues> = project 
    ? { ...project, technologies: project.technologies || [] } 
    : {
        title: "",
        description: "",
        imageUrl: "",
        dataAiHint: "",
        liveUrl: "",
        repoUrl: "",
        technologies: [""] 
      };

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "technologies",
  });

  async function onSubmit(values: ProjectFormValues) {
    setIsSubmitting(true);
    try {
      let result;
      if (project?.id) {
        result = await updateProject(project.id, values);
      } else {
        result = await addProject(values);
      }

      if (result.success) {
        toast({
          title: project?.id ? "Project Updated!" : "Project Added!",
          description: project?.id ? "The project has been successfully updated." : "The new project has been successfully added.",
        });
        router.push("/admin/projects");
        router.refresh(); // Important to re-fetch server components
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., My Awesome App" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your project..." className="min-h-[120px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://placehold.co/600x400.png" {...field} />
              </FormControl>
              <FormDescription>Use a service like Placehold.co for placeholders if needed.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dataAiHint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image AI Hint (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., technology abstract" {...field} />
              </FormControl>
              <FormDescription>Max two keywords for image search generation.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="liveUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live Demo URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/live-demo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repository URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/yourusername/project" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div>
          <FormLabel>Technologies Used</FormLabel>
          <FormDescription className="mb-2">List the key technologies for this project.</FormDescription>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`technologies.${index}`}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 mb-2">
                  <FormControl>
                    <Input placeholder="e.g., Next.js" {...field} />
                  </FormControl>
                  {fields.length > 1 && (
                     <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} title="Remove technology">
                        <Trash2 className="h-4 w-4 text-destructive" />
                     </Button>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append("")}
            className="mt-2"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Technology
          </Button>
           {form.formState.errors.technologies && !form.formState.errors.technologies.root && !form.formState.errors.technologies.message && (
            <p className="text-sm font-medium text-destructive mt-1">
              {form.formState.errors.technologies.map(err => err?.message).filter(Boolean).join(', ')}
            </p>
          )}
           {form.formState.errors.technologies?.root?.message && (
             <p className="text-sm font-medium text-destructive mt-1">{form.formState.errors.technologies.root.message}</p>
           )}

        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {project?.id ? "Update Project" : "Add Project"}
        </Button>
      </form>
    </Form>
  );
}
