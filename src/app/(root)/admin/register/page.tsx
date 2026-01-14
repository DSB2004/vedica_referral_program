"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerAdmin } from "@/actions/admin/register.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
type LoginFormValues = {
  email: string;
  password: string;
};

export default function Page() {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { push } = useRouter();
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const res = await registerAdmin(data);
      console.log(res);
      if (res.success) {
        toast.success("Admin Registration Successful");
        push("/admin/dashboard");
      } else {
        toast.error(res.message || "Admin Registration Failed");
      }
    } catch (err) {
      toast.error("Admin Registration Failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Admin Registration</CardTitle>
          <CardDescription>Enter your details to continue</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                rules={{ required: "Email is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
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
                rules={{ required: "Password is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="mt-4 space-y-2 flex flex-col">
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Registering..." : "Register"}
              </Button>

              <p className="text-xs ">
                Already have an account!{" "}
                <Link className="font-semibold" href={"/admin/login"}>
                  Login
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
