"use client";

import { Button } from "@/components/ui/button";
import {
  FloatingLabelInput,
  FloatingTextarea,
} from "@/components/ui/floating-label-input";
import { useActionState } from "react";
import { z } from "zod";
import createUser from "./actions";

const schema = z.object({
  email: z.email({
    error: "Invalid Email",
  }),
});

const initialState = {
  errors: {},
  success: false,
};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(createUser, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-8" method="POST">
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <FloatingLabelInput
          type="text"
          label="Your Name"
          required
          name="name"
        />

        <FloatingLabelInput
          type="email"
          label="Your Email"
          required
          name="email"
        />
      </div>

      <FloatingLabelInput
        type="text"
        label="Subject"
        required
        name="subject"
        className="w-full"
      />

      <FloatingTextarea
        label="Message"
        required
        name="message"
        className="w-full"
        rows={8}
      />

      <div>
      <Button type="submit" className="cursor-pointer rounded-4xl text-white bg-black px-6 py-4 w-full sm:w-auto" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </Button>
      </div>
    </form>
  );
}
