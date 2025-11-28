'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Trophy, Zap, BookOpen, ArrowRight, LogOut } from 'lucide-react';
import { getCurrentUser, logout } from '@/lib/auth';
import { getUserProgress, getUserBadges, getCourseProgress } from '@/lib/progress';
import { courses, lessons } from '@/data/courses';
import { User } from '@/types';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [userBadges, setUserBadges] = useState<any[]>([]);
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

    const userProgress = await getUserProgress(currentUser.id);
    const badges = await getUserBadges(currentUser.id);

    setProgress(userProgress);
    setUserBadges(badges);
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

  const completedLessons = progress.filter(p => p.isCompleted).length;
  const totalLessons = lessons.length;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Find next lesson
  const findNextLesson = () => {
    for (const course of courses) {
      const courseLessons = lessons.filter(l => l.courseId === course.id);
      for (const lesson of courseLessons) {
        const lessonProgress = progress.find(p => p.lessonId === lesson.id);
        if (!lessonProgress || !lessonProgress.isCompleted) {
          return { course, lesson };
        }
      }
    }
    return null;
  };

  const nextLesson = findNextLesson();

  // Recent activity
  const recentProgress = [...progress]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3);

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
                {user.isTestAccount && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-medium">
                    체험
                  </span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                title="로그아웃"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Welcome Header */}
          <div className="mb-6">
            <h1 className="mb-1 text-gray-900">
              안녕하세요, {user.name}님! 👋
            </h1>
            <p className="text-base text-gray-600">
              오늘도 즐겁게 코딩을 배워봐요
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{completedLessons}</div>
              </div>
              <div className="text-sm text-gray-600 mb-3">완료한 레슨</div>
              <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all duration-500"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-500">
                전체 {totalLessons}개 중 {overallProgress}% 완료
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">Lv.{user.level}</div>
              </div>
              <div className="text-sm text-gray-600 mb-3">현재 레벨</div>
              <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-purple-500 h-full transition-all duration-500"
                  style={{ width: `${(user.exp % 100)}%` }}
                />
              </div>
              <div className="mt-2 text-xs text-gray-500">
                다음 레벨까지 {100 - (user.exp % 100)} EXP
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-50 rounded-xl flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{userBadges.length}</div>
              </div>
              <div className="text-sm text-gray-600 mb-3">획득한 배지</div>
              {userBadges.length > 0 ? (
                <div className="flex gap-1 flex-wrap">
                  {userBadges.slice(0, 6).map((badge: any) => (
                    <div
                      key={badge.code}
                      className="w-8 h-8 bg-yellow-50 rounded-lg flex items-center justify-center text-lg"
                      title={badge.title}
                    >
                      {badge.icon}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-gray-500">
                  레슨을 완료하고 배지를 모아보세요!
                </div>
              )}
            </div>
          </div>

          {/* Continue Learning */}
          {nextLesson && (
            <div className="mb-6">
              <h3 className="mb-3 text-gray-900 text-lg font-semibold">이어서 학습하기</h3>
              <Link
                href={`/courses/${nextLesson.course.id}/lessons/${nextLesson.lesson.id}`}
                className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 group"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className="text-sm opacity-90 mb-1 font-medium">Level {nextLesson.course.levelNumber}</div>
                    <div className="text-lg font-semibold mb-1">{nextLesson.lesson.title}</div>
                    <div className="text-sm opacity-80">{nextLesson.course.title}</div>
                  </div>
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <h3 className="mb-4 text-gray-900 font-semibold">최근 학습 활동</h3>
              {recentProgress.length > 0 ? (
                <div className="space-y-3">
                  {recentProgress.map((p: any) => {
                    const lesson = lessons.find(l => l.id === p.lessonId);
                    if (!lesson) return null;

                    return (
                      <div key={p.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-base font-medium ${p.isCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
                          }`}>
                          {p.isCompleted ? '✓' : '○'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-900 truncate font-medium">
                            {lesson.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {p.isCompleted ? `점수: ${p.score}점` : '진행 중'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500 text-sm">
                  아직 학습 기록이 없어요.<br />
                  첫 레슨을 시작해보세요!
                </div>
              )}
            </div>

            {/* All Courses */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 font-semibold">전체 코스</h3>
                <Link href="/courses" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  모두 보기
                </Link>
              </div>
              <div className="space-y-2">
                {courses.slice(0, 4).map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.id}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-all"
                  >
                    <div className="text-2xl">{course.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-900 truncate font-medium">
                        {course.title}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-blue-500 h-full transition-all"
                            style={{ width: `0%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
