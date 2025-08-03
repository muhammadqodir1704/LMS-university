"use client";

import { getCookie } from "cookies-next";

export async function uploadProfileImage(file: File): Promise<number> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("https://api-lms-university.tenzorsoft.uz/api/file", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  let data: any = {};
  try {
    data = await res.json();
  } catch {
    // JSON bo'lmasa, data bo'sh bo'ladi
  }

  if (!res.ok) {
    throw new Error(data?.message || `Image Upload failed (${res.status})`);
  }
  return data.id;
}

// Foydalanuvchining barcha fayllarini olish (GET /api/file/user/:userId)
export async function getUserFiles(userId: string | number) {
  const accessToken = getCookie("accessToken");
  const res = await fetch(`https://api-lms-university.tenzorsoft.uz/api/file/user/${userId}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "accept": "*/*"
    }
  });
  if (!res.ok) throw new Error("Failed to fetch user files");
  return res.json();
}

// Profil rasm ID’sini user profiliga biriktirish (PUT /api/users/me)
export async function updateUserProfileWithImage(profileImageId: number, otherData: any = {}) {
  const accessToken = getCookie("accessToken");
  const res = await fetch("https://api-lms-university.tenzorsoft.uz/api/users/me", {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "accept": "*/*"
    },
    body: JSON.stringify({
      ...otherData,
      profileImageId // backendda qanday nomlangan bo‘lsa, shunday nom bering
    })
  });
  if (!res.ok) throw new Error("Failed to update user profile");
  return res.json();
}

// attachmentId orqali faylni olish (GET /api/file/{attachmentId})
export async function getFileById(attachmentId: number) {
  const accessToken = getCookie("accessToken");
  const res = await fetch(`https://api-lms-university.tenzorsoft.uz/api/file/${attachmentId}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "accept": "*/*"
    }
  });
  if (!res.ok) throw new Error("Failed to fetch file");
  return res.blob(); // Fayl blob ko‘rinishida qaytadi (rasm/fayl uchun)
}
