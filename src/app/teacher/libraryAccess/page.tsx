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
        <h1 className="text-2xl font-bold mb-4">Library Access</h1>
        <p className="text-gray-600">Library access management page</p>
      </div>
    </div>
  );
}
