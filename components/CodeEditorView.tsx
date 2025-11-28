import { useState } from 'react';
import { Play, CheckCircle, Code2 } from 'lucide-react';
import { LanguageType } from '../types';

interface CodeEditorViewProps {
  description: string;
  starterCode: {
    c: string;
    java: string;
    javascript: string;
  };
  expectedOutput?: string;
  onComplete: () => void;
}

export default function CodeEditorView({ description, starterCode, expectedOutput, onComplete }: CodeEditorViewProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>('javascript');
  const [code, setCode] = useState(starterCode.javascript);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  
  const handleLanguageChange = (lang: LanguageType) => {
    setSelectedLanguage(lang);
    setCode(starterCode[lang]);
    setOutput('');
    setHasRun(false);
  };
  
  const getLanguageColor = (lang: LanguageType) => {
    switch (lang) {
      case 'c': return '#00599c';
      case 'java': return '#f89820';
      case 'javascript': return '#f0db4f';
    }
  };
  
  const getLanguageName = (lang: LanguageType) => {
    switch (lang) {
      case 'c': return 'C';
      case 'java': return 'Java';
      case 'javascript': return 'JavaScript';
    }
  };
  
  const runCode = () => {
    setIsRunning(true);
    setOutput('');
    
    // Simulate code execution
    setTimeout(() => {
      if (selectedLanguage === 'javascript') {
        try {
          // Create a simple console.log capture
          let consoleOutput = '';
          const mockConsole = {
            log: (...args: any[]) => {
              consoleOutput += args.join(' ') + '\n';
            }
          };
          
          // Very basic eval - in real app, you'd use a proper sandbox
          const func = new Function('console', code);
          func(mockConsole);
          
          setOutput(consoleOutput || '(출력 없음)');
          setHasRun(true);
        } catch (error: any) {
          setOutput(`❌ 오류가 발생했어요:\n${error.message}\n\n힌트: 코드를 다시 한 번 확인해보세요!`);
        }
      } else {
        // For C and Java, show mock output
        setOutput(`💡 ${getLanguageName(selectedLanguage)} 코드는 브라우저에서 직접 실행할 수 없어요.\n\n작성한 코드를 확인하고 완료 버튼을 눌러주세요!\n\n실제 개발 환경에서는 컴파일러를 사용해서 실행할 수 있어요.`);
        setHasRun(true);
      }
      setIsRunning(false);
    }, 500);
  };
  
  const handleComplete = () => {
    onComplete();
  };
  
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-900">실습하기</h2>
      
      {/* Description */}
      <div className="mb-5 p-4 bg-blue-50 border border-blue-100 rounded-xl">
        <div className="flex items-start gap-3">
          <Code2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900 leading-relaxed whitespace-pre-line">
            {description}
          </div>
        </div>
      </div>
      
      {/* Language Tabs */}
      <div className="flex gap-1 mb-4 border-b border-gray-200">
        {(['c', 'java', 'javascript'] as const).map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`px-4 py-2 text-sm font-medium transition-all relative ${
              selectedLanguage === lang
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
      
      {/* Code Editor */}
      <div className="mb-4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-4 bg-gray-900 text-gray-100 rounded-xl font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
          spellCheck={false}
        />
      </div>
      
      {/* Run Button */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={runCode}
          disabled={isRunning}
          className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed font-medium text-sm"
        >
          <Play className="w-4 h-4" />
          <span>{isRunning ? '실행 중...' : '코드 실행'}</span>
        </button>
        
        {hasRun && (
          <button
            onClick={handleComplete}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium text-sm"
          >
            <CheckCircle className="w-4 h-4" />
            <span>실습 완료</span>
          </button>
        )}
      </div>
      
      {/* Output */}
      {output && (
        <div>
          <div className="text-sm text-gray-600 mb-2 font-medium">실행 결과:</div>
          <div className="bg-gray-900 rounded-xl p-4">
            <pre className="text-sm text-gray-100 whitespace-pre-wrap font-mono leading-relaxed">
              {output}
            </pre>
          </div>
          
          {expectedOutput && selectedLanguage === 'javascript' && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-xl">
              <div className="text-sm text-yellow-900">
                <div className="mb-1 font-medium">💡 예상 출력:</div>
                <code className="text-xs bg-yellow-100 px-2 py-1 rounded font-mono">
                  {expectedOutput}
                </code>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Hints */}
      <div className="mt-6 p-4 bg-purple-50 border border-purple-100 rounded-xl">
        <div className="text-sm text-purple-900">
          <div className="mb-2 font-medium">✨ 도움말:</div>
          <ul className="space-y-1 text-xs ml-4 leading-relaxed">
            <li>• 주석(//)을 읽고 그 아래에 코드를 작성해보세요</li>
            <li>• 세미콜론(;)을 빼먹지 않았는지 확인하세요</li>
            <li>• 괄호()와 중괄호가 제대로 닫혔는지 확인하세요</li>
            <li>• 큰따옴표("")나 작은따옴표('')를 잘 사용했는지 확인하세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
