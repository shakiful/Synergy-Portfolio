import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-8">
      <div className="mx-auto max-w-screen-xl flex flex-col items-center justify-between gap-4 md:flex-row pl-6 pr-4 sm:pl-8 sm:pr-6 lg:pl-10 lg:pr-8">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Github className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
            <Linkedin className="h-6 w-6 text-muted-foreground hover:text-foreground transition-colors" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
