'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle, LogOut } from 'lucide-react';
import { getCurrentUser, logout } from '@/lib/auth';
import { saveUserProgress, checkAndAwardBadges } from '@/lib/progress';
import { courses, lessons, lessonCodes } from '@/data/courses';
import { User, Badge } from '@/types';
import QuizView from '@/components/QuizView';
import CodeEditorView from '@/components/CodeEditorView';
import BadgeNotification from '@/components/BadgeNotification';

export default function LessonDetail() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;
  const lessonId = params.lessonId as string;

  const [user, setUser] = useState<User | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<'c' | 'java' | 'javascript'>('c');
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);
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

  const handleQuizComplete = (score: number) => {
    setQuizCompleted(true);
    setQuizScore(score);
  };

  const handlePracticeComplete = () => {
    setPracticeCompleted(true);
  };

  const handleLessonComplete = async () => {
    if (!user || !lesson) return;

    let finalScore = 70;

    if (lesson.lessonType === 'quiz') {
      finalScore = quizScore;
    } else if (lesson.lessonType === 'practice') {
      finalScore = practiceCompleted ? 100 : 70;
    }

    // Save progress
    await saveUserProgress(user.id, lessonId, finalScore);

    // Check badges
    const badges = await checkAndAwardBadges(user.id, lessonId);
    if (badges.length > 0) {
      setNewBadges(badges);
    }

    // Navigate back
    router.push(`/courses/${courseId}`);
  };

  const canComplete = () => {
    if (!lesson) return false;
    if (lesson.lessonType === 'quiz') {
      return quizCompleted;
    }
    return true;
  };

  const getLanguageColor = (lang: 'c' | 'java' | 'javascript') => {
    switch (lang) {
      case 'c': return '#00599c';
      case 'java': return '#f89820';
      case 'javascript': return '#f0db4f';
    }
  };

  const getLanguageName = (lang: 'c' | 'java' | 'javascript') => {
    switch (lang) {
      case 'c': return 'C';
      case 'java': return 'Java';
      case 'javascript': return 'JavaScript';
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  const course = courses.find(c => c.id === courseId);
  const lesson = lessons.find(l => l.id === lessonId);

  if (!course || !lesson) {
    router.push('/courses');
    return null;
  }

  const codes = lessonCodes.filter(code => code.lessonId === lesson.id);
  const currentCode = codes.find(code => code.language === selectedLanguage);

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
            href={`/courses/${courseId}`}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{course.title}</span>
          </Link>

          {/* Lesson Header */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: `${course.color}15` }}
              >
                {course.icon}
              </div>
              <div className="flex-1">
                <div className="text-xs text-gray-500 mb-1 font-medium">
                  Level {course.levelNumber}
                </div>
                <h1 className="text-xl font-bold mb-2 text-gray-900">
                  {lesson.title}
                </h1>
                <p className="text-gray-600 text-sm">
                  {lesson.content}
                </p>
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
            {/* Concept Lesson */}
            {(lesson.lessonType === 'concept' || lesson.lessonType === 'code') && lesson.conceptText && (
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-5">
                  {lesson.conceptImage && (
                    <div className="text-4xl">{lesson.conceptImage}</div>
                  )}
                  <h2 className="text-lg font-semibold text-gray-900">개념 이해하기</h2>
                </div>
                <div className="space-y-3 whitespace-pre-line text-sm text-gray-700 leading-relaxed">
                  {lesson.conceptText}
                </div>
              </div>
            )}

            {/* Code Examples */}
            {lesson.lessonType === 'code' && codes.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-4 text-gray-900">코드로 배우기</h2>

                {/* Language Tabs */}
                <div className="flex gap-1 mb-4 border-b border-gray-200">
                  {(['c', 'java', 'javascript'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-4 py-2 text-sm font-medium transition-all relative ${selectedLanguage === lang
                        ? 'text-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      {getLanguageName(lang)}
                      {selectedLanguage === lang && (
                        <div
                          className="absolute bottom-0 left-0 right-0 h-0.5"
                          style={{ backgroundColor: getLanguageColor(lang) }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Code Display */}
                {currentCode && (
                  <div>
                    <div className="bg-gray-900 rounded-xl p-5 mb-4 overflow-x-auto">
                      <pre className="text-sm text-gray-100 leading-relaxed">
                        <code>{currentCode.codeExample}</code>
                      </pre>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                      <div className="text-sm text-blue-900 leading-relaxed">
                        💡 <span className="ml-2">{currentCode.explanation}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quiz */}
            {lesson.lessonType === 'quiz' && lesson.quizzes && (
              <QuizView
                quizzes={lesson.quizzes}
                onComplete={handleQuizComplete}
              />
            )}

            {/* Practice */}
            {lesson.lessonType === 'practice' && lesson.practiceStarterCode && (
              <CodeEditorView
                description={lesson.practiceDescription || ''}
                starterCode={lesson.practiceStarterCode}
                expectedOutput={lesson.expectedOutput}
                onComplete={handlePracticeComplete}
              />
            )}
          </div>

          {/* Complete Button */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {lesson.lessonType === 'quiz' && !quizCompleted && '퀴즈를 완료해주세요'}
              {lesson.lessonType === 'quiz' && quizCompleted && `점수: ${quizScore}점`}
            </div>
            <button
              onClick={handleLessonComplete}
              disabled={!canComplete()}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-medium text-sm ${canComplete()
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/25'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>레슨 완료하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Badge Notification */}
      {newBadges.length > 0 && (
        <BadgeNotification
          badges={newBadges}
          onClose={() => setNewBadges([])}
        />
      )}
    </div>
  );
}
