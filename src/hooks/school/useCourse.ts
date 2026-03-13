import { useState, useEffect } from "react";
import {
  getCoursesService,
  createCourseService,
  updateCourseService,
  deleteCourseService,
  type Course,
  type CourseData,
} from "../../services/school/courseService";

interface UseCourseReturn {
  courses: Course[];
  loading: boolean;
  error: string | null;
  createCourse: (data: CourseData) => Promise<boolean>;
  updateCourse: (course_id: number, data: CourseData) => Promise<boolean>;
  deleteCourse: (course_id: number) => Promise<boolean>;
  refetch: () => void;
}

export const useCourse = (): UseCourseReturn => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCoursesService();
        setCourses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [trigger]);

  const refetch = () => setTrigger((t) => t + 1);

  const createCourse = async (data: CourseData): Promise<boolean> => {
    try {
      await createCourseService(data);
      refetch();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return false;
    }
  };

  const updateCourse = async (course_id: number, data: CourseData): Promise<boolean> => {
    try {
      await updateCourseService(course_id, data);
      refetch();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return false;
    }
  };

  const deleteCourse = async (course_id: number): Promise<boolean> => {
    try {
      await deleteCourseService(course_id);
      refetch();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      return false;
    }
  };

  return { courses, loading, error, createCourse, updateCourse, deleteCourse, refetch };
};