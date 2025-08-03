"use client";

import { getCookie } from "cookies-next";

interface CourseData {
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
  isFeatured?: boolean;
  isPublished?: boolean;
}

// Helper function for API calls with better error handling
async function apiCall(url: string, options: RequestInit = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMessage += `, message: ${JSON.stringify(errorData)}`;
      } catch {
        errorMessage += `, response: ${response.statusText}`;
      }
      
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - server is not responding');
      }
      throw error;
    }
    
    throw new Error('Network error - please check your connection');
  }
}

export async function createCourse(courseData: CourseData) {
  const accessToken = getCookie("accessToken") as string;
  
  if (!accessToken) {
    throw new Error("Authentication required - please login again");
  }

  try {
    // Get current user to get instructor_id
    const userResponse = await apiCall("https://api-lms-university.tenzorsoft.uz/api/me", {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const userData = await userResponse.json();
    const instructorId = userData.id;

    if (!instructorId) {
      throw new Error("Instructor ID not found. Please ensure you are logged in as a teacher.");
    }

    const coursePayload = {
      ...courseData,
      instructorId: instructorId,
      status: 'ACTIVE',
      isActive: true,
      isPublished: true,
      isFeatured: false,
      createdBy: instructorId,
      updatedBy: instructorId,
      deleted: false,
    };

    const response = await apiCall("https://api-lms-university.tenzorsoft.uz/api/courses", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coursePayload),
    });

    return await response.json();
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
}

export async function getCourses() {
  const accessToken = getCookie("accessToken") as string;
  
  if (!accessToken) {
    throw new Error("Authentication required - please login again");
  }

  try {
    const response = await apiCall("https://api-lms-university.tenzorsoft.uz/api/courses", {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
}

export async function getCourseById(courseId: string) {
  const accessToken = getCookie("accessToken") as string;
  
  if (!accessToken) {
    throw new Error("Authentication required - please login again");
  }

  try {
    const response = await apiCall(`https://api-lms-university.tenzorsoft.uz/api/courses/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error fetching course by ID:', error);
    throw error;
  }
}

export async function updateCourse(courseId: string, courseData: Partial<CourseData>) {
  const accessToken = getCookie("accessToken") as string;
  
  if (!accessToken) {
    throw new Error("Authentication required - please login again");
  }

  try {
    // Get current user to get instructor_id
    const userResponse = await apiCall("https://api-lms-university.tenzorsoft.uz/api/me", {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const userData = await userResponse.json();
    const instructorId = userData.id;

    const coursePayload = {
      ...courseData,
      instructorId: instructorId,
      updatedBy: instructorId,
    };

    const response = await apiCall(`https://api-lms-university.tenzorsoft.uz/api/courses/${courseId}`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coursePayload),
    });

    return await response.json();
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
}

export async function deleteCourse(courseId: string) {
  const accessToken = getCookie("accessToken") as string;
  
  if (!accessToken) {
    throw new Error("Authentication required - please login again");
  }

  try {
    const response = await apiCall(`https://api-lms-university.tenzorsoft.uz/api/courses/${courseId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
} 