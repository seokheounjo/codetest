export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'student' | 'parent' | 'teacher';
  level: number;
  exp: number;
  createdAt: string;
  isTestAccount?: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  orderIndex: number;
  levelNumber: number;
  icon: string;
  totalLessons: number;
  color: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string;
  orderIndex: number;
  lessonType: 'concept' | 'code' | 'quiz' | 'practice' | 'project';
  conceptText?: string;
  conceptImage?: string;
  quizzes?: Quiz[];
  practiceDescription?: string;
  practiceStarterCode?: {
    c: string;
    java: string;
    javascript: string;
  };
  expectedOutput?: string;
}

export interface LessonCode {
  id: string;
  lessonId: string;
  language: 'c' | 'java' | 'javascript';
  codeExample: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  questionText: string;
  quizType: 'ox' | 'multiple-choice' | 'fill-blank' | 'short-answer';
  options?: QuizOption[];
  explanation: string;
  correctAnswer?: string;
}

export interface QuizOption {
  id: string;
  quizId: string;
  optionText: string;
  isCorrect: boolean;
}

export interface UserProgress {
  id: string;
  userId: string;
  lessonId: string;
  isCompleted: boolean;
  score: number;
  updatedAt: string;
}

export interface Badge {
  code: string;
  title: string;
  description: string;
  icon: string;
  earnedAt?: string;
}

export type LanguageType = 'c' | 'java' | 'javascript';
