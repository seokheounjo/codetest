import { supabase } from './supabase';
import { User } from '@/types';

export const TEST_ACCOUNT: User = {
  id: 'test-user',
  email: 'test@codealpha.com',
  name: '체험 학습자',
  userType: 'student',
  level: 1,
  exp: 0,
  createdAt: new Date().toISOString(),
  isTestAccount: true,
};

// Get current user from Supabase session
export const getCurrentUser = async (): Promise<User | null> => {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    // Check localStorage for test account
    if (typeof window !== 'undefined') {
      const testUser = localStorage.getItem('codeAlpha_testUser');
      if (testUser) {
        return JSON.parse(testUser);
      }
    }
    return null;
  }

  // Fetch user data from database
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
};

// Login with email and password
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  // Fetch user data
  const user = await getCurrentUser();

  return { success: true, user };
};

// Sign up with email, password, and additional info
export const signup = async (
  email: string,
  password: string,
  name: string,
  userType: 'student' | 'parent' | 'teacher'
) => {
  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    return { success: false, error: authError.message };
  }

  if (!authData.user) {
    return { success: false, error: '회원가입에 실패했습니다.' };
  }

  // Create user profile
  const newUser: User = {
    id: authData.user.id,
    email,
    name,
    userType,
    level: 1,
    exp: 0,
    createdAt: new Date().toISOString(),
  };

  const { error: profileError } = await supabase
    .from('users')
    .insert([newUser]);

  if (profileError) {
    return { success: false, error: profileError.message };
  }

  return { success: true, user: newUser };
};

// Logout
export const logout = async () => {
  // Clear test account from localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('codeAlpha_testUser');
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
};

// Login with test account (localStorage only)
export const loginWithTestAccount = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('codeAlpha_testUser', JSON.stringify(TEST_ACCOUNT));
  }
  return TEST_ACCOUNT;
};
