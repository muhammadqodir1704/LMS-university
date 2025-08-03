"use client";
import '@ant-design/v5-patch-for-react-19';
import { Card, Row, Col, Statistic } from "antd";
import { Users, BookOpen, DollarSign, CheckCircle } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Boshqaruv paneli</p>
      </div>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center">
            <Statistic
              title="Jami Foydalanuvchilar"
              value={1250}
              prefix={<Users className="w-6 h-6 text-blue-500" />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center">
            <Statistic
              title="O'qituvchilar"
              value={45}
              prefix={<BookOpen className="w-6 h-6 text-green-500" />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center">
            <Statistic
              title="To'lovlar"
              value={125000}
              prefix={<DollarSign className="w-6 h-6 text-yellow-500" />}
              suffix="UZS"
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="text-center">
            <Statistic
              title="Faol Kurslar"
              value={28}
              prefix={<CheckCircle className="w-6 h-6 text-purple-500" />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="So'nggi Faollik" className="h-96">
            <div className="text-center text-gray-500 py-8">
              Faollik grafigi bu yerda ko'rsatiladi
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Tizim Holati" className="h-96">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Server holati</span>
                <span className="text-green-500">✅ Faol</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Ma'lumotlar bazasi</span>
                <span className="text-green-500">✅ Faol</span>
              </div>
              <div className="flex justify-between items-center">
                <span>API holati</span>
                <span className="text-green-500">✅ Faol</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
