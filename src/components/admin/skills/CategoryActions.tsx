
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { DeleteItemButton } from "@/components/admin/shared/DeleteItemButton";
import type { deleteSkillCategory as DeleteSkillCategoryType } from "@/lib/firebase/services/skills";

interface CategoryActionsProps {
  categoryId: string;
  categoryTitle: string;
  deleteAction: DeleteSkillCategoryType;
}

export function CategoryActions({ categoryId, categoryTitle, deleteAction }: CategoryActionsProps) {
  // This click handler on the div ensures that if a user clicks in the small gap
  // between the buttons within this action group, it doesn't propagate to
  // the accordion trigger and toggle its state.
  const handleActionGroupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex items-center gap-2 shrink-0" onClick={handleActionGroupClick}>
      <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit Category" asChild>
        {/* Individual stopPropagation on Link/Button is not strictly needed if parent div handles it,
            but doesn't hurt for explicitness if Link itself might bubble.
            However, if the parent div has stopPropagation, direct children usually don't need it
            unless they are portals or have unusual event handling.
            For simplicity, relying on the parent div's onClick. */}
        <Link href={`/admin/skills/categories/edit/${categoryId}`}>
          <Edit className="h-4 w-4" />
        </Link>
      </Button>
      <DeleteItemButton
        itemId={categoryId}
        deleteAction={deleteAction}
        itemType={`skill category "${categoryTitle}"`}
        variant="ghost"
        size="icon"
        className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
        // DeleteItemButton is a client component and handles its own interactions (like opening a dialog).
        // The click to trigger the dialog is on its internal button.
      />
    </div>
  );
}
