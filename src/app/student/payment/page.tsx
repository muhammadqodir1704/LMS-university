"use client";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useLoading } from "@/app/components/LoadingProvider";

export default function PaymentFinance() {
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
          { title: <Link href="/student/payment">Financial payment</Link> },
        ]}
      />
      {!loading && (
        <div className="mt-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">To'lovlar</h1>
            <p className="text-gray-600">Sizning to'lov ma'lumotlaringiz</p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">To'lov ma'lumotlari</h3>
            <p className="text-gray-500 mb-4">Hozircha to'lov ma'lumotlari mavjud emas</p>
            <p className="text-sm text-gray-400">Tez orada bu sahifa to'ldiriladi</p>
          </div>
        </div>
      )}
    </div>
  );
}