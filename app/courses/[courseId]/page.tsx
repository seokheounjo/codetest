'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Circle, Play, LogOut } from 'lucide-react';
import { getCurrentUser, logout } from '@/lib/auth';
import { getLessonProgress } from '@/lib/progress';
import { courses, lessons } from '@/data/courses';
import { User, Lesson } from '@/types';

export default function CourseDetail() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      router.push('/');
      return;
    }

    setUser(currentUser);
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  const course = courses.find(c => c.id === courseId);
  if (!course) {
    router.push('/courses');
    return null;
  }

  const courseLessons = lessons.filter(l => l.courseId === course.id);

  const getLessonIcon = (lessonType: Lesson['lessonType']) => {
    switch (lessonType) {
      case 'concept': return '📖';
      case 'code': return '💻';
      case 'quiz': return '❓';
      case 'practice': return '✍️';
      case 'project': return '🎮';
      default: return '📝';
    }
  };

  const getLessonTypeName = (lessonType: Lesson['lessonType']) => {
    switch (lessonType) {
      case 'concept': return '개념';
      case 'code': return '코드';
      case 'quiz': return '퀴즈';
      case 'practice': return '실습';
      case 'project': return '프로젝트';
      default: return '레슨';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">CA</span>
              </div>
              <span className="font-bold text-lg text-gray-900">코드알파</span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-2.5 py-1 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {user.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-900 max-w-[100px] truncate">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Back Button */}
          <Link
            href="/courses"
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>코스 목록으로</span>
          </Link>

          {/* Course Header */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ backgroundColor: `${course.color}15` }}
              >
                {course.icon}
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1 font-medium">
                  Level {course.levelNumber}
                </div>
                <h1 className="mb-2 text-gray-900">
                  {course.title}
                </h1>
                <p className="text-base text-gray-600 mb-4 leading-relaxed">
                  {course.description}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="font-medium">총 {course.totalLessons}개 레슨</div>
                  <div>예상 시간: {course.totalLessons * 15}분</div>
                </div>
              </div>
            </div>
          </div>

          {/* Lessons List */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">레슨 목록</h2>
            {courseLessons.map((lesson, index) => (
              <Link
                key={lesson.id}
                href={`/courses/${courseId}/lessons/${lesson.id}`}
                className="block w-full bg-white rounded-xl border border-gray-100 p-4 hover:border-gray-200 hover:shadow-md transition-all hover:-translate-y-0.5 group"
              >
                <div className="flex items-center gap-4">
                  {/* Status */}
                  <div className="flex-shrink-0">
                    <Circle className="w-6 h-6 text-gray-300" />
                  </div>

                  {/* Icon */}
                  <div className="w-11 h-11 bg-gray-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {getLessonIcon(lesson.lessonType)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500 font-medium">
                        레슨 {index + 1}
                      </span>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">
                        {getLessonTypeName(lesson.lessonType)}
                      </span>
                    </div>
                    <h3 className="text-gray-900 mb-1 font-medium">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-1">
                      {lesson.content}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0">
                    <Play className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
