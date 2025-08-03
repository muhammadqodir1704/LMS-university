"use client";
import { useEffect, useState } from "react";
import { getCurrentUser, updateProfileImage } from "@/services/authService";
import { uploadProfileImage } from "@/services/fileService";

const TeacherProfilePage = () => {
  const [user, setUser] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    age: number;
    roles: string[];
    profileImageId?: string;
  } | null>(null);
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
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="flex items-center gap-4 mb-6">
        {user?.profileImageId ? (
          <img
            src={`https://api-lms-university.tenzorsoft.uz/api/file/${user.profileImageId}`}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border border-gray-300"
            loading="lazy"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 border border-gray-300">
            No image
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && <p className="text-sm text-blue-500">Uploading...</p>}
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Role:</strong> {user.roles?.join(", ")}</p>
      </div>
    </div>
  );
};

export default TeacherProfilePage; 