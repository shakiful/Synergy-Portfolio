"use client";

import { useState } from "react";
import { useForm }  from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { projectRecommendation } from "@/ai/flows/project-recommendation";
import type { ProjectRecommendationInput, ProjectRecommendationOutput } from "@/ai/flows/project-recommendation";

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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  careerGoals: z.string().min(50, "Please describe your career goals in at least 50 characters."),
  webDevelopmentSkills: z.string().min(30, "Please list your web development skills (at least 30 characters)."),
  aiSkills: z.string().min(30, "Please list your AI/ML skills (at least 30 characters)."),
});

export function ProjectRecommendationForm() {
  const [recommendation, setRecommendation] = useState<ProjectRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      careerGoals: "",
      webDevelopmentSkills: "",
      aiSkills: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await projectRecommendation(values as ProjectRecommendationInput);
      setRecommendation(result);
      toast({
        title: "Recommendation Generated!",
        description: "Your personalized project idea is ready.",
      });
    } catch (error) {
      console.error("Error fetching project recommendation:", error);
      toast({
        title: "Error",
        description: "Failed to generate project recommendation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 border rounded-lg shadow-sm bg-card">
          <FormField
            control={form.control}
            name="careerGoals"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Career Goals</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., To become a Senior AI Engineer specializing in NLP, or to build innovative web applications that leverage machine learning for social good..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe your aspirations, preferred industries, and the type of impact you want to make.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="webDevelopmentSkills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Web Development Skills</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., JavaScript, React, Next.js, Node.js, Python, Django, Ruby on Rails, SQL, NoSQL, AWS, Docker..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  List your proficiency in programming languages, frameworks, databases, and tools.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="aiSkills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">AI/ML Skills</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Python, TensorFlow, PyTorch, Scikit-learn, NLP, Computer Vision, Reinforcement Learning, Data Analysis..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Detail your experience with AI/ML concepts, libraries, and application areas.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} size="lg" className="w-full sm:w-auto">
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-5 w-5" />
            )}
            Generate Project Idea
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="text-center py-10">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg text-muted-foreground">Generating your personalized project... this may take a moment.</p>
        </div>
      )}

      {recommendation && !isLoading && (
        <Card className="shadow-xl border-primary/50">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center">
              <Wand2 className="mr-3 h-7 w-7" /> Your AI-Powered Project Recommendation
            </CardTitle>
            <CardDescription>
              Here&apos;s a project idea tailored to your skills and career goals:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-1">{recommendation.projectName}</h3>
              <p className="text-muted-foreground">{recommendation.projectDescription}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground/80">Suggested Technologies:</h4>
              <p className="text-muted-foreground">{recommendation.technologiesUsed}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground/80">Integration Details:</h4>
              <p className="text-muted-foreground">{recommendation.integrationDetails}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground/80">Alignment with Career Goals:</h4>
              <p className="text-muted-foreground">{recommendation.alignmentExplanation}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
