"use client";

import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { FloatingLabelInput } from "./ui/floating-label-input";
import { Label } from "./ui/label";

interface ILoginForm {
  email: string;
  password: string;
}

export const LoginPopover = () => {
  const { register } = useForm<ILoginForm>();

  return (
    <form>
      <div className="flex flex-col gap-5">
        <h3 className="text-xl">My account</h3>

        <FloatingLabelInput
          type="email"
          label="Account name"
          {...register("email")}
        />
        <FloatingLabelInput
          type="password"
          label="Password"
          {...register("password")}
        />

        <div className="flex items-center gap-3">
          <Checkbox id="remember-me-cb<" />
          <Label htmlFor="remember-me-cb<">Remember me</Label>
        </div>

        <Button type="submit">Login</Button>
      </div>
    </form>
  );
};
