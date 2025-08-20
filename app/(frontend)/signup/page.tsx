import { Card, CardContent, CardHeader } from "@ui/card";

import SignupForm from "./signup-form";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center my-5 max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Sign up</h1>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  );
}
