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
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { useState, useRef, useEffect } from "react";

// export default function useConfirmation() {
//   const dialogRef = useRef<HTMLDivElement>(null);
//   const [promiseResolver, setPromiseResolver] = useState<
//     null | ((value: boolean) => void)
//   >(null);

//   const [open, setOpen] = useState<boolean>(false);

//   // Simulates an external call to decision()
//   useEffect(() => {
//     (async function () {
//       console.log("Triggering decision...");
//       const userDecision = await decision(); // Await the result of decision()
//       console.log("User Decision:", userDecision); // Should log true or false
//     })();
//   }, []);

//   // Function to trigger the modal and return a decision
//   const decision = () => {
//     setOpen(true); // Open the modal
//     return new Promise<boolean>((resolve) => {
//       setPromiseResolver(() => resolve); // Save the resolver in state
//     });
//   };

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       const target = e.target;
//       if (!dialogRef.current?.contains(target as Node)) {
//         promiseResolver?.(false); // Resolve with false when clicked outside
//         setOpen(false); // Close the modal
//       }
//     };

//     if (open) {
//       document.addEventListener("click", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, [open, promiseResolver]);

//   const ConfirmationModel = ({
//     title,
//     description,
//   }: {
//     title: string;
//     description: string;
//   }) => {
//     return (
//       <AlertDialog open={open} onOpenChange={(change) => setOpen(change)}>
//         <AlertDialogContent ref={dialogRef}>
//           <AlertDialogHeader>
//             <AlertDialogTitle>{title}</AlertDialogTitle>
//             <AlertDialogDescription>{description}</AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel
//               onClick={() => {
//                 promiseResolver?.(false); // Resolve with false
//                 setOpen(false);
//               }}
//             >
//               Cancel
//             </AlertDialogCancel>
//             <AlertDialogAction
//               onClick={() => {
//                 promiseResolver?.(true); // Resolve with true
//                 setOpen(false);
//               }}
//             >
//               Continue
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     );
//   };

//   return { ConfirmationModel, setOpen };
// }
