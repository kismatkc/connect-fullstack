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
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

export default function useConfirmation() {
  const [decision,setDecision] = useState<boolean>(false);
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
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent ref={dialogRef}>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{options.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={()=> setDecision(true)}>{options.action}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return {ConfirmationModel,decision}
}

// export default function Confirmation({
//   title,
//   description,
//   options,
// }: {
//   title: string;
//   description: string;
//   options: { option1: string; option2: string };
// }) {
//   const dialogRef = useRef<HTMLDivElement>(null);

//   const [open, setOpen] = useState<boolean>(false);
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       const target = e.target;
//       if (!dialogRef.current?.contains(target as Node)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [open]);

//   return (
//     <AlertDialog open={open} onOpenChange={(change) => setOpen(change)}>
//       <AlertDialogTrigger asChild>
//         <Button variant="outline">Show Dialog</Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent ref={dialogRef}>
//         <AlertDialogHeader>
//           <AlertDialogTitle>{title}</AlertDialogTitle>
//           <AlertDialogDescription>{description}</AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>{options.option1}</AlertDialogCancel>
//           <AlertDialogAction>{options.option2}</AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
