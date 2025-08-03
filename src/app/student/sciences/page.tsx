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
    {!loading && <div>Student Sciences</div> }
  </div>
  )
}
