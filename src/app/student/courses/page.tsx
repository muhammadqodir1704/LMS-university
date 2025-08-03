"use client";
import '@ant-design/v5-patch-for-react-19';
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useLoading } from "@/app/components/LoadingProvider";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";

interface Course {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  thumbnailUrl: string;
  videoPreviewUrl: string;
  price: number;
  discountPrice: number;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  status: "ACTIVE" | "INACTIVE" | "DRAFT";
  isActive: boolean;
  isPublished: boolean;
  isFeatured: boolean;
  durationHours: number;
  maxStudents: number;
  instructorId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}

interface CourseResponse {
  success: boolean;
  message: string;
  data: {
    content: Course[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  };
}

const StudentCoursesPage = () => {
  const { loading, setLoading } = useLoading();
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchCourses = async (page = 0) => {
    try {
      setLoading(true);
      setError(null);
      
      const accessToken = getCookie("accessToken") as string;
      
      if (!accessToken) {
        setError("Authentication required");
        return;
      }

      const params = new URLSearchParams({
        page: page.toString(),
        size: "10",
        sortBy: "createdAt",
        sortDirection: "desc",
        isActive: "true",
        isPublished: "true"
      });

      const res = await fetch(`https://api-lms-university.tenzorsoft.uz/api/courses?${params}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
      }

      const response: CourseResponse = await res.json();
      
      if (response.success) {
        setCourses(response.data.content);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.number);
      } else {
        setError(response.message || 'Failed to fetch courses');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'BEGINNER':
        return 'bg-green-100 text-green-800';
      case 'INTERMEDIATE':
        return 'bg-yellow-100 text-yellow-800';
      case 'ADVANCED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'text-green-600';
      case 'INACTIVE':
        return 'text-red-600';
      case 'DRAFT':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="w-full">
      <Breadcrumb
        separator=""
        items={[
          { title: <Link href="/student/dashboard">Dashboard</Link> },
          { type: "separator" },
          { title: "Courses" },
        ]}
      />
      {!loading && (
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Courses</h1>
            <button 
              onClick={() => fetchCourses(currentPage)}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm transition-colors font-medium"
              style={{ color: 'white' }}
            >
              Refresh
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600">Error: {error}</p>
            </div>
          )}
          
          {courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="mb-4">
                    {course.thumbnailUrl ? (
                      <img 
                        src={course.thumbnailUrl} 
                        alt={course.title}
                        className="w-full h-32 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    
                    <div className={`w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center ${course.thumbnailUrl ? 'hidden' : ''}`}>
                      <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    {course.isFeatured && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Featured</span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-2">{course.shortDescription || course.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Level:</span>
                      <span className={`px-2 py-1 rounded text-xs ${getLevelColor(course.level)}`}>
                        {course.level}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Price:</span>
                      <span className="font-medium">
                        ${course.price}
                        {course.discountPrice > 0 && (
                          <span className="text-red-500 ml-1">-${course.discountPrice}</span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium">{course.durationHours}h</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status:</span>
                      <span className={`font-medium ${getStatusColor(course.status)}`}>
                        {course.status}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Published:</span>
                      <span className={course.isPublished ? 'text-green-600' : 'text-red-600'}>
                        {course.isPublished ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    className="w-full bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm transition-colors font-medium"
                    style={{ color: 'white' }}
                  >
                    Continue Learning
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <p className="text-gray-600">No courses available</p>
              <p className="text-sm text-gray-500 mt-2">Check back later for new courses</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => fetchCourses(currentPage - 1)}
                disabled={currentPage === 0}
                className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-3 py-2">
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                onClick={() => fetchCourses(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="px-3 py-2 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentCoursesPage; 