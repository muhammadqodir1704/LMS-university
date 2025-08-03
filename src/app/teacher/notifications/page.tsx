"use client";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useLoading } from "@/app/components/LoadingProvider";
export default function TeacherNotificationsPage() {
  const { loading } = useLoading();
  return (
    <div className="w-full">
      <Breadcrumb
        separator=""
        items={[
          { title: <Link href="/teacher/notifications">Dashboard</Link> },
          { type: "separator" },
          { title: "Notifications" },
        ]}
      />
      {!loading && (
        <div className="mt-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Bildirishnomalar</h1>
            <p className="text-gray-600">Talabalar uchun bildirishnomalar boshqaruvi</p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.19 4.47A17.916 17.916 0 0012 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10c0-2.76-1.12-5.26-2.93-7.07M4.19 4.47L19.53 19.81" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Bildirishnomalar</h3>
            <p className="text-gray-500 mb-4">Hozircha bildirishnoma ma'lumotlari mavjud emas</p>
            <p className="text-sm text-gray-400">Tez orada bu sahifa to'ldiriladi</p>
          </div>
        </div>
      )}
    </div>
  );
} 