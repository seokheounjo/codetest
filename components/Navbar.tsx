import { User } from '../types';
import { LogOut, BookOpen, GraduationCap } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export default function Navbar({ user, onNavigate, onLogout }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <button 
            onClick={() => onNavigate(user ? 'dashboard' : 'landing')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">CA</span>
            </div>
            <span className="font-bold text-lg text-gray-900">코드알파</span>
          </button>
          
          {/* Menu */}
          {user && (
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => onNavigate('courses')}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all flex items-center gap-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>코스</span>
              </button>
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all flex items-center gap-1.5"
              >
                <GraduationCap className="w-4 h-4" />
                <span>학습</span>
              </button>
            </div>
          )}
          
          {/* User section */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
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
                  onClick={onLogout}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="로그아웃"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate('login')}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 rounded-lg transition-colors"
                >
                  로그인
                </button>
                <button
                  onClick={() => onNavigate('signup')}
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  회원가입
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
