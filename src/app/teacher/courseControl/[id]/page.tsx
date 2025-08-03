'use client';
import { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useLoading } from "@/app/components/LoadingProvider";
import { getCourseById, updateCourse } from "@/services/courseService";
import { useParams } from "next/navigation";

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

const EditCourse = () => {
  const { loading } = useLoading();
  const params = useParams();
  const courseId = params.id as string;
  
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
  const [fetchLoading, setFetchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setFetchLoading(true);
      setError(null);
      const response = await getCourseById(courseId);
      if (response.success && response.data) {
        const course = response.data;
        setFormData({
          title: course.title || '',
          description: course.description || '',
          shortDescription: course.shortDescription || '',
          price: course.price || 0,
          discountPrice: course.discountPrice || 0,
          durationHours: course.durationHours || 1,
          maxStudents: course.maxStudents || 50,
          level: course.level || 'INTERMEDIATE',
          categoryId: course.categoryId || 1,
          thumbnailUrl: course.thumbnailUrl || '',
          videoPreviewUrl: course.videoPreviewUrl || '',
          isActive: course.isActive !== undefined ? course.isActive : true,
          isPublished: course.isPublished !== undefined ? course.isPublished : true,
          isFeatured: course.isFeatured !== undefined ? course.isFeatured : false,
        });
      } else {
        setError(response.message || 'Failed to fetch course');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch course');
    } finally {
      setFetchLoading(false);
    }
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
      await updateCourse(courseId, formData);
      setSuccess('Course updated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to update course');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="w-full">
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Breadcrumb
        separator=""
        items={[
          { title: <Link href="/teacher/dashboard">Dashboard</Link> },
          { type: "separator" },
          { title: <Link href="/teacher/courseControl">Course Management</Link> },
          { type: "separator" },
          { title: "Edit Course" },
        ]}
      />
      
      {!loading && (
        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-6">Edit Course</h1>
          
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
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-blue-900 mb-2">Course Status</h3>
              <p className="text-sm text-blue-700">
                ✅ Course will be automatically set as Active and Published for students to see
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                href="/teacher/dashboard"
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitLoading}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-2 rounded-md transition-colors"
              >
                {submitLoading ? 'Updating...' : 'Update Course'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditCourse; 