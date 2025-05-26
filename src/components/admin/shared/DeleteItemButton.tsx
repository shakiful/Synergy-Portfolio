
"use client";

import React from 'react';
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

interface DeleteItemButtonProps extends ButtonProps {
  itemId: string;
  itemType: string; // e.g., "project", "blog post", "skill category", "skill"
  deleteAction: (id: string) => Promise<{ success: boolean; error?: string }>;
  onSuccess?: () => void; // Optional callback on successful deletion
}

export function DeleteItemButton({
  itemId,
  itemType,
  deleteAction,
  onSuccess,
  children,
  variant = "destructive", // Default variant for delete
  size = "icon",        // Default size
  title,
  className,
  ...props
}: DeleteItemButtonProps) {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteAction(itemId);
      if (result.success) {
        toast({
          title: `${itemType.charAt(0).toUpperCase() + itemType.slice(1)} Deleted`,
          description: `The ${itemType} has been successfully deleted.`,
        });
        if (onSuccess) {
          onSuccess();
        } else {
          router.refresh(); // Re-fetch data for server components
        }
        setIsAlertDialogOpen(false); // Close dialog on success
      } else {
        toast({
          title: "Deletion Error",
          description: result.error || `Failed to delete ${itemType}.`,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || `An unexpected error occurred while deleting the ${itemType}.`,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={variant} size={size} title={title || `Delete ${itemType}`} className={className} {...props} disabled={isDeleting}>
          {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : children || <Trash2 className="h-4 w-4" />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the {itemType}
            {itemId && ` "${itemId}"`}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className={buttonVariants({variant: "destructive"})}>
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// Helper for ShadCN buttonVariants if needed directly
const buttonVariants = ({variant}: {variant?: string | null | undefined}) => {
  if (variant === "destructive") return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
  return "";
};
