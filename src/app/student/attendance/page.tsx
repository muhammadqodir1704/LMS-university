"use client";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useLoading } from "@/app/components/LoadingProvider";
export default function AttendancePage() {
  const { loading } = useLoading();
  return (
    <div className="w-full">
      <Breadcrumb
        separator=""
        items={[
          { title: <Link href="/student">Main</Link> },
          { type: 'separator'},
          { title: <Link href="/student/dashboard">Dashboard</Link> },
          { type: 'separator' },
          { title: <Link href="/student/attendance">Attendance</Link> },
        ]}
      />
      {!loading && (
        <div className="mt-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Davomat</h1>
            <p className="text-gray-600">Sizning davomat ma'lumotlaringiz</p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Davomat ma'lumotlari</h3>
            <p className="text-gray-500 mb-4">Hozircha davomat ma'lumotlari mavjud emas</p>
            <p className="text-sm text-gray-400">Tez orada bu sahifa to'ldiriladi</p>
          </div>
        </div>
      )}
    </div>
  );
}