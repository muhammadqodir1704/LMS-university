"use client";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useLoading } from "@/app/components/LoadingProvider";

const ExamsPage = () => {
  const { loading } = useLoading();
  return (
    <div className="w-full">
      <Breadcrumb
        separator=""
        items={[
          { title: <Link href="/teacher/dashboard">Dashboard</Link> },
          { type: "separator" },
          { title: "Exams" },
        ]}
      />
      {!loading && <div>Loading exams...</div>}
    </div>
  );
};

export default ExamsPage;
