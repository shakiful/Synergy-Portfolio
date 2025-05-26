
import Link from "next/link";
import Image from "next/image";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays } from "lucide-react";
import { getBlogPosts } from "@/lib/firebase/services/blog";
import type { BlogPost } from "@/lib/placeholder-data";
import { format } from 'date-fns';

function BlogPostCard({ post }: { post: BlogPost }) {
  const displayDate = post.date ? format(new Date(post.date), 'MMMM d, yyyy') : 'Date not set';
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
      {post.imageUrl && (
        <CardHeader className="p-0">
          <Link href={`/blog/${post.slug}`} className="block aspect-video relative group">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill // Use fill for next/image v13+
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes, adjust as needed
              style={{ objectFit: "cover" }} // Use style for objectFit with fill
              className="transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={post.dataAiHint || "article illustration"}
            />
          </Link>
        </CardHeader>
      )}
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>
        <div className="flex items-center text-xs text-muted-foreground mb-3">
          <CalendarDays className="h-4 w-4 mr-1.5" />
          {displayDate}
        </div>
        <CardDescription className="text-sm text-muted-foreground mb-4 overflow-hidden line-clamp-3">
          {post.excerpt}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-6 bg-muted/30">
        <Button variant="link" asChild className="p-0 h-auto text-primary hover:underline">
          <Link href={`/blog/${post.slug}`}>
            Read More <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <SectionWrapper 
      title="My Blog"
      subtitle="Insights, tutorials, and reflections on web development, AI, and the tech world."
    >
      {blogPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg">No blog posts yet. Check back soon or add some in the admin panel!</p>
      )}
    </SectionWrapper>
  );
}
