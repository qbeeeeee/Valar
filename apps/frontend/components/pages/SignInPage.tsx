"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Sparkles, Mail, Lock, LogIn, ArrowLeft } from "lucide-react";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  useEffect(() => {
    const token = localStorage.getItem("valar_token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  const onSubmit = async (data: SignInFormData) => {
    setError(null);
    try {
      const res = await fetch("http://localhost:3001/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Invalid credentials");
      }

      localStorage.setItem("valar_token", responseData.access_token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-first text-second flex flex-col items-center justify-center p-6 selection:bg-third selection:text-first relative">
      <div className="absolute top-8 left-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold text-fourth hover:text-second transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Welcome
        </Link>
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-third/10 border border-third/30 text-third text-xs font-bold tracking-wide mb-2">
            <Sparkles className="h-3.5 w-3.5" /> Valar Access{" "}
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-second">
            Sign in to Valar
          </h1>
          <p className="text-fourth text-sm font-medium">
            Enter your credentials to access your command center.
          </p>
        </div>

        <div className="bg-first border border-fourth/20 p-8 rounded-2xl shadow-2xl relative overflow-hidden group hover:border-third/50 transition-all">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-third/50 to-transparent"></div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm font-bold text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-second ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-fourth">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="commander@valar.io"
                  className="w-full pl-11 pr-4 py-3 bg-first border border-fourth/30 rounded-xl text-second placeholder-fourth/50 focus:outline-none focus:border-third focus:ring-1 focus:ring-third transition-all"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 ml-1 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-bold text-second">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-fourth hover:text-third font-bold transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-fourth">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-first border border-fourth/30 rounded-xl text-second placeholder-fourth/50 focus:outline-none focus:border-third focus:ring-1 focus:ring-third transition-all"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 ml-1 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-third hover:bg-third/80 text-first font-bold py-6 text-base shadow-[0_0_20px_rgba(255,51,102,0.3)] hover:shadow-[0_0_25px_rgba(255,51,102,0.5)] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <LogIn className="h-5 w-5" />
                {isSubmitting ? "Authenticating..." : "Sign In"}
              </Button>
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-fourth font-medium">
          Don't have an account yet?{" "}
          <Link
            href="/sign-up"
            className="text-third hover:text-third/80 font-bold transition-colors"
          >
            Create Account
          </Link>
        </p>
      </div>
    </main>
  );
}
