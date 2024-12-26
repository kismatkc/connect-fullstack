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
  const dialogRef = useRef<HTMLDivElement>(null);
  const [promiseResolver, setPromiseResolver] = useState<
    null | ((value: boolean) => void)
  >(null);

  const [open, setOpen] = useState<boolean>(false);
  const decision = async () => {
    setOpen(true);
    return new Promise((resolve) => {
      setPromiseResolver(() => resolve); // Save the resolver in state
    });
  };

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
  }: {
    title: string;
    description: string;
  }) => {
    return (
      <AlertDialog open={open} onOpenChange={(change) => setOpen(change)}>
        <AlertDialogContent ref={dialogRef}>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                promiseResolver?.(false);
                setOpen(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                promiseResolver?.(true);
                setOpen(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return { ConfirmationModel, setOpen, decision };
}
