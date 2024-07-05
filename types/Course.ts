export interface CourseData {
  course_id: string;
  name: string;
  description: string;
}

export interface UnfinishedCourseData {
  course_id: string;
  name: string;
  description: string;
  totalQuestions: number;
  answeredQuestions: number;
  session: string;
}