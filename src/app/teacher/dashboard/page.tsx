"use client";
import '@ant-design/v5-patch-for-react-19';
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useLoading } from "@/app/components/LoadingProvider";
import { useState, useEffect } from "react";
import { getCourses } from "@/services/courseService";

interface Course {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  durationHours: number;
  maxStudents: number;
  level: string;
  status: string;
  thumbnailUrl?: string;
  videoPreviewUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export default function TeacherDashboard() {
  const { loading } = useLoading();
  const [courses, setCourses] = useState<Course[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setFetchLoading(true);
      setError(null);
      const response = await getCourses();
      
      if (response.success) {
        let coursesData = [];
        if (response.data) {
          if (Array.isArray(response.data)) {
            coursesData = response.data;
          } else if (response.data.content && Array.isArray(response.data.content)) {
            coursesData = response.data.content;
          } else if (response.data.data && Array.isArray(response.data.data)) {
            coursesData = response.data.data;
          }
        }
        
        setCourses(coursesData);
      } else {
        setError(response.message || 'Failed to fetch courses');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
    } finally {
      setFetchLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  // Calculate statistics
  const totalCourses = courses.length;
  const activeCourses = courses.filter(course => course.status === 'ACTIVE').length;
  const totalRevenue = courses.reduce((sum, course) => sum + course.price, 0);
  const totalDuration = courses.reduce((sum, course) => sum + course.durationHours, 0);

  return (
    <div className="w-full">
      <Breadcrumb
        separator=""
        items={[
          { title: <Link href="/teacher">Main</Link> },
          { type: "separator" },
          { title: <Link href="/teacher/dashboard">Dashboard</Link> },
        ]}
      />
      {!loading && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
            <div className="flex space-x-2">
              <button
                onClick={fetchCourses}
                disabled={fetchLoading}
                className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded-md transition-colors"
              >
                {fetchLoading ? 'Loading...' : 'Refresh'}
              </button>
              <Link
                href="/teacher/courseControl"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Manage Courses
              </Link>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCourses}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Courses</p>
                  <p className="text-2xl font-bold text-gray-900">{activeCourses}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Duration</p>
                  <p className="text-2xl font-bold text-gray-900">{totalDuration}h</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPrice(totalRevenue)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Courses Overview */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Courses</h2>
              <Link
                href="/teacher/courseControl"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All Courses →
              </Link>
            </div>
            
            {fetchLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="mt-2 text-gray-600">Loading courses...</p>
              </div>
            ) : courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.slice(0, 3).map((course) => (
                  <div key={course.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {course.thumbnailUrl && (
                      <div className="h-32 bg-gray-200">
                        <img
                          src={course.thumbnailUrl}
                          alt={course.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                          loading="lazy"
                        />
                      </div>
                    )}
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                          {course.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          course.status === 'ACTIVE' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {course.shortDescription}
                      </p>
                      
                      <div className="space-y-1 text-xs text-gray-500 mb-4">
                        <div className="flex justify-between">
                          <span>Price:</span>
                          <span className="font-medium">{formatPrice(course.price)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span>{course.durationHours}h</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Created:</span>
                          <span>{formatDate(course.createdAt)}</span>
                        </div>
                      </div>
                      
                      <Link
                        href={`/teacher/courseControl/${course.id}`}
                        className="block w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-colors font-medium text-center"
                      >
                        Manage Course
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-600">No courses available</p>
                <p className="text-sm text-gray-500 mt-2">Create your first course to get started</p>
                <Link
                  href="/teacher/courseControl"
                  className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  Create Course
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
