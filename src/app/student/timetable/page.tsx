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
      {!loading && <div>Student Timetable</div> }
    </div>
  )
}
