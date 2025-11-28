'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Lock, LogOut } from 'lucide-react';
import { getCurrentUser, logout } from '@/lib/auth';
import { getCourseProgress, getCompletedLessonsCount } from '@/lib/progress';
import { courses, lessons } from '@/data/courses';
import { User } from '@/types';

export default function Courses() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [courseProgress, setCourseProgress] = useState<{ [key: string]: number }>({});
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

    // Load progress for all courses
    const progressData: { [key: string]: number } = {};
    for (const course of courses) {
      const progress = await getCourseProgress(currentUser.id, course.id, lessons);
      progressData[course.id] = progress;
    }
    setCourseProgress(progressData);
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
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-6">
            <h1 className="mb-1 text-gray-900">전체 코스</h1>
            <p className="text-base text-gray-600">
              레벨 0부터 6까지 단계별로 배워봐요
            </p>
          </div>

          <div className="space-y-3">
            {courses.map((course, index) => {
              const progress = courseProgress[course.id] || 0;
              const completedCount = 0; // Will calculate properly
              const isLocked = index > 0 && (courseProgress[courses[index - 1].id] || 0) < 80;

              return (
                <div
                  key={course.id}
                  className={`bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all ${isLocked ? 'opacity-60' : 'hover:border-gray-200 hover:shadow-md hover:-translate-y-0.5'
                    }`}
                >
                  {isLocked ? (
                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                          style={{ backgroundColor: `${course.color}15` }}
                        >
                          <Lock className="w-7 h-7 text-gray-400" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-gray-500 mb-1 font-medium">
                            Level {course.levelNumber}
                          </div>
                          <h3 className="text-gray-900 mb-1 font-semibold">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {course.description}
                          </p>
                          <div className="text-xs text-gray-500 mt-3">
                            이전 레벨을 먼저 완료하세요
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link href={`/courses/${course.id}`} className="block p-5">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                          style={{ backgroundColor: `${course.color}15` }}
                        >
                          {course.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <div className="text-xs text-gray-500 mb-1 font-medium">
                                Level {course.levelNumber}
                              </div>
                              <h3 className="text-gray-900 mb-1 font-semibold">
                                {course.title}
                              </h3>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {course.description}
                              </p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                          </div>

                          <div className="flex items-center gap-4 mt-4">
                            <div className="flex-1">
                              <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5 font-medium">
                                <span>진도율</span>
                                <span>{completedCount} / {course.totalLessons} 레슨</span>
                              </div>
                              <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div
                                  className="h-full transition-all duration-500"
                                  style={{
                                    width: `${progress}%`,
                                    backgroundColor: course.color
                                  }}
                                />
                              </div>
                            </div>

                            {progress === 100 && (
                              <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                <span>완료</span>
                                <span>✓</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Learning Tips */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 border border-blue-100">
            <h3 className="mb-3 text-gray-900 font-semibold">💡 학습 팁</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• 한 번에 여러 레벨을 하기보다는, 한 레벨씩 천천히 완성해보세요</li>
              <li>• 퀴즈에서 틀린 문제는 다시 한 번 복습하는 것이 좋아요</li>
              <li>• 실습 코드를 직접 타이핑하면서 따라해보세요</li>
              <li>• 세 가지 언어의 코드를 비교하며 공통점을 찾아보세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
