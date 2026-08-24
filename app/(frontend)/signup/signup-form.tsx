"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/button";
import { Checkbox } from "@ui/checkbox";
import { Label } from "@ui/label";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@ui/form";
import { Separator } from "@ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { handleFullSignup } from "@/components/auth/auth-handlers";
import { fullSignupSchema, type FullSignupFormData } from "@/components/auth/auth-schemas";
import { useAuthStore } from "@/store/auth-store";
import { User, Mail, Lock } from "lucide-react";

const SignupForm = () => {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const form = useForm<FullSignupFormData>({
    resolver: zodResolver(fullSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: undefined as unknown as true,
    },
  });

  useEffect(() => {
    const email = new URLSearchParams(window.location.search).get("email");
    if (email) form.setValue("email", email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: FullSignupFormData) => {
    setFormError(null);
    const result = await handleFullSignup(data);
    if (result.success && result.user) {
      useAuthStore.getState().setUser(result.user);
      router.push("/");
    } else {
      setFormError(result.message || "Registration failed");
    }
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
              <FormItem>
                <FormControl>
                  <FloatingLabelInput
                    id="firstName"
                    label="First Name"
                    placeholder="Enter your first name"
                    icon={<User size={18} />}
                    {...field}
                  />
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
                  <FloatingLabelInput
                    id="lastName"
                    label="Last Name"
                    placeholder="Enter your last name"
                    icon={<User size={18} />}
                    {...field}
                  />
                </FormControl>
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
                  <FloatingLabelInput
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    icon={<Mail size={18} />}
                    {...field}
                  />
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
                  <FloatingLabelInput
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    icon={<Lock size={18} />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FloatingLabelInput
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    icon={<Lock size={18} />}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="acceptedTerms"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormControl>
                    <Checkbox
                      id="acceptedTerms"
                      checked={field.value === true}
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                    />
                  </FormControl>
                  <Label htmlFor="acceptedTerms" className="text-sm text-gray-600">
                    I accept the{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>
                  </Label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {formError && (
            <p className="text-sm text-red-500 text-center">{formError}</p>
          )}

          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="rounded-full bg-black text-white hover:bg-[#f5c615] hover:text-black transition-colors"
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
