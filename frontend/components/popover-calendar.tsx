import { FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ControllerRenderProps } from "react-hook-form";
import { useEffect, useState } from "react";
const PopoverCalendar = ({
  field,
}: {
  field: ControllerRenderProps<
    {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      birthday: Date;
      gender: "Male" | "Female" | "Other" ;
    },
    "birthday"
  >;
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const hello = () => {
      

      setOpen(false);
    };
    // window.addEventListener("click", hello);
    // return () => window.removeEventListener("click", hello);
  }, [open]);

  return (
    <Popover open={open}>
      <PopoverTrigger
        asChild
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              " pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? (
              format(field.value, "PPP")
            ) : (
              <span>Date of birth</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <Calendar
          mode="single"
          selected={field.value}
          // onSelect={field.onChange}
          onSelect={(day) => {
            field.onChange(day);
            setOpen(false);
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default PopoverCalendar;
