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
import { useState, useRef, useEffect } from "react";

export default function useConfirmation() {
  const [decision, setDecision] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target;
      if (!dialogRef.current?.contains(target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);
  const ConfirmationModel = ({
    title,
    description,
    options,
  }: {
    title: string;
    description: string;
    options: { cancel: string; action: string };
  }) => {
    return (
      <AlertDialog open={open} onOpenChange={(change) => setOpen(change)}>
        <AlertDialogContent ref={dialogRef}>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setDecision(true)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return { ConfirmationModel, decision, setOpen ,setDecision};
}
