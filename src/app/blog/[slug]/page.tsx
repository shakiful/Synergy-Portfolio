import Image from "next/image";
import { notFound } from "next/navigation";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { mockBlogPosts } from "@/lib/placeholder-data";
import { CalendarDays, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// This function would typically fetch data from a CMS or database
async function getPostBySlug(slug: string) {
  return mockBlogPosts.find((post) => post.slug === slug);
}

export async function generateStaticParams() {
  return mockBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

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
          Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>

        {post.imageUrl && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-8 shadow-lg">
            <Image
              src={post.imageUrl}
              alt={post.title}
              layout="fill"
              objectFit="cover"
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

// Basic styling for prose content if Tailwind typography plugin isn't fully configured
// This is often handled by @tailwindcss/typography
// Add to globals.css if needed or rely on plugin.
// For now, basic prose classes are added.
