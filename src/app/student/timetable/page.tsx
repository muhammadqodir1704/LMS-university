'use client';
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useLoading } from "@/app/components/LoadingProvider";
export default function TimetablePage() {
  const { loading } = useLoading();
  return (
    <div className="w-full ">
       <Breadcrumb
        separator=""
        items={[
          { title: <Link href="/student">Main</Link> },
          { type: 'separator'},
          { title: <Link href="/student/dashboard">Dashboard</Link> },
          { type: 'separator' },
          { title: <Link href="/student/timetable">TimeTable</Link> },
        ]}
      />
      {!loading && (
        <div className="mt-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dars jadvali</h1>
            <p className="text-gray-600">Sizning dars jadvalingiz</p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Dars jadvali</h3>
            <p className="text-gray-500 mb-4">Hozircha dars jadvali mavjud emas</p>
            <p className="text-sm text-gray-400">Tez orada bu sahifa to'ldiriladi</p>
          </div>
        </div>
      )}
    </div>
  );
}
