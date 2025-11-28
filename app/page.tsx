'use client';

import { Sparkles, Code2, Zap, Trophy, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { loginWithTestAccount } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Landing() {
  const router = useRouter();

  const handleTestLogin = () => {
    loginWithTestAccount();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full mb-6 text-sm font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>초등학생을 위한 코딩 학습</span>
        </div>

        <h1 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          알파벳 배우듯이,<br />코딩 언어를 배워요
        </h1>

        <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto leading-relaxed">
          C, Java, JavaScript를 놀이처럼 배우는<br />
          초등학생 맞춤 코딩 학습 플랫폼
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <button
            onClick={handleTestLogin}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center gap-2 group font-medium"
          >
            <Zap className="w-4 h-4" />
            <span>체험해 보기</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <Link
            href="/signup"
            className="w-full sm:w-auto px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-50 transition-all font-medium text-center"
          >
            회원가입하기
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
            <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
              <Code2 className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="mb-2 text-gray-900">세 가지 언어 비교</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              C, Java, JavaScript를 나란히 비교하며 배워요. 문법은 다르지만 개념은 같다는 걸 이해하게 돼요.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all">
            <div className="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="mb-2 text-gray-900">단계별 학습</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Level 0부터 6까지 차근차근. 알파벳 배우듯이 기초부터 프로젝트까지 완성해요.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all">
            <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center mb-3">
              <Trophy className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="mb-2 text-gray-900">재미있는 학습</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              퀴즈, 실습, 배지 시스템으로 게임처럼 즐겁게 배워요. 성취감을 느끼며 성장해요.
            </p>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="max-w-5xl mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-center mb-10 text-gray-900">이렇게 배워요</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { level: 0, title: '코딩 알파벳 준비', icon: '🎯', color: 'from-orange-400 to-orange-500' },
            { level: 1, title: '첫 문장: 출력하기', icon: '💬', color: 'from-blue-400 to-blue-500' },
            { level: 2, title: '변수: 이름 붙인 상자', icon: '📦', color: 'from-green-400 to-green-500' },
            { level: 3, title: '조건문: 만약 ~라면', icon: '🔀', color: 'from-purple-400 to-purple-500' },
          ].map((item) => (
            <div key={item.level} className="bg-white p-5 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all">
              <div className={`w-11 h-11 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-2xl mb-3`}>
                {item.icon}
              </div>
              <div className="text-xs text-gray-500 mb-1 font-medium">Level {item.level}</div>
              <div className="text-sm text-gray-900 font-medium leading-snug">{item.title}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          Level 4, 5, 6까지 계속돼요!
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-10 text-center text-white">
          <h2 className="mb-3 text-white">지금 바로 시작해보세요</h2>
          <p className="text-lg mb-8 opacity-90">
            회원가입 없이도 바로 체험할 수 있어요
          </p>
          <button
            onClick={handleTestLogin}
            className="px-8 py-3 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all shadow-lg inline-flex items-center gap-2 group font-medium"
          >
            <span>지금 체험하기</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
}
