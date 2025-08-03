'use client';
import { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useLoading } from "@/app/components/LoadingProvider";
import { createCourse, getCourses, deleteCourse } from "@/services/courseService";

interface CourseFormData {
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  discountPrice?: number;
  durationHours: number;
  maxStudents: number;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  categoryId: number;
  thumbnailUrl?: string;
  videoPreviewUrl?: string;
  isActive?: boolean;
  isPublished?: boolean;
  isFeatured?: boolean;
}

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

const CourseControls = () => {
  const { loading } = useLoading();
  const [courses, setCourses] = useState<Course[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    shortDescription: '',
    price: 0,
    discountPrice: 0,
    durationHours: 1,
    maxStudents: 50,
    level: 'INTERMEDIATE',
    categoryId: 1,
    thumbnailUrl: '',
    videoPreviewUrl: '',
    isActive: true,
    isPublished: true,
    isFeatured: false,
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setFetchLoading(true);
      setError(null);
      const response = await getCourses();
      if (response.success) {
        // Handle different response structures
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'discountPrice' || name === 'durationHours' || name === 'maxStudents' || name === 'categoryId' 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await createCourse(formData);
      setSuccess('Course created successfully!');
      // Reset form
      setFormData({
        title: '',
        description: '',
        shortDescription: '',
        price: 0,
        discountPrice: 0,
        durationHours: 1,
        maxStudents: 50,
        level: 'INTERMEDIATE',
        categoryId: 1,
        thumbnailUrl: '',
        videoPreviewUrl: '',
        isActive: true,
        isPublished: true,
        isFeatured: false,
      });
      // Refresh courses list
      await fetchCourses();
    } catch (err: any) {
      setError(err.message || 'Failed to create course');
    } finally {
      setSubmitLoading(false);
    }
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
            <h1 className="text-2xl font-bold">Course Management</h1>
            <button
              onClick={fetchCourses}
              disabled={fetchLoading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded-md transition-colors"
            >
              {fetchLoading ? 'Loading...' : 'Refresh Courses'}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-green-600">{success}</p>
            </div>
          )}

          {/* Courses List */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">My Courses</h2>
            
            {fetchLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="mt-2 text-gray-600">Loading courses...</p>
              </div>
            ) : courses.length > 0 ? (
              <div>
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
                        
                        <div className="space-y-2 text-sm text-gray-500 mb-4">
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
                        
                        <div className="flex space-x-2 mt-4">
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-colors font-medium"
                          >
                            🗑️ Delete
                          </button>
                          <Link
                            href={`/teacher/courseControl/${course.id}`}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition-colors font-medium"
                          >
                            ✏️ Edit
                          </Link>
                          <Link
                            href={`/teacher/courseControl`}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm transition-colors font-medium"
                          >
                            👁️ View
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
              </div>
            )}
          </div>

          {/* Create Course Form */}
          <div className="border-t pt-8">
            <h2 className="text-xl font-semibold mb-6">Create New Course</h2>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter course title"
                  />
                </div>

                <div>
                  <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                    Category ID *
                  </label>
                  <input
                    type="number"
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description *
                </label>
                <input
                  type="text"
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of the course"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed description of the course content"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700 mb-1">
                    Discount Price
                  </label>
                  <input
                    type="number"
                    id="discountPrice"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="durationHours" className="block text-sm font-medium text-gray-700 mb-1">
                    Duration (Hours) *
                  </label>
                  <input
                    type="number"
                    id="durationHours"
                    name="durationHours"
                    value={formData.durationHours}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label htmlFor="maxStudents" className="block text-sm font-medium text-gray-700 mb-1">
                    Max Students *
                  </label>
                  <input
                    type="number"
                    id="maxStudents"
                    name="maxStudents"
                    value={formData.maxStudents}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="50"
                  />
                </div>

                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                    Level *
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Thumbnail URL
                  </label>
                  <input
                    type="url"
                    id="thumbnailUrl"
                    name="thumbnailUrl"
                    value={formData.thumbnailUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label htmlFor="videoPreviewUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    Video Preview URL
                  </label>
                  <input
                    type="url"
                    id="videoPreviewUrl"
                    name="videoPreviewUrl"
                    value={formData.videoPreviewUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/video.mp4"
                  />
                </div>
              </div>

              {/* Course Status Settings - Simplified */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-900 mb-2">Course Status</h3>
                <p className="text-sm text-blue-700">
                  ✅ Course will be automatically set as Active and Published for students to see
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-2 rounded-md transition-colors"
                >
                  {submitLoading ? 'Creating...' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseControls;
