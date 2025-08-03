'use client';
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useLoading } from "@/app/components/LoadingProvider";

export default function SchedulePage() {
  const { loading } = useLoading();
  return (
    <div className="w-full">
      <Breadcrumb
        separator=""
        items={[
          { title: <Link href="/teacher/dashboard">Dashboard</Link> },
          { type: "separator" },
          { title: "Schedule" },
        ]}
      />
      {/* Faqat asosiy kontentni loading bilan o'rab qo'yamiz */}
      {!loading && <div>Teacher Schedule</div>}
    </div>
  );
}


