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
      {!loading && <div> Control notifacations for students</div>}
    </div>
  );
} 