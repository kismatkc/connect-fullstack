"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import useCreateUser from "@/hooks/create-user";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import PopoverCalendar from "@/components/popover-calendar";
import { useEffect } from "react";
import ProfileUpload from "@/components/profile-upload";
import AutoCompleteCollege from "@/components/autocomplete-inputs";
import AutoCompleteCity from "@/components/autocomplete-inputs";

// Regular expression for validating email
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password validation criteria
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 characters, 1 letter, 1 number

const formSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required." })
    .max(30, { message: "First name must be at most 30 characters long." })
    .regex(/^[A-Za-z]+$/, { message: "First name must contain only letters." }),

  lastName: z
    .string()
    .min(1, { message: "Last name is required." })
    .max(30, { message: "Last name must be at most 30 characters long." })
    .regex(/^[A-Za-z]+$/, { message: "Last name must contain only letters." }),

  email: z
    .string()
    .min(12, { message: "Email must be at least 12 characters long." })
    .max(50, { message: "Email must be at most 50 characters long." })
    .regex(emailRegex, { message: "Invalid email format." }),

  college: z
    .string()
    .min(4, { message: "college must be at least 4 characters long." })
    .max(50, { message: "Email must be at most 50 characters long." }),
  city: z
    .string()
    .min(6, { message: "City must be at least 6 characters long." })
    .max(100, { message: "City must be at most 100 characters long." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(passwordRegex, {
      message: "Password must contain at least one letter and one number.",
    }),

  birthday: z.date({ message: "Invalid date. Please enter a valid birthday." }),

  gender: z.enum(["male", "female", "other"], {
    message: "Gender must be either 'male', 'female', or 'other'.",
  }),
  avatarUrl: z.instanceof(File),
});

const SignUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: createUser, error } = useCreateUser();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const formValuesAltered = {
      ...values,
      firstName:
        values.firstName[0].toLocaleUpperCase() + values.firstName.slice(1),
      lastName:
        values.lastName[0].toLocaleUpperCase() + values.lastName.slice(1),
    };
    createUser(values);

    // getPublicUrl()
  }

  useEffect(() => {
    if (error) {
      form.setValue("email", "");
    }
  }, [error, form]);

  return (
    <div className="flex flex-col justify-center items-center mt-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 border shadow-lg p-8 flex flex-col"
        >
          <div className="flex flex-col">
            <span className="text-center  text-lg font-semibold">
              Create a new account
            </span>
            <span className="text-center  text-sm font-light opacity-50">
              Its quick and easy
            </span>
          </div>
          <div className="flex flex-row gap-x-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Last name" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex flex-col ">
                <PopoverCalendar field={field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="college"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="College"
                    {...field}
                    type="string"
                    value={field.value}
                  />
                </FormControl>
                <AutoCompleteCollege
                  onValueChange={field.onChange}
                  value={field.value || ""}
                />

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="City" {...field} type="city" />
                </FormControl>
                <AutoCompleteCity
                  onValueChange={field.onChange}
                  value={field.value || ""}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} type="email" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" {...field} placeholder="Password" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="avatarUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile</FormLabel>
                <FormControl>
                  <ProfileUpload
                    onProfileChange={(value: File) => {
                      field.onChange(value);
                    }}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 transition-bg transition-colors"
          >
            SignUp
          </Button>
          <Link
            href="/log-in"
            className="text-sm text-center cursor-pointer text-blue-500"
          >
            Already have a account?
          </Link>
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
