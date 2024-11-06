"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import useVerifyUser from "@/hooks/verify-user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

// Regular expression for validating email
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Password validation criteria
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 characters, 1 letter, 1 number

const formSchema = z.object({
  email: z
    .string()
    .min(12, { message: "Email must be at least 12 characters long." })
    .max(50, { message: "Email must be at most 50 characters long." })
    .regex(emailRegex, { message: "Invalid email format." }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(passwordRegex, {
      message: "Password must contain at least one letter and one number.",
    }),
});

const LogIn = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate: verifyUser, error } = useVerifyUser();
  const { isValid } = form.formState;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    verifyUser(values);
  }
  useEffect(() => {
    if (error) {
      form.reset();
    }
  }, [error, form]);

  return (
    <div className="flex flex-col justify-center items-center mt-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 border shadow-lg p-8 flex flex-col"
        >
          <span className="text-center block text-md font-semibold">
            Login to Connect
          </span>
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
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 transition-bg transition-colors"
          >
            Submit
          </Button>
          <Link
            href="/"
            className="text-sm text-center cursor-pointer text-blue-500"
          >
            Forget password?
          </Link>
          <span className="text-sm block text-center">Or</span>
          <Link href="/sign-up" className="text-center">
            <Button
              type="submit"
              disabled={!isValid}
              className="bg-green-500 hover:bg-green-600 transition-bg transition-colors"
            >
              Create new account
            </Button>
          </Link>
        </form>
      </Form>
    </div>
  );
};

export default LogIn;
