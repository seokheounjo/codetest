import { supabase } from './supabase';
import { UserProgress, Badge } from '@/types';

// Available badges
export const availableBadges: Badge[] = [
  {
    code: 'first-step',
    title: '첫 발자국',
    description: '첫 레슨을 완료했어요',
    icon: '👣',
  },
  {
    code: 'hello-world',
    title: 'Hello World',
    description: '첫 출력 프로그램을 완성했어요',
    icon: '💬',
  },
  {
    code: 'variable-master',
    title: '변수 마스터',
    description: '변수를 이해하고 사용할 수 있어요',
    icon: '📦',
  },
  {
    code: 'quiz-expert',
    title: '퀴즈 전문가',
    description: '퀴즈 10개를 맞혔어요',
    icon: '🎯',
  },
  {
    code: 'first-project',
    title: '작은 개발자',
    description: '첫 프로젝트를 완성했어요',
    icon: '🎮',
  },
  {
    code: 'streak-3',
    title: '꾸준함',
    description: '3일 연속 학습했어요',
    icon: '🔥',
  },
];

// Get user progress
export const getUserProgress = async (userId: string): Promise<UserProgress[]> => {
  // Check if test account (localStorage)
  if (typeof window !== 'undefined' && userId === 'test-user') {
    const progress = localStorage.getItem('codeAlpha_progress');
    if (progress) {
      const allProgress = JSON.parse(progress);
      return allProgress[userId] || [];
    }
    return [];
  }

  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching progress:', error);
    return [];
  }

  return data || [];
};

// Save user progress
export const saveUserProgress = async (userId: string, lessonId: string, score: number) => {
  // Check if test account (localStorage)
  if (typeof window !== 'undefined' && userId === 'test-user') {
    const allProgress = JSON.parse(localStorage.getItem('codeAlpha_progress') || '{}');
    const userProgress = allProgress[userId] || [];

    const existingIndex = userProgress.findIndex((p: UserProgress) => p.lessonId === lessonId);

    const newProgress: UserProgress = {
      id: existingIndex >= 0 ? userProgress[existingIndex].id : `progress-${Date.now()}`,
      userId,
      lessonId,
      isCompleted: score >= 50,
      score,
      updatedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      userProgress[existingIndex] = newProgress;
    } else {
      userProgress.push(newProgress);
    }

    allProgress[userId] = userProgress;
    localStorage.setItem('codeAlpha_progress', JSON.stringify(allProgress));

    return newProgress;
  }

  // Check if progress exists
  const { data: existing } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', userId)
    .eq('lesson_id', lessonId)
    .single();

  const progressData = {
    user_id: userId,
    lesson_id: lessonId,
    is_completed: score >= 50,
    score,
    updated_at: new Date().toISOString(),
  };

  if (existing) {
    const { data, error } = await supabase
      .from('progress')
      .update(progressData)
      .eq('id', existing.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating progress:', error);
      return null;
    }

    return data;
  } else {
    const { data, error } = await supabase
      .from('progress')
      .insert([progressData])
      .select()
      .single();

    if (error) {
      console.error('Error inserting progress:', error);
      return null;
    }

    return data;
  }
};

// Get lesson progress
export const getLessonProgress = async (userId: string, lessonId: string): Promise<UserProgress | null> => {
  const progress = await getUserProgress(userId);
  return progress.find(p => p.lessonId === lessonId) || null;
};

// Get completed lessons count for a course
export const getCompletedLessonsCount = async (userId: string, courseId: string, lessons: any[]): Promise<number> => {
  const progress = await getUserProgress(userId);
  const courseLessons = lessons.filter(l => l.courseId === courseId);
  return courseLessons.filter(lesson =>
    progress.some(p => p.lessonId === lesson.id && p.isCompleted)
  ).length;
};

// Get course progress percentage
export const getCourseProgress = async (userId: string, courseId: string, lessons: any[]): Promise<number> => {
  const courseLessons = lessons.filter(l => l.courseId === courseId);
  if (courseLessons.length === 0) return 0;

  const completed = await getCompletedLessonsCount(userId, courseId, lessons);
  return Math.round((completed / courseLessons.length) * 100);
};

// Get user badges
export const getUserBadges = async (userId: string): Promise<Badge[]> => {
  // Check if test account (localStorage)
  if (typeof window !== 'undefined' && userId === 'test-user') {
    const badges = localStorage.getItem('codeAlpha_badges');
    if (badges) {
      const allBadges = JSON.parse(badges);
      return allBadges[userId] || [];
    }
    return [];
  }

  const { data, error } = await supabase
    .from('badges')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching badges:', error);
    return [];
  }

  return data || [];
};

// Award badge
export const awardBadge = async (userId: string, badgeCode: string) => {
  const userBadges = await getUserBadges(userId);

  // Check if already earned
  if (userBadges.some(b => b.code === badgeCode)) {
    return null;
  }

  const badge = availableBadges.find(b => b.code === badgeCode);
  if (!badge) return null;

  const earnedBadge = {
    ...badge,
    earnedAt: new Date().toISOString(),
  };

  // Check if test account (localStorage)
  if (typeof window !== 'undefined' && userId === 'test-user') {
    const allBadges = JSON.parse(localStorage.getItem('codeAlpha_badges') || '{}');
    const userBadges = allBadges[userId] || [];
    userBadges.push(earnedBadge);
    allBadges[userId] = userBadges;
    localStorage.setItem('codeAlpha_badges', JSON.stringify(allBadges));
    return earnedBadge;
  }

  const { data, error } = await supabase
    .from('badges')
    .insert([{
      user_id: userId,
      code: badgeCode,
      title: badge.title,
      description: badge.description,
      icon: badge.icon,
      earned_at: earnedBadge.earnedAt,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error awarding badge:', error);
    return null;
  }

  return data;
};

// Check and award badges
export const checkAndAwardBadges = async (userId: string, lessonId: string) => {
  const progress = await getUserProgress(userId);
  const newBadges: Badge[] = [];

  // First step badge
  if (progress.length === 1) {
    const badge = await awardBadge(userId, 'first-step');
    if (badge) newBadges.push(badge);
  }

  // Hello World badge (completing level 1 lesson)
  if (lessonId.startsWith('lesson-1-')) {
    const level1Complete = progress.filter(p =>
      p.lessonId.startsWith('lesson-1-') && p.isCompleted
    ).length >= 2;

    if (level1Complete) {
      const badge = await awardBadge(userId, 'hello-world');
      if (badge) newBadges.push(badge);
    }
  }

  // Variable master badge
  if (lessonId.startsWith('lesson-2-')) {
    const level2Complete = progress.filter(p =>
      p.lessonId.startsWith('lesson-2-') && p.isCompleted
    ).length >= 3;

    if (level2Complete) {
      const badge = await awardBadge(userId, 'variable-master');
      if (badge) newBadges.push(badge);
    }
  }

  return newBadges;
};
