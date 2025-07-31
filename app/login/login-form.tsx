"use client";

import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Login</h1>
        <Input placeholder="Email" type="email" {...form.register("email")} />
        <Input
          placeholder="Password"
          type="password"
          {...form.register("password")}
        />
        <Button type="submit" variant="outline">
          Login
        </Button>
      </div>
    </form>
  );
}
