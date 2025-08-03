"use client";
import { useEffect, useState } from "react";
import { getCurrentUser, updateProfileImage } from "@/services/authService";
import { uploadProfileImage } from "@/services/fileService";

const StudentProfilePage = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error("User data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const uploadedId = await uploadProfileImage(file);
      await updateProfileImage(String(uploadedId));
      setUser({ ...user, profileImageId: uploadedId });
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl ">
      <h1 className="text-2xl font-bold">My Profile</h1>
      <div className="relative flex flex-col md:flex-row items-center gap-6 bg-white/80 border border-gray-200 rounded-xl shadow p-6 mt-6">
        <div className="mb-4 md:mb-0 flex flex-col items-center">
          {user?.profileImageId ? (
            <img
              src={`https://api-lms-university.tenzorsoft.uz/api/file/${user.profileImageId}`}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 border border-gray-300">
              No image
            </div>
          )}
          <div className="mt-2">
            <label className="block text-xs font-medium mb-1 text-center">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-xs"
            />
            {uploading && <p className="text-xs text-blue-500">Uploading...</p>}
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 gap-2 text-base text-gray-700">
          <div className="px-4 py-2 text-lg font-semibold bg-gray-50 rounded-md border border-gray-100 min-h-[48px]">
            <span>{user.firstName} {user.lastName}</span>
          </div>
          <div className="px-4 py-2 ">{user.email}</div>
          <div className="px-4 py-2">{user.phone}</div>
          <div className="px-4 py-2">{user.age}</div>
          <div className="px-4 py-2">{user.roles?.join(", ")}</div>
        </div>
        <button
          className="absolute right-4 bottom-4 px-4 py-2 text-xs font-medium rounded bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition shadow"
          type="button"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default StudentProfilePage;
