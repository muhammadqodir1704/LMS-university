"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    age: 18,
    role: "STUDENT",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role: string) => {
    setFormData({ ...formData, role });
  };

  const roleItems: MenuProps['items'] = [
    {
      key: 'STUDENT',
      label: (
        <div onClick={() => handleRoleChange('STUDENT')}>
          Student
        </div>
      ),
    },
    {
      key: 'TEACHER',
      label: (
        <div onClick={() => handleRoleChange('TEACHER')}>
          Teacher
        </div>
      ),
    },
    {
      key: 'ADMIN',
      label: (
        <div onClick={() => handleRoleChange('ADMIN')}>
          Admin
        </div>
      ),
    },
  ];

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'STUDENT':
        return 'Student';
      case 'TEACHER':
        return 'Teacher';
      case 'ADMIN':
        return 'Admin';
      default:
        return 'Student';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const registerData = {
      ...formData,
      roles: formData.role,
    };

    try {
      const res = await fetch(
        "https://api-lms-university.tenzorsoft.uz/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }
      const lowerRole = formData.role.toLowerCase();

      router.push(
        `/verify?email=${formData.email}&next=/${lowerRole}/dashboard`
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/harvard.webp')" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/80 p-4 sm:p-6 md:p-8 rounded-lg md:rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto backdrop-blur-md border border-white/30"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="text-3xl font-bold text-blue-600 mb-2">LMS</div>
          <h2 className="text-xl font-semibold text-gray-700">Create an account</h2>
          <p className="text-gray-400 text-sm">Sign up to get started</p>
        </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 text-center font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-3">
          <div>
            <label className="block text-sm mb-0.5 font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-1.5 md:px-4 md:py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 text-sm md:text-base"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-0.5 font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-1.5 md:px-4 md:py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 text-sm md:text-base"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="block text-sm mb-0.5 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-1.5 md:px-4 md:py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 text-sm md:text-base"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm mb-0.5 font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-1.5 md:px-4 md:py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 text-sm md:text-base"
            placeholder="+998..."
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm mb-0.5 font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-1.5 md:px-4 md:py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 text-sm md:text-base"
          >
            <option value="STUDENT">Talaba</option>
            <option value="TEACHER">O'qituvchi</option>
            <option value="ADMIN">Administrator</option>
          </select>
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm mb-0.5 font-medium">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 px-3 py-1.5 md:px-4 md:py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 bg-white/80 text-sm md:text-base"
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            className="absolute right-2 top-6 md:top-8 text-xs text-blue-500 hover:underline"
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={-1}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold flex justify-center items-center text-sm md:text-base${
            loading ? " bg-blue-400" : " bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <>
              <Spinner />
              <span className="ml-2">Creating account...</span>
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/Login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
