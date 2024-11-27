"use client";

import * as React from "react";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps } from "react-hook-form";

interface DatePickerProps {
  startYear?: number;
  endYear?: number;
  field: ControllerRenderProps<
    {
      firstName: string;
      lastName: string;
      email: string;
      college: string;
      city: string;
      password: string;
      birthday: Date;
      gender: "male" | "female" | "other";
      avatarUrl: File;
    },
    "birthday"
  >;
}

export default function DatePicker({
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
  field,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | null>(null);

  React.useEffect(() => {
    // setDate(new Date());
    setDate(null);
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i,
  );

  const handleMonthChange = (month: string) => {
    if (date) {
      const newDate = setMonth(date, months.indexOf(month));
      setDate(newDate);
    }
  };

  const handleYearChange = (year: string) => {
    if (date) {
      const newDate = setYear(date, parseInt(year));
      setDate(newDate);
    }
  };

  const handleSelect = (selectedData: Date | undefined) => {
    if (selectedData) {
      setDate(selectedData);
      field.onChange(selectedData);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="flex justify-between p-2">
          <Select
            onValueChange={handleMonthChange}
            value={date ? months[getMonth(date)] : ""}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange}
            value={date ? getYear(date).toString() : ""}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={handleSelect}
          initialFocus
          month={date || undefined}
          onMonthChange={setDate}
        />
      </PopoverContent>
    </Popover>
  );
}
