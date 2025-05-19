import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  titleClassName?: string;
  id?: string;
}

export function SectionWrapper({ id, title, subtitle, children, className, titleClassName }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-12 md:py-16 lg:py-20", className)}>
      <div className="mx-auto max-w-screen-xl pl-6 pr-4 sm:pl-8 sm:pr-6 lg:pl-10 lg:pr-8">
        {title && (
          <div className="mb-8 md:mb-12 text-center">
            <h2 className={cn("text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-primary", titleClassName)}>
              {title}
            </h2>
            {subtitle && (
              <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
