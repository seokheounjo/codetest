import { useState } from 'react';
import { Quiz } from '../types';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizViewProps {
  quizzes: Quiz[];
  onComplete: (score: number) => void;
}

export default function QuizView({ quizzes, onComplete }: QuizViewProps) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<{ quizId: string; correct: boolean }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const currentQuiz = quizzes[currentQuizIndex];
  
  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    const correctOption = currentQuiz.options?.find(opt => opt.isCorrect);
    const isCorrect = selectedAnswer === correctOption?.id;
    
    setAnswers([...answers, { quizId: currentQuiz.id, correct: isCorrect }]);
    setShowResult(true);
  };
  
  const handleNext = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Calculate score
      const correctCount = answers.filter(a => a.correct).length + (showResult && answers[answers.length - 1]?.correct ? 0 : 0);
      const score = Math.round((correctCount / quizzes.length) * 100);
      setIsCompleted(true);
      onComplete(score);
    }
  };
  
  const correctAnswer = currentQuiz.options?.find(opt => opt.isCorrect);
  const isCorrect = selectedAnswer === correctAnswer?.id;
  
  if (isCompleted) {
    const correctCount = answers.filter(a => a.correct).length;
    const score = Math.round((correctCount / quizzes.length) * 100);
    
    return (
      <div className="text-center py-12">
        <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${
          score >= 80 ? 'bg-green-100' : score >= 60 ? 'bg-yellow-100' : 'bg-red-100'
        }`}>
          <div className="text-4xl">
            {score >= 80 ? '🎉' : score >= 60 ? '😊' : '💪'}
          </div>
        </div>
        <h2 className="text-xl font-bold mb-3 text-gray-900">
          {score >= 80 ? '훌륭해요!' : score >= 60 ? '잘했어요!' : '다시 도전해봐요!'}
        </h2>
        <div className="text-2xl mb-2 text-blue-600 font-bold">
          {score}점
        </div>
        <div className="text-gray-600 mb-8 text-sm">
          {correctCount} / {quizzes.length} 정답
        </div>
        {score >= 90 && <div className="text-3xl mb-4">⭐⭐⭐</div>}
        {score >= 70 && score < 90 && <div className="text-3xl mb-4">⭐⭐</div>}
        {score >= 50 && score < 70 && <div className="text-3xl mb-4">⭐</div>}
        <div className="text-sm text-gray-500">
          이제 레슨을 완료할 수 있어요!
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">퀴즈</h2>
          <div className="text-sm text-gray-600 font-medium">
            {currentQuizIndex + 1} / {quizzes.length}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${((currentQuizIndex + 1) / quizzes.length) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Question */}
      <div className="mb-8">
        <h3 className="text-base font-medium mb-6 text-gray-900 leading-relaxed">
          {currentQuiz.questionText}
        </h3>
        
        {/* Options */}
        <div className="space-y-3">
          {currentQuiz.options?.map((option) => {
            const isSelected = selectedAnswer === option.id;
            const showCorrect = showResult && option.isCorrect;
            const showWrong = showResult && isSelected && !option.isCorrect;
            
            return (
              <button
                key={option.id}
                onClick={() => !showResult && setSelectedAnswer(option.id)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all text-sm ${
                  showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showWrong
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    showCorrect
                      ? 'border-green-500 bg-green-500'
                      : showWrong
                      ? 'border-red-500 bg-red-500'
                      : isSelected
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {showCorrect && <CheckCircle className="w-3 h-3 text-white" />}
                    {showWrong && <XCircle className="w-3 h-3 text-white" />}
                    {!showResult && isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <span className={`leading-relaxed ${
                    showCorrect || showWrong
                      ? showCorrect ? 'text-green-900 font-medium' : 'text-red-900 font-medium'
                      : isSelected
                      ? 'text-blue-900 font-medium'
                      : 'text-gray-700'
                  }`}>
                    {option.optionText}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Explanation */}
      {showResult && (
        <div className={`mb-6 p-4 rounded-xl border ${
          isCorrect
            ? 'bg-green-50 border-green-200'
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-start gap-3">
            <div className="text-xl flex-shrink-0">
              {isCorrect ? '✓' : '💡'}
            </div>
            <div>
              <div className={`mb-1 font-medium text-sm ${
                isCorrect ? 'text-green-900' : 'text-blue-900'
              }`}>
                {isCorrect ? '정답이에요!' : '아쉬워요!'}
              </div>
              <div className="text-sm text-gray-700 leading-relaxed">
                {currentQuiz.explanation}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Buttons */}
      <div className="flex justify-end gap-3">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className={`px-6 py-2.5 rounded-xl transition-all font-medium text-sm ${
              selectedAnswer
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            정답 확인
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium text-sm"
          >
            {currentQuizIndex < quizzes.length - 1 ? '다음 문제' : '결과 보기'}
          </button>
        )}
      </div>
    </div>
  );
}
