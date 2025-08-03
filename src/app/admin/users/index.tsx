"use client";
import '@ant-design/v5-patch-for-react-19';
import { useState, useEffect } from "react";
import { Table, Button, Input, Space, Tag, Modal, Form, Select, message, Spin } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getCookie } from "cookies-next";

const { Search } = Input;

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const accessToken = getCookie("accessToken") as string;

      if (!accessToken) {
        console.error('No access token found');
        message.error('Authentication required');
        return;
      }

      console.log('Fetching users with token:', accessToken.substring(0, 20) + '...');

      const response = await fetch('https://api-lms-university.tenzorsoft.uz/api/users', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Users API response status:', response.status);
      console.log('Users API response ok:', response.ok);

      if (!response.ok) {
        if (response.status === 403) {
          console.error('Access forbidden - check permissions');
          message.error('Access forbidden - check permissions');
          return;
        }
        
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          console.error('Users API error response:', errorData);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
        }
        
        message.error(errorMessage);
        throw new Error(errorMessage);
      }

      // Check if response has content before parsing JSON
      const text = await response.text();
      console.log('Users API response text length:', text.length);
      
      if (!text) {
        console.error('Empty response from server');
        message.error('Empty response from server');
        return;
      }

      const result = JSON.parse(text);
      console.log('Users API parsed result:', result);
      
      if (result.success) {
        console.log('Users fetched successfully:', result.data?.length || 0, 'users');
        setUsers(result.data || []);
      } else {
        console.error('Failed to fetch users:', result.message);
        message.error(result.message || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error(`Error fetching users: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "Ism",
      dataIndex: "firstName",
      key: "firstName",
      render: (firstName: string, record: any) => `${firstName} ${record.lastName}`,
      sorter: (a: any, b: any) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Rol",
      dataIndex: "roles",
      key: "roles",
      render: (roles: string[]) => (
        <Tag color={roles.includes("SUPER_ADMIN") ? "red" : roles.includes("TEACHER") ? "blue" : "green"}>
          {roles.includes("SUPER_ADMIN") ? "Admin" : roles.includes("TEACHER") ? "O'qituvchi" : "Talaba"}
        </Tag>
      ),
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Yosh",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Amallar",
      key: "actions",
      render: (_: any, record: any) => (
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
            onClick={() => handleDelete(record.userId)}
          >
            O'chirish
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (user: any) => {
    setEditingUser(user);
    form.setFieldsValue({
      ...user,
      role: user.roles?.[0] || 'STUDENT' // Take first role if multiple
    });
    setIsModalVisible(true);
  };

  const handleDelete = (userId: any) => {
    Modal.confirm({
      title: "Foydalanuvchini o'chirish",
      content: "Bu foydalanuvchini o'chirishni xohlaysizmi?",
      onOk: () => {
        setUsers(users.filter(user => user.id !== userId));
        message.success("Foydalanuvchi o'chirildi");
      },
    });
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingUser) {
        // Update user roles using PATCH API
        const accessToken = getCookie("accessToken") as string;

        if (!accessToken) {
          message.error('Authentication required');
          return;
        }

        console.log('Updating user role:', editingUser.userId, values.role);
        console.log('Request URL:', `https://api-lms-university.tenzorsoft.uz/api/users/${editingUser.userId}/roles`);
        console.log('Request payload:', [values.role]);

        const response = await fetch(`https://api-lms-university.tenzorsoft.uz/api/users/${editingUser.userId}/roles`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify([values.role])
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (response.ok) {
          message.success("Foydalanuvchi roli yangilandi");
          // Refresh users list
          fetchUsers();
        } else {
          let errorMessage = "Rolni yangilashda xatolik yuz berdi";
          try {
            const errorData = await response.json();
            console.error('Error response:', errorData);
            errorMessage = errorData.message || errorData.error || errorMessage;
          } catch (parseError) {
            console.error('Failed to parse error response:', parseError);
            errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          }
          message.error(errorMessage);
        }
      } else {
        // Create new user using POST API
        const accessToken = getCookie("accessToken") as string;

        if (!accessToken) {
          message.error('Authentication required');
          return;
        }

        const userData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          phone: values.phone,
          age: parseInt(values.age),
          roles: [values.role]
        };

        console.log('Creating new user:', userData);

        const response = await fetch('https://api-lms-university.tenzorsoft.uz/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(userData)
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        if (response.ok) {
          try {
            const result = await response.json();
            console.log('Success response:', result);
            message.success("Yangi foydalanuvchi qo'shildi");
            // Refresh users list
            fetchUsers();
          } catch (parseError) {
            console.error('Failed to parse success response:', parseError);
            message.success("Yangi foydalanuvchi qo'shildi");
            fetchUsers();
          }
        } else {
          let errorMessage = "Xatolik yuz berdi";
          try {
            const result = await response.json();
            console.error('Error response:', result);
            errorMessage = result.message || result.error || errorMessage;
          } catch (parseError) {
            console.error('Failed to parse error response:', parseError);
            errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          }
          message.error(errorMessage);
        }
      }
    } catch (error) {
      console.error('Network error or other exception:', error);
      message.error(`Xatolik yuz berdi: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsModalVisible(false);
      setEditingUser(null);
      form.resetFields();
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Foydalanuvchilar</h1>
        <p className="text-gray-600">Barcha foydalanuvchilarni boshqarish</p>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <Search
          placeholder="Foydalanuvchi qidirish..."
          style={{ width: 300 }}
          allowClear
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingUser(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Yangi Foydalanuvchi
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <Spin size="large" />
          <div className="mt-4 text-gray-600">Foydalanuvchilar yuklanmoqda...</div>
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={users}
          rowKey="userId"
          pagination={{
            total: users.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      )}

      <Modal
        title={editingUser ? "Foydalanuvchi roli" : "Yangi foydalanuvchi"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingUser(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          {!editingUser && (
            <>
              <Form.Item
                name="firstName"
                label="Ism"
                rules={[{ required: true, message: "Ismni kiriting!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Familiya"
                rules={[{ required: true, message: "Familiyani kiriting!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Emailni kiriting!" },
                  { type: "email", message: "To'g'ri email kiriting!" }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Parol"
                rules={[{ required: true, message: "Parolni kiriting!" }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Telefon"
                rules={[{ required: true, message: "Telefon raqamini kiriting!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="age"
                label="Yosh"
                rules={[{ required: true, message: "Yoshni kiriting!" }]}
              >
                <Input type="number" />
              </Form.Item>
            </>
          )}
          <Form.Item
            name="role"
            label="Rol"
            rules={[{ required: true, message: "Rolni tanlang!" }]}
          >
            <Select>
              <Select.Option value="STUDENT">Talaba</Select.Option>
              <Select.Option value="TEACHER">O'qituvchi</Select.Option>
              <Select.Option value="ADMIN">Admin</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingUser ? "Rolni yangilash" : "Qo'shish"}
              </Button>
              <Button onClick={() => {
                setIsModalVisible(false);
                setEditingUser(null);
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
