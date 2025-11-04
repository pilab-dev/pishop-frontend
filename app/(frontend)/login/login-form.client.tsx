"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/button";
import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mail, Lock } from "lucide-react";

interface ILoginForm {
  email: string;
  password: string;
}

export default function LoginForm() {
  const form = useForm<ILoginForm>({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      }),
    ),
  });

  const onSubmit = (data: ILoginForm) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <div className="w-full max-w-sm">
          <FloatingLabelInput
            id="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            icon={<Mail size={18} />}
            {...form.register("email")}
          />
        </div>
        <div className="w-full max-w-sm">
          <FloatingLabelInput
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={<Lock size={18} />}
            {...form.register("password")}
          />
        </div>
        <Button type="submit" variant="outline">
          Login
        </Button>
      </div>
    </form>
  );
}
