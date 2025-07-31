"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Input } from "@ui/input";
import { Separator } from "@ui/separator";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { FloatingLabelInput } from "@/components/ui/floating-label-input";

interface ISignupForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupForm = () => {
  // Define the schema with password confirmation validation
  const signupSchema = z
    .object({
      firstName: z.string().min(1, { message: "First name is required" }),
      lastName: z.string().min(1, { message: "Last name is required" }),
      email: z.string().email({ message: "Invalid email address" }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
      confirmPassword: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const form = useForm<ISignupForm>({
    resolver: zodResolver(signupSchema as any),
  });

  const onSubmit = (data: ISignupForm) => {
    console.log(data);
  };

  return (
    <>
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <FloatingLabelInput label="First Name" {...field} />
                </FormControl>
                <FormDescription>This is your first name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FloatingLabelInput {...field} id="email" label="Email" />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-1">
            <FloatingLabelInput
              placeholder="First Name"
              {...form.register("firstName")}
              className={
                form.formState.errors.firstName ? "border-red-500" : ""
              }
            />
            {form.formState.errors.firstName && (
              <span className="text-sm text-red-500">
                {form.formState.errors.firstName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Input
              placeholder="Last Name"
              {...form.register("lastName")}
              className={form.formState.errors.lastName ? "border-red-500" : ""}
            />
            {form.formState.errors.lastName && (
              <span className="text-sm text-red-500">
                {form.formState.errors.lastName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Input
              placeholder="Email"
              {...form.register("email")}
              className={form.formState.errors.email ? "border-red-500" : ""}
            />
            {form.formState.errors.email && (
              <span className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Input
              placeholder="Password"
              type="password"
              {...form.register("password")}
              className={form.formState.errors.password ? "border-red-500" : ""}
            />
            {form.formState.errors.password && (
              <span className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <Input
              placeholder="Confirm Password"
              type="password"
              {...form.register("confirmPassword")}
              className={
                form.formState.errors.confirmPassword ? "border-red-500" : ""
              }
            />
            {form.formState.errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {form.formState.errors.confirmPassword.message}
              </span>
            )}
          </div>

          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            variant="outline"
          >
            {form.formState.isSubmitting ? "Signing up..." : "Sign up"}
          </Button>
        </form>

        <Separator />
      </FormProvider>
    </>
  );
};

export default SignupForm;
