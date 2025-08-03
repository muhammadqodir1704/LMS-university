// services/authService.ts
"use client";

import { setCookie, getCookie, deleteCookie } from "cookies-next";

// Login 
export async function loginUser(email: string, password: string) {
  const res = await fetch("https://api-lms-university.tenzorsoft.uz/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Login failed");

  setCookie("accessToken", data.accessToken, {
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  setCookie("refreshToken", data.refreshToken, {
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return data.user;
}

// Logout
export function logout() {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  window.location.href = "/Login";
}

// Hozir login bo'lgan foydalanuvchini olish
export async function getCurrentUser() {
  const accessToken = getCookie("accessToken");

  if (!accessToken) return null;

  const res = await fetch("https://api-lms-university.tenzorsoft.uz/api/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) return null;

  return await res.json();
}

// Profil rasm ID ni yangilash (PUT /api/users/me)
export async function updateProfileImage(profileImageId: string) {
  const accessToken = getCookie("accessToken");
  if (!accessToken) throw new Error("Not authenticated");

  const res = await fetch("https://api-lms-university.tenzorsoft.uz/api/users/me", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ profileImageId }),
    credentials: "include",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Profile image update failed");
  }
  return res.json();
}
