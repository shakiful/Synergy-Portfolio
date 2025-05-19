
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { ArrowRight, Download } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <SectionWrapper className="bg-gradient-to-b from-background to-secondary/30" id="hero">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pl-6 sm:pl-8 lg:pl-10">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">
              John Doe
            </h1>
            <p className="mt-3 text-xl font-medium text-foreground sm:text-2xl">
              Full-Stack Developer | AI Enthusiast
            </p>
            <p className="mt-6 text-lg text-muted-foreground">
              Passionate about crafting innovative web solutions and exploring the intersection of AI and software engineering. Turning complex problems into elegant, user-centric applications.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="shadow-lg hover:shadow-primary/50 transition-shadow">
                <Link href="/projects">
                  View My Work <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="shadow-sm hover:shadow-md transition-shadow">
                <Link href="/resume.pdf" target="_blank"> {/* Replace with actual resume link */}
                  Download Resume <Download className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://placehold.co/400x400.png"
              alt="John Doe - Profile Picture"
              width={400}
              height={400}
              className="rounded-full shadow-2xl border-4 border-primary/20 object-cover"
              priority
              data-ai-hint="professional portrait"
            />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="about-me" title="About Me">
        <div className="max-w-3xl mx-auto text-lg text-foreground/80 space-y-6">
          <p>
            Hello! I&apos;m John Doe, a dedicated software developer with a strong background in building robust and scalable web applications. My journey into technology began with a fascination for how software can solve real-world problems, which led me to specialize in full-stack development.
          </p>
          <p>
            I thrive on learning new technologies and continuously seek to expand my skillset. Recently, I&apos;ve been diving deep into the world of Artificial Intelligence and Machine Learning, exploring how these cutting-edge fields can be integrated with web technologies to create smarter, more intuitive user experiences.
          </p>
          <p>
            My expertise spans across the MERN stack, Next.js, Python, and various cloud platforms. I am particularly interested in developing AI-driven applications, from natural language processing tools to predictive analytics dashboards. I believe in writing clean, maintainable code and following best practices to deliver high-quality software.
          </p>
          <p>
            When I&apos;m not coding, you can find me contributing to open-source projects, reading tech blogs, or exploring the great outdoors. I&apos;m always open to new challenges and collaborations, so feel free to reach out!
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
