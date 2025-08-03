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
   {!loading && <div>Documentsss</div> }
  </div>
  )
}
