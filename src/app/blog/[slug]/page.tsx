
import Image from "next/image";
import { notFound } from "next/navigation";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { CalendarDays, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getBlogPost, getBlogPosts } from "@/lib/firebase/services/blog"; // Assuming getBlogPost fetches by slug
import type { BlogPost } from "@/lib/placeholder-data";
import { format } from 'date-fns';

// This function now fetches a single post by its slug (which is its ID in Firestore)
async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return getBlogPost(slug);
}

// generateStaticParams can fetch all slugs to pre-render pages at build time
export async function generateStaticParams() {
  const posts = await getBlogPosts(); // Fetch all posts to get their slugs
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }
  
  const displayDate = post.date ? format(new Date(post.date), 'MMMM d, yyyy') : 'Date not set';

  return (
    <SectionWrapper>
      <article className="max-w-3xl mx-auto">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/blog">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl mb-4">{post.title}</h1>
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <CalendarDays className="h-5 w-5 mr-2" />
          Published on {displayDate}
        </div>

        {post.imageUrl && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-8 shadow-lg">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              priority
              data-ai-hint={post.dataAiHint || "blog illustration"}
            />
          </div>
        )}
        
        <div 
          className="prose prose-lg dark:prose-invert max-w-none 
                     prose-headings:text-primary prose-a:text-accent hover:prose-a:text-accent/80
                     prose-strong:text-foreground/90"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    </SectionWrapper>
  );
}
