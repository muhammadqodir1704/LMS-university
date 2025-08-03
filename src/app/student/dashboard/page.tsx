"use client";

import Card from "@/app/components/Card";
import { BookOpen, BookText, ArrowUpNarrowWide, Users } from "lucide-react";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useLoading } from "@/app/components/LoadingProvider";

export default function HomePage() {
  const { loading } = useLoading();
  return (
    <div className="w-full">
      <Breadcrumb
        separator=""
        items={[
          {
            title: <Link href="/student">Main</Link>,
          },
          {
            type: "separator",
          },
          {
            title: <Link href="/student/dashboard">Dashboard</Link>,
          },
        ]}
      />
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
          <Card className="overflow-hidden h-[160px]">
            <h2 className="flex items-center gap-[10px] m-4">
              <span className="w-10 h-10 bg-blue-100 rounded-[5px] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </span>
              <span>Active Courses</span>
            </h2>
            <div className="flex justify-between items-center mt-[10px] mx-4">
              <h2 className="font-semibold text-[30px] text-blue-600">6</h2>
            </div>
            <div className="border-t border-gray-20 py-[5px] px-4 text-gray-500 mt-[10px]">
              This semester
            </div>
          </Card>
          <Card className="overflow-hidden h-[160px]">
            <h2 className="flex items-center gap-[10px] m-4">
              <span className="w-10 h-10 bg-blue-100 rounded-[5px] flex items-center justify-center">
                <BookText className="w-5 h-5 text-blue-600"/>
              </span>
              <span>Pending Assignments</span>
            </h2>
            <div className="flex justify-between items-center mt-[10px] mx-4">
              <h2 className="font-semibold text-[30px] text-pink-600">3</h2>
            </div>
            <div className="border-t border-gray-20 py-[5px] px-4 text-gray-500 mt-[10px]">
              Due this week
            </div>
          </Card>
          <Card className="overflow-hidden h-[160px]">
            <h2 className="flex items-center gap-[10px] m-4">
              <span className="w-10 h-10 bg-blue-100 rounded-[5px] flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </span>
              <span>Today Attendance</span>
            </h2>
            <div className="flex justify-between items-center mt-[10px] mx-4">
              <h2 className="font-semibold text-[30px]">470</h2>
            </div>
            <div className="border-t border-gray-20 py-[5px] px-4 text-gray-500 mt-[10px]">
              Update: July 14, 2023
            </div>
          </Card>
          <Card className="overflow-hidden h-[160px]">
            <h2 className="flex items-center gap-[10px] m-4">
              <span className="w-10 h-10 bg-blue-100 rounded-[5px] flex items-center justify-center">
                <ArrowUpNarrowWide className="w-5 h-5 text-blue-600"/>{" "}
              </span>
              <span>Overall GPA</span>
            </h2>
            <div className="flex justify-between items-center mt-[10px] mx-4">
              <h2 className="font-semibold text-[30px] text-green-700 ">
                3.8
              </h2>
            </div>
            <div className=" border-t border-gray-20 py-[5px] px-4 text-gray-500 mt-[10px]">
              Current semester
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}





