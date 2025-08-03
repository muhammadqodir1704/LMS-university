"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import Spinner from "@/app/components/Spinner";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const user = await loginUser(formData.email, formData.password);
      const role = user?.roles?.[0];
      if (role === "ADMIN") router.push("/admin/dashboard");
      else if (role === "TEACHER") router.push("/teacher/dashboard");
      else router.push("/student/dashboard");
    } catch (err: any) {
      setError(err.message || "Login yoki parol noto‘g‘ri");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center "
      style={{ backgroundImage: "url('/assets/harvard.webp')" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/80 p-4 sm:p-6 md:p-8 rounded-lg md:rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto backdrop-blur-md border border-white/30"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="text-3xl font-bold text-blue-600 mb-2">LMS</div>
          <h2 className="text-xl font-semibold text-gray-700">Welcome back!</h2>
          <p className="text-gray-400 text-sm">Sign in to your account</p>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-sm mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-sm mb-1 font-medium">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 bg-white/80"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            className="absolute right-2 top-8 text-xs text-blue-500 hover:underline"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md transition font-semibold flex justify-center items-center${
            loading ? " bg-blue-400" : " bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {loading ? (
            <>
              <Spinner />
              <span className="ml-2">Signing in...</span>
            </>
          ) : (
            "Sign in"
          )}
        </button>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href="/Register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
