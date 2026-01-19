"use client";

import { ArrowLeft, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";
import { loginUser } from "@/actions/user/login.action";
import { toast } from "sonner";
import Link from "next/link";
export default function page() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { push } = useRouter();
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();
        setLoading(true);
        const res = await loginUser({ email, password });
        if (res.success) {
          toast.success("Login Successful");
          push("/dashboard");
        } else {
          toast.error(res.message || "Login Failed");
        }
      } catch (err) {
        toast.error("Login Failed");
      } finally {
        setLoading(false);
      }
    },
    [email, password],
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-burgundy/10 via-white to-burgundy/10 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Back to home link */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-burgundy hover:text-burgundy/90 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </a>

        {/* Login card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-block rounded-full bg-burgundy/10 px-4 py-2 text-sm font-medium text-burgundy/80 mb-4">
              VEDICA SCHOLARS
            </div>
            <h1 className="text-3xl md:text-4xl text-gray-900 mb-2">
              Ambassador Login
            </h1>
            <p className="text-gray-600">
              Access your dashboard and track your impact
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy/60 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy/60  focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-burgundy text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <>Sign In</>}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <Link href="/register" className="px-4 bg-white text-gray-500">
                Don't have an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
