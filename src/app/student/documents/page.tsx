'use client';
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useLoading } from "@/app/components/LoadingProvider";
export default function DocumentsPage() {
  const { loading } = useLoading();
  

  return(
  <div className="w-full">
     <Breadcrumb
        separator=""
        items={[
          { title: 'Main' },
          { type: 'separator'},
          {  title: <Link href="/student/dashboard">Dashboard</Link> },
          { type: 'separator' },
          { title: <Link href="/student/documents">Documents</Link>},
        ]}
      />
      {!loading && (
        <div className="mt-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Hujjatlar</h1>
            <p className="text-gray-600">Sizning hujjatlaringiz</p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Hujjatlar</h3>
            <p className="text-gray-500 mb-4">Hozircha hujjatlar mavjud emas</p>
            <p className="text-sm text-gray-400">Tez orada bu sahifa to'ldiriladi</p>
          </div>
        </div>
      )}
  </div>
  );
}
