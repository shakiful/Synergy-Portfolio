
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Skill } from "@/lib/placeholder-data";
import { getIcon } from "@/lib/icon-map"; // Import the getIcon utility
import { Zap } from "lucide-react"; // Default icon

interface SkillCardProps {
  skill: Skill;
  className?: string;
}

export function SkillCard({ skill, className }: SkillCardProps) {
  const IconComponent = getIcon(skill.iconName) || Zap; // Use Zap as a fallback

  return (
    <Card className={cn("shadow-sm hover:shadow-md transition-shadow duration-200", className)}>
      <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
        <IconComponent className="h-8 w-8 mb-2 text-primary" />
        <p className="text-sm font-medium text-foreground">{skill.name}</p>
      </CardContent>
    </Card>
  );
}
