
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
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/placeholder-data";
import { addBlogPost, updateBlogPost } from "@/lib/firebase/services/blog";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";

const blogFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(150),
  slug: z.string().min(3, "Slug must be at least 3 characters.").max(150)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase, alphanumeric, with hyphens."),
  date: z.date({ required_error: "A date is required." }),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters.").max(300),
  content: z.string().min(50, "Content must be at least 50 characters."),
  imageUrl: z.string().url("Must be a valid URL for the image.").optional().or(z.literal('')),
  dataAiHint: z.string().optional().describe("Keywords for AI image search (max 2 words)."),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

interface BlogFormProps {
  post?: BlogPost; // Optional: for editing existing post
}

export function BlogForm({ post }: BlogFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const defaultValues: Partial<BlogFormValues> = post
    ? { 
        ...post, 
        date: post.date ? parseISO(post.date) : new Date(), // Parse string date from Firestore
      }
    : {
        title: "",
        slug: "",
        date: new Date(),
        excerpt: "",
        content: "",
        imageUrl: "",
        dataAiHint: "",
      };

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues,
  });

  async function onSubmit(values: BlogFormValues) {
    setIsSubmitting(true);
    try {
      const dataToSubmit = {
        ...values,
        date: values.date.toISOString(), // Convert date to ISO string for Firestore
      };

      let result;
      if (post?.id) { // post.id is the slug for blog posts
        // If slug is changed, it's technically a new post or requires complex handling.
        // For simplicity, we assume slug (ID) doesn't change on edit.
        // If you need to change slug, you might delete old and add new.
        if (values.slug !== post.slug) {
            toast({
                title: "Error",
                description: "Changing the slug of an existing post is not supported in this form. To change a slug, please delete the old post and create a new one.",
                variant: "destructive",
            });
            setIsSubmitting(false);
            return;
        }
        result = await updateBlogPost(post.id, dataToSubmit);
      } else {
        result = await addBlogPost(dataToSubmit);
      }

      if (result.success) {
        toast({
          title: post?.id ? "Blog Post Updated!" : "Blog Post Added!",
          description: post?.id ? "The post has been successfully updated." : "The new post has been successfully published.",
        });
        router.push("/admin/blogs");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., My Latest Thoughts on..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="e.g., my-latest-thoughts" {...field} disabled={!!post?.id} />
              </FormControl>
              <FormDescription>
                URL-friendly identifier (e.g., "my-awesome-post"). Cannot be changed after creation.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Publication Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea placeholder="A short summary of the post..." className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content (HTML)</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your blog post content here. You can use HTML tags." className="min-h-[250px]" {...field} />
              </FormControl>
              <FormDescription>Enter the full content of your blog post. HTML is allowed for formatting.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://placehold.co/800x450.png" {...field} />
              </FormControl>
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
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {post?.id ? "Update Post" : "Publish Post"}
        </Button>
      </form>
    </Form>
  );
}
