"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/actions/image/upload.action";
import Link from "next/link";
import { registerUser } from "@/actions/user/register.action";
import { Loader2, User } from "lucide-react";

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  instituteName: string;
  name: string;
  avatar: string;
  dob: string;
};

export default function Page() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      instituteName: "",
      name: "",
      dob: "",
      avatar: "",
    },
  });

  const handleAvatarUpload = async (file: File) => {
    const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
    const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Only JPG, PNG, or WEBP images are allowed");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    try {
      setUploading(true);
      setPreview(URL.createObjectURL(file));
      const res = await uploadImage(file);
      if (!res.success || !res.url) {
        throw new Error("Upload failed");
      }

      form.setValue("avatar", res.url);
      toast.success("Avatar uploaded");
    } catch {
      toast.error("Avatar upload failed");
      setPreview(null);
      form.setValue("avatar", "");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: RegisterFormValues) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await registerUser(data);
      console.log(res);
      if (res.success) {
        toast.success("Registration successful");
        router.push("/dashboard");
      } else {
        toast.error(res.message || "Registration failed");
      }
    } catch {
      toast.error("Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full sm:w-150 m-2">
        <CardHeader className="items-center space-y-2">
          {/* Avatar */}

          <CardTitle>Registration</CardTitle>
          <CardDescription>Enter your details to continue</CardDescription>
        </CardHeader>

        <Form {...form}>
          <div
            className="relative m-auto h-24 w-24 rounded-full border flex items-center justify-center cursor-pointer overflow-hidden"
            onClick={() => fileRef.current?.click()}
          >
            {preview ? (
              <img
                src={preview}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-10 w-10 text-muted-foreground" />
            )}

            {uploading && (
              <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            )}
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleAvatarUpload(file);
            }}
          />
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* Name (full) */}
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* DOB + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="dob"
                  rules={{ required: "DOB is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
              </div>

              {/* Password + Confirm */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  rules={{ required: "Confirm your password" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Institute */}
              <FormField
                control={form.control}
                name="instituteName"
                rules={{ required: "Institute name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institute Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your institute" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col space-y-2">
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting || uploading}
              >
                {form.formState.isSubmitting ? "Processing..." : "Register"}
              </Button>

              <p className="text-xs">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold">
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
