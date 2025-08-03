'use client';
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useLoading } from "@/app/components/LoadingProvider";

export default function SciencesPage() {
  const { loading } = useLoading();
  return(
  <div className="w-full">
     <Breadcrumb
        separator=""
        items={[
          { title: <Link href="/student">Main</Link> },
          { type: 'separator'},
          { title: <Link href="/student/dashboard">Dashboard</Link> },
          { type: 'separator' },
          { title: <Link href="/student/sciences">Sciences</Link> },
        ]}
      />
    {!loading && (
      <div className="mt-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Fanlar</h1>
          <p className="text-gray-600">O'qitilayotgan fanlar ro'yxati</p>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Fanlar</h3>
          <p className="text-gray-500 mb-4">Hozircha fanlar ma'lumotlari mavjud emas</p>
          <p className="text-sm text-gray-400">Tez orada bu sahifa to'ldiriladi</p>
        </div>
      </div>
    )}
  </div>
  );
}
