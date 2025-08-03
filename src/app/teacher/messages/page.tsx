"use client";
import { Breadcrumb } from "antd";
import Link from "next/link";

export default function MessagesPage() {
  return (
    <div className="w-full">
      <Breadcrumb
        separator=""
        items={[
          { title: <Link href="/teacher">Main</Link> },
          { type: "separator" },
          { title: <Link href="/teacher/messages">Messages</Link> },
        ]}
      />
      <div className="mt-6">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <p className="text-gray-600">Messages management page</p>
      </div>
    </div>
  );
}
