'use client';
import { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useLoading } from "@/app/components/LoadingProvider";
import { getCourses, deleteCourse } from "@/services/courseService";

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

const CourseList = () => {
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
        setCourses(response.data || []);
      } else {
        setError(response.message || 'Failed to fetch courses');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch courses');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      await deleteCourse(courseId.toString());
      setCourses(prev => prev.filter(course => course.id !== courseId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete course');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="w-full">
      <Breadcrumb
        separator=""
        items={[
          { title: <Link href="/teacher/dashboard">Dashboard</Link> },
          { type: "separator" },
          { title: "Course Management" },
        ]}
      />
      
      {!loading && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">My Courses</h1>
            <Link
              href="/teacher/courseControl"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            >
              Create New Course
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {fetchLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="mt-2 text-gray-600">Loading courses...</p>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {course.thumbnailUrl && (
                    <div className="h-48 bg-gray-200">
                      <img
                        src={course.thumbnailUrl}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
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
                    
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex justify-between">
                        <span>Price:</span>
                        <span className="font-medium">{formatPrice(course.price)}</span>
                      </div>
                      {course.discountPrice && course.discountPrice > 0 && (
                        <div className="flex justify-between">
                          <span>Discount:</span>
                          <span className="font-medium text-green-600">{formatPrice(course.discountPrice)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{course.durationHours}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Level:</span>
                        <span className="capitalize">{course.level.toLowerCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Max Students:</span>
                        <span>{course.maxStudents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Created:</span>
                        <span>{formatDate(course.createdAt)}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleDeleteCourse(course.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                      <Link
                        href={`/teacher/courseControl/${course.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first course.</p>
              <Link
                href="/teacher/courseControl"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Create Your First Course
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseList; 