import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
