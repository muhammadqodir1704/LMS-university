'use client';
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useLoading } from "@/app/components/LoadingProvider";

export default function GradesPage() {
  const { loading } = useLoading();
  return (
    <div className="w-full">
      <Breadcrumb
        separator=""
        items={[
          { title: <Link href="/teacher/dashboard">Dashboard</Link> },
          { type: "separator" },
          { title: "Grades" },
        ]}
      />
      {!loading && (
        <div className="mt-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Baho</h1>
            <p className="text-gray-600">Talabalar baholari boshqaruvi</p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Baho</h3>
            <p className="text-gray-500 mb-4">Hozircha baho ma'lumotlari mavjud emas</p>
            <p className="text-sm text-gray-400">Tez orada bu sahifa to'ldiriladi</p>
          </div>
        </div>
      )}
    </div>
  );
} 