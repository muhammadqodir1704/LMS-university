"use client";
import { useState } from "react";
import '@ant-design/v5-patch-for-react-19';
import { Table, Button, Input, Space, Tag, Modal, Form, Select, message, Card, Row, Col } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Search } = Input;
const { TextArea } = Input;

interface Course {
  id: number;
  name: string;
  description: string;
  teacher: string;
  students: number;
  duration: string;
  level: string;
  status: string;
  price: number;
  createdAt: string;
}

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: "Matematika asoslari",
      description: "O'rta maktab matematika kursi",
      teacher: "Malika Yusupova",
      students: 25,
      duration: "6 oy",
      level: "O'rta",
      status: "active",
      price: 2500000,
      createdAt: "2024-01-10"
    },
    {
      id: 2,
      name: "Fizika laboratoriyasi",
      description: "Amaliy fizika tajribalari",
      teacher: "Aziz Karimov",
      students: 18,
      duration: "4 oy",
      level: "Yuqori",
      status: "active",
      price: 3000000,
      createdAt: "2024-01-15"
    },
    {
      id: 3,
      name: "Ingliz tili grammatikasi",
      description: "Ingliz tili grammatika qoidalari",
      teacher: "Dilfuza Toshmatova",
      students: 32,
      duration: "8 oy",
      level: "Boshlang'ich",
      status: "inactive",
      price: 1800000,
      createdAt: "2024-01-20"
    }
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Kurs nomi",
      dataIndex: "name",
      key: "name",
      render: (name: string, record: Course) => (
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-gray-500 text-sm">{record.description}</div>
        </div>
      ),
    },
    {
      title: "O'qituvchi",
      dataIndex: "teacher",
      key: "teacher",
    },
    {
      title: "Talabalar",
      dataIndex: "students",
      key: "students",
    },
    {
      title: "Davomiyligi",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Daraja",
      dataIndex: "level",
      key: "level",
      render: (level: string) => (
        <Tag color={
          level === "Boshlang'ich" ? "green" : 
          level === "O'rta" ? "blue" : "orange"
        }>
          {level}
        </Tag>
      ),
    },
    {
      title: "Narxi",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString()} UZS`,
    },
    {
      title: "Holat",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Faol" : "Nofaol"}
        </Tag>
      ),
    },
    {
      title: "Amallar",
      key: "actions",
      render: (_: any, record: Course) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Tahrirlash
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDelete(record.id)}
          >
            O'chirish
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    form.setFieldsValue(course);
    setIsModalVisible(true);
  };

  const handleDelete = (courseId: number) => {
    Modal.confirm({
      title: "Kursni o'chirish",
      content: "Bu kursni o'chirishni xohlaysizmi?",
      onOk: () => {
        setCourses(courses.filter(course => course.id !== courseId));
        message.success("Kurs o'chirildi");
      },
    });
  };

  const handleSubmit = (values: any) => {
    if (editingCourse) {
      setCourses(courses.map(course => 
        course.id === editingCourse.id ? { ...course, ...values } : course
      ));
      message.success("Kurs yangilandi");
    } else {
      const newCourse: Course = {
        id: Date.now(),
        ...values,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCourses([...courses, newCourse]);
      message.success("Yangi kurs qo'shildi");
    }
    setIsModalVisible(false);
    setEditingCourse(null);
    form.resetFields();
  };

  const totalStudents = courses.reduce((sum, course) => sum + course.students, 0);
  const totalRevenue = courses.reduce((sum, course) => sum + course.price, 0);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Kurslar</h1>
        <p className="text-gray-600">Barcha kurslarni boshqarish</p>
      </div>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={8}>
          <Card className="text-center">
            <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
            <div className="text-gray-600">Jami kurslar</div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="text-center">
            <div className="text-2xl font-bold text-green-600">{totalStudents}</div>
            <div className="text-gray-600">Jami talabalar</div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="text-center">
            <div className="text-2xl font-bold text-purple-600">{totalRevenue.toLocaleString()}</div>
            <div className="text-gray-600">Jami daromad (UZS)</div>
          </Card>
        </Col>
      </Row>

      <div className="mb-4 flex justify-between items-center">
        <Search
          placeholder="Kurs qidirish..."
          style={{ width: 300 }}
          allowClear
        />
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => {
            setEditingCourse(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Yangi Kurs
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={courses}
        rowKey="id"
        pagination={{
          total: courses.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />

      <Modal
        title={editingCourse ? "Kursni tahrirlash" : "Yangi kurs"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingCourse(null);
          form.resetFields();
        }}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Kurs nomi"
            rules={[{ required: true, message: "Kurs nomini kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Kurs tavsifi"
            rules={[{ required: true, message: "Kurs tavsifini kiriting!" }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="teacher"
            label="O'qituvchi"
            rules={[{ required: true, message: "O'qituvchini kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Davomiyligi"
            rules={[{ required: true, message: "Davomiyligini kiriting!" }]}
          >
            <Input placeholder="masalan: 6 oy" />
          </Form.Item>
          <Form.Item
            name="level"
            label="Daraja"
            rules={[{ required: true, message: "Darajani tanlang!" }]}
          >
            <Select>
              <Select.Option value="Boshlang'ich">Boshlang'ich</Select.Option>
              <Select.Option value="O'rta">O'rta</Select.Option>
              <Select.Option value="Yuqori">Yuqori</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Narxi (UZS)"
            rules={[{ required: true, message: "Narxni kiriting!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Holat"
            rules={[{ required: true, message: "Holatni tanlang!" }]}
          >
            <Select>
              <Select.Option value="active">Faol</Select.Option>
              <Select.Option value="inactive">Nofaol</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingCourse ? "Yangilash" : "Qo'shish"}
              </Button>
              <Button onClick={() => {
                setIsModalVisible(false);
                setEditingCourse(null);
                form.resetFields();
              }}>
                Bekor qilish
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
} 