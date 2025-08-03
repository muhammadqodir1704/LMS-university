"use client";
import { Breadcrumb } from "antd";
import Link from "next/link";

export default function LibraryAccessPage() {
  return (
    <div className="w-full">
      <Breadcrumb
        separator=""
        items={[
          { title: <Link href="/teacher">Main</Link> },
          { type: "separator" },
          { title: <Link href="/teacher/libraryAccess">Library Access</Link> },
        ]}
      />
      <div className="mt-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Kutubxona kirish</h1>
          <p className="text-gray-600">O'quv materiallari va kitoblar</p>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">UniLibrary</h3>
          <p className="text-gray-500 mb-4">O'zbekiston universitetlari elektron kutubxonasi</p>
          <p className="text-sm text-gray-400 mb-6">Kitoblar, maqolalar va o'quv materiallarini topish uchun</p>
          
          <a 
            href="https://unilibrary.uz/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            UniLibrary ga o'tish
          </a>
        </div>
      </div>
    </div>
  );
}
