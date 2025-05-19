import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Skill } from "@/lib/placeholder-data";

interface SkillCardProps {
  skill: Skill;
  className?: string;
}

export function SkillCard({ skill, className }: SkillCardProps) {
  return (
    <Card className={cn("shadow-sm hover:shadow-md transition-shadow duration-200", className)}>
      <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
        {skill.icon && <skill.icon className="h-8 w-8 mb-2 text-primary" />}
        <p className="text-sm font-medium text-foreground">{skill.name}</p>
      </CardContent>
    </Card>
  );
}
