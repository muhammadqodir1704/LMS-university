"use client";
import '@ant-design/v5-patch-for-react-19';
import { Card, Form, Input, Button, Switch, Select, message } from "antd";
import { SaveOutlined } from "@ant-design/icons";

export default function AdminSettings() {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    message.success("Sozlamalar saqlandi!");
    console.log("Settings saved:", values);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sozlamalar</h1>
        <p className="text-gray-600">Platform sozlamalari</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Umumiy Sozlamalar" className="h-fit">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{
              siteName: "LMS University",
              siteDescription: "O'quv boshqaruv tizimi",
              contactEmail: "info@lms.uz",
              contactPhone: "+998 71 123 45 67",
              maintenanceMode: false,
              registrationEnabled: true,
              defaultLanguage: "uz"
            }}
          >
            <Form.Item
              name="siteName"
              label="Sayt nomi"
              rules={[{ required: true, message: "Sayt nomini kiriting!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="siteDescription"
              label="Sayt tavsifi"
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item
              name="contactEmail"
              label="Aloqa email"
              rules={[
                { required: true, message: "Emailni kiriting!" },
                { type: "email", message: "To'g'ri email kiriting!" }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="contactPhone"
              label="Aloqa telefon"
              rules={[{ required: true, message: "Telefon raqamini kiriting!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="defaultLanguage"
              label="Asosiy til"
            >
              <Select>
                <Select.Option value="uz">O'zbekcha</Select.Option>
                <Select.Option value="en">English</Select.Option>
                <Select.Option value="ru">Русский</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="maintenanceMode"
              label="Texnik xizmat rejimi"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              name="registrationEnabled"
              label="Ro'yxatdan o'tish yoqilgan"
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Saqlash
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title="Tizim Ma'lumotlari" className="h-fit">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Server versiyasi</span>
              <span className="text-blue-600">v1.2.0</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Node.js versiyasi</span>
              <span className="text-blue-600">v18.17.0</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Database</span>
              <span className="text-green-600">PostgreSQL 14</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">CPU foydalanilishi</span>
              <span className="text-orange-600">45%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Xotira foydalanilishi</span>
              <span className="text-orange-600">2.1 GB / 8 GB</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-medium">Disk foydalanilishi</span>
              <span className="text-green-600">15 GB / 100 GB</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 