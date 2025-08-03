"use client";
import { Card, Table, Tag, Space, Button } from "antd";
import { CheckCircle, Clock } from "lucide-react";

export default function AdminPayments() {
  const payments = [
    {
      id: 1,
      student: "Aziz Karimov",
      amount: 2500000,
      status: "completed",
      date: "2024-01-15",
      method: "Click"
    },
    {
      id: 2,
      student: "Malika Yusupova", 
      amount: 1800000,
      status: "pending",
      date: "2024-01-16",
      method: "Payme"
    },
    {
      id: 3,
      student: "Jasur Toshmatov",
      amount: 3200000,
      status: "completed",
      date: "2024-01-17",
      method: "UzCard"
    }
  ];

  const columns = [
    {
      title: "Talaba",
      dataIndex: "student",
      key: "student",
    },
    {
      title: "Summa",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `${amount.toLocaleString()} UZS`,
    },
    {
      title: "Holat",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag 
          color={status === "completed" ? "green" : "orange"}
          icon={status === "completed" ? <CheckCircle /> : <Clock />}
        >
          {status === "completed" ? "To'langan" : "Kutilmoqda"}
        </Tag>
      ),
    },
    {
      title: "To'lov usuli",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Sana",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Amallar",
      key: "actions",
      render: () => (
        <Space>
          <Button size="small" type="primary">Batafsil</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">To'lovlar</h1>
        <p className="text-gray-600">Barcha to'lovlarni boshqarish</p>
      </div>

      <div className="mb-6">
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">75,000,000 UZS</div>
              <div className="text-gray-600">Jami to'lovlar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">45</div>
              <div className="text-gray-600">To'langan to'lovlar</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">12</div>
              <div className="text-gray-600">Kutilayotgan to'lovlar</div>
            </div>
          </div>
        </Card>
      </div>

      <Table
        columns={columns}
        dataSource={payments}
        rowKey="id"
        pagination={{
          total: payments.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </div>
  );
} 