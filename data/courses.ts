import { Course, Lesson, LessonCode } from '../types';

export const courses: Course[] = [
  {
    id: 'level-0',
    title: 'Level 0. 코딩 알파벳 준비',
    description: '코딩이 무엇이고, 왜 배우는지 이해해요',
    orderIndex: 0,
    levelNumber: 0,
    icon: '🎯',
    totalLessons: 3,
    color: '#f59e0b',
  },
  {
    id: 'level-1',
    title: 'Level 1. 첫 문장: 출력하기',
    description: '화면에 글자를 출력할 수 있어요',
    orderIndex: 1,
    levelNumber: 1,
    icon: '💬',
    totalLessons: 4,
    color: '#3182f6',
  },
  {
    id: 'level-2',
    title: 'Level 2. 변수: 이름 붙인 상자',
    description: '데이터를 저장하고 가져올 수 있어요',
    orderIndex: 2,
    levelNumber: 2,
    icon: '📦',
    totalLessons: 5,
    color: '#10b981',
  },
  {
    id: 'level-3',
    title: 'Level 3. 조건문: 만약 ~라면',
    description: '상황에 따라 다른 행동을 하게 만들 수 있어요',
    orderIndex: 3,
    levelNumber: 3,
    icon: '🔀',
    totalLessons: 5,
    color: '#8b5cf6',
  },
  {
    id: 'level-4',
    title: 'Level 4. 반복문: 계속하기',
    description: '반복되는 일을 코드로 줄일 수 있어요',
    orderIndex: 4,
    levelNumber: 4,
    icon: '🔄',
    totalLessons: 5,
    color: '#ec4899',
  },
  {
    id: 'level-5',
    title: 'Level 5. 함수: 나만의 도구 만들기',
    description: '기능을 묶어 재사용할 수 있어요',
    orderIndex: 5,
    levelNumber: 5,
    icon: '🛠️',
    totalLessons: 6,
    color: '#f97316',
  },
  {
    id: 'level-6',
    title: 'Level 6. 미니 프로젝트',
    description: '배운 것을 종합해 작은 프로그램을 완성해요',
    orderIndex: 6,
    levelNumber: 6,
    icon: '🎮',
    totalLessons: 3,
    color: '#06b6d4',
  },
];

export const lessons: Lesson[] = [
  // Level 0 Lessons
  {
    id: 'lesson-0-1',
    courseId: 'level-0',
    title: '코딩이란 무엇일까요?',
    content: '컴퓨터에게 명령을 내리는 방법을 배워봐요',
    orderIndex: 0,
    lessonType: 'concept',
    conceptText: `컴퓨터는 사람의 말을 바로 이해하지 못해요. 
    
그래서 우리는 컴퓨터가 알아듣는 특별한 언어로 명령을 내려야 해요. 이것을 **코딩(프로그래밍)**이라고 불러요.

마치 외국 친구와 이야기할 때 그 나라 언어를 배워야 하는 것처럼, 컴퓨터와 대화하려면 컴퓨터 언어를 배워야 해요.

오늘부터 우리는 C, Java, JavaScript라는 세 가지 언어를 함께 배울 거예요!`,
    conceptImage: '🖥️',
  },
  {
    id: 'lesson-0-2',
    courseId: 'level-0',
    title: '명령을 순서대로 내리기',
    content: '컴퓨터는 명령을 순서대로 실행해요',
    orderIndex: 1,
    lessonType: 'concept',
    conceptText: `컴퓨터는 여러분이 내린 명령을 **위에서 아래로, 순서대로** 실행해요.

예를 들어:
1. 문 열기
2. 밖으로 나가기
3. 문 닫기

이 순서를 바꾸면 안 되겠죠? 문을 열지 않고 밖으로 나갈 수는 없으니까요.

코딩도 마찬가지예요. 명령의 순서가 정말 중요해요!`,
    conceptImage: '📝',
  },
  {
    id: 'lesson-0-3',
    courseId: 'level-0',
    title: '세 가지 언어를 동시에 배우는 이유',
    content: '다른 언어지만 같은 개념을 배워요',
    orderIndex: 2,
    lessonType: 'concept',
    conceptText: `C, Java, JavaScript는 문법은 조금씩 다르지만, **핵심 개념은 같아요**.

한국어로 "안녕하세요"
영어로 "Hello"
중국어로 "你好"

말은 다르지만 모두 "인사"라는 같은 의미죠?

코딩 언어도 마찬가지예요. 표현 방법은 다르지만 변수, 조건문, 반복문 같은 핵심 개념은 똑같아요.

세 가지 언어를 함께 배우면, **어떤 언어든 쉽게 배울 수 있는 힘**이 생겨요!`,
    conceptImage: '🌍',
  },
  
  // Level 1 Lessons
  {
    id: 'lesson-1-1',
    courseId: 'level-1',
    title: '화면에 인사하기',
    content: '첫 번째 프로그램을 만들어봐요',
    orderIndex: 0,
    lessonType: 'code',
    conceptText: `프로그래밍의 첫 걸음은 화면에 글자를 출력하는 거예요.

"안녕하세요!"라고 화면에 인사해 볼까요?

각 언어마다 출력하는 방법이 조금씩 달라요. 아래 탭을 눌러서 비교해 보세요!`,
  },
  {
    id: 'lesson-1-2',
    courseId: 'level-1',
    title: '출력 명령어 이해하기',
    content: '각 언어의 출력 방법을 자세히 알아봐요',
    orderIndex: 1,
    lessonType: 'concept',
    conceptText: `**C 언어**: printf("내용");
- "print formatted"의 줄임말이에요
- 세미콜론(;)으로 명령이 끝났다고 알려줘요

**Java**: System.out.println("내용");
- System: 시스템에게
- out: 밖으로
- println: 한 줄 출력해줘!

**JavaScript**: console.log("내용");
- console: 콘솔(개발자 도구)에
- log: 기록해줘!

문법은 다르지만 모두 **"화면에 글자를 보여줘!"**라는 같은 의미예요.`,
  },
  {
    id: 'lesson-1-3',
    courseId: 'level-1',
    title: '퀴즈: 출력 명령어',
    content: '배운 내용을 확인해봐요',
    orderIndex: 2,
    lessonType: 'quiz',
    quizzes: [
      {
        id: 'quiz-1-1',
        lessonId: 'lesson-1-3',
        questionText: 'C 언어에서 화면에 글자를 출력하는 명령어는 무엇일까요?',
        quizType: 'multiple-choice',
        options: [
          { id: 'opt-1-1-1', quizId: 'quiz-1-1', optionText: 'print()', isCorrect: false },
          { id: 'opt-1-1-2', quizId: 'quiz-1-1', optionText: 'printf()', isCorrect: true },
          { id: 'opt-1-1-3', quizId: 'quiz-1-1', optionText: 'console.log()', isCorrect: false },
          { id: 'opt-1-1-4', quizId: 'quiz-1-1', optionText: 'System.out.println()', isCorrect: false },
        ],
        explanation: 'C 언어는 printf()를 사용해서 출력해요!',
      },
      {
        id: 'quiz-1-2',
        lessonId: 'lesson-1-3',
        questionText: 'JavaScript에서 화면에 글자를 출력하는 명령어는?',
        quizType: 'multiple-choice',
        options: [
          { id: 'opt-1-2-1', quizId: 'quiz-1-2', optionText: 'printf()', isCorrect: false },
          { id: 'opt-1-2-2', quizId: 'quiz-1-2', optionText: 'System.out.println()', isCorrect: false },
          { id: 'opt-1-2-3', quizId: 'quiz-1-2', optionText: 'console.log()', isCorrect: true },
          { id: 'opt-1-2-4', quizId: 'quiz-1-2', optionText: 'echo()', isCorrect: false },
        ],
        explanation: 'JavaScript는 console.log()를 사용해요!',
      },
    ],
  },
  {
    id: 'lesson-1-4',
    courseId: 'level-1',
    title: '실습: 나만의 인사 출력하기',
    content: '직접 코드를 작성해봐요',
    orderIndex: 3,
    lessonType: 'practice',
    practiceDescription: '여러분의 이름으로 인사하는 프로그램을 만들어 보세요!\n\n예시: "안녕하세요, 저는 민지예요!"',
    practiceStarterCode: {
      c: `#include <stdio.h>

int main() {
    // 여기에 printf를 사용해서 인사를 출력해보세요
    
    return 0;
}`,
      java: `public class Main {
    public static void main(String[] args) {
        // 여기에 System.out.println을 사용해서 인사를 출력해보세요
        
    }
}`,
      javascript: `// 여기에 console.log를 사용해서 인사를 출력해보세요
`,
    },
    expectedOutput: '안녕하세요',
  },
  
  // Level 2 Lessons
  {
    id: 'lesson-2-1',
    courseId: 'level-2',
    title: '변수는 이름 붙인 상자',
    content: '데이터를 저장하는 방법을 배워요',
    orderIndex: 0,
    lessonType: 'concept',
    conceptText: `변수는 **이름표가 붙은 상자**와 같아요.

상자 안에 물건을 넣어두고, 나중에 이름표를 보고 꺼내 쓸 수 있죠?

프로그래밍에서도:
- 상자 = 변수
- 이름표 = 변수 이름
- 물건 = 데이터(숫자, 글자 등)

예를 들어:
- "나이"라는 이름의 상자에 "10"을 넣어두기
- "이름"이라는 상자에 "철수"를 넣어두기

나중에 필요할 때 상자 이름으로 꺼내 쓸 수 있어요!`,
    conceptImage: '📦',
  },
  {
    id: 'lesson-2-2',
    courseId: 'level-2',
    title: '변수 만들고 사용하기',
    content: '각 언어에서 변수를 선언하는 방법',
    orderIndex: 1,
    lessonType: 'code',
    conceptText: `변수를 만들 때는 두 가지를 정해야 해요:
1. 변수 이름 (무엇을 담을지)
2. 변수 타입 (어떤 종류의 데이터인지)

각 언어마다 변수를 만드는 방법을 비교해볼까요?`,
  },
  {
    id: 'lesson-2-3',
    courseId: 'level-2',
    title: '자료형 이해하기',
    content: '숫자와 글자를 구분해요',
    orderIndex: 2,
    lessonType: 'concept',
    conceptText: `데이터에는 여러 종류가 있어요:

**숫자형**
- 정수: 1, 10, 100 (소수점 없는 숫자)
- 실수: 3.14, 2.5 (소수점 있는 숫자)

**문자열**
- "안녕하세요", "코드알파" (글자들의 모음)

C와 Java는 변수를 만들 때 타입을 꼭 정해줘야 해요.
JavaScript는 자동으로 알아서 정해줘요!`,
  },
  {
    id: 'lesson-2-4',
    courseId: 'level-2',
    title: '퀴즈: 변수와 자료형',
    content: '변수에 대해 얼마나 이해했는지 확인해요',
    orderIndex: 3,
    lessonType: 'quiz',
    quizzes: [
      {
        id: 'quiz-2-1',
        lessonId: 'lesson-2-4',
        questionText: '변수는 무엇에 비유할 수 있을까요?',
        quizType: 'multiple-choice',
        options: [
          { id: 'opt-2-1-1', quizId: 'quiz-2-1', optionText: '이름표가 붙은 상자', isCorrect: true },
          { id: 'opt-2-1-2', quizId: 'quiz-2-1', optionText: '계산기', isCorrect: false },
          { id: 'opt-2-1-3', quizId: 'quiz-2-1', optionText: '책', isCorrect: false },
          { id: 'opt-2-1-4', quizId: 'quiz-2-1', optionText: '연필', isCorrect: false },
        ],
        explanation: '변수는 데이터를 저장하는 이름 붙인 상자예요!',
      },
      {
        id: 'quiz-2-2',
        lessonId: 'lesson-2-4',
        questionText: '"안녕하세요"는 어떤 자료형일까요?',
        quizType: 'multiple-choice',
        options: [
          { id: 'opt-2-2-1', quizId: 'quiz-2-2', optionText: '정수', isCorrect: false },
          { id: 'opt-2-2-2', quizId: 'quiz-2-2', optionText: '실수', isCorrect: false },
          { id: 'opt-2-2-3', quizId: 'quiz-2-2', optionText: '문자열', isCorrect: true },
          { id: 'opt-2-2-4', quizId: 'quiz-2-2', optionText: '논리값', isCorrect: false },
        ],
        explanation: '글자들의 모음은 문자열이에요!',
      },
    ],
  },
  {
    id: 'lesson-2-5',
    courseId: 'level-2',
    title: '실습: 변수 만들고 출력하기',
    content: '직접 변수를 만들어봐요',
    orderIndex: 4,
    lessonType: 'practice',
    practiceDescription: '여러분의 나이를 변수에 저장하고 출력해보세요!\n\n1. "age"라는 이름의 변수 만들기\n2. 자신의 나이를 저장하기\n3. 변수를 출력하기',
    practiceStarterCode: {
      c: `#include <stdio.h>

int main() {
    // 여기에 int 타입의 age 변수를 만들고 값을 저장하세요
    
    // printf를 사용해서 age를 출력하세요
    // 힌트: printf("%d", age);
    
    return 0;
}`,
      java: `public class Main {
    public static void main(String[] args) {
        // 여기에 int 타입의 age 변수를 만들고 값을 저장하세요
        
        // System.out.println을 사용해서 age를 출력하세요
        
    }
}`,
      javascript: `// 여기에 let을 사용해서 age 변수를 만들고 값을 저장하세요

// console.log를 사용해서 age를 출력하세요
`,
    },
    expectedOutput: '10',
  },
];

export const lessonCodes: LessonCode[] = [
  // Lesson 1-1 codes
  {
    id: 'code-1-1-c',
    lessonId: 'lesson-1-1',
    language: 'c',
    codeExample: `#include <stdio.h>

int main() {
    printf("안녕하세요!\\n");
    return 0;
}`,
    explanation: 'C 언어에서는 stdio.h 라이브러리를 포함하고, main 함수 안에서 printf를 사용해요. \\n은 줄바꿈을 의미해요.',
  },
  {
    id: 'code-1-1-java',
    lessonId: 'lesson-1-1',
    language: 'java',
    codeExample: `public class Main {
    public static void main(String[] args) {
        System.out.println("안녕하세요!");
    }
}`,
    explanation: 'Java에서는 클래스를 만들고, main 메서드 안에서 System.out.println을 사용해요. println은 자동으로 줄바꿈이 돼요.',
  },
  {
    id: 'code-1-1-js',
    lessonId: 'lesson-1-1',
    language: 'javascript',
    codeExample: `console.log("안녕하세요!");`,
    explanation: 'JavaScript는 가장 간단해요! console.log만 쓰면 바로 출력돼요.',
  },
  
  // Lesson 2-2 codes
  {
    id: 'code-2-2-c',
    lessonId: 'lesson-2-2',
    language: 'c',
    codeExample: `#include <stdio.h>

int main() {
    int age = 10;
    char name[] = "철수";
    
    printf("이름: %s\\n", name);
    printf("나이: %d\\n", age);
    
    return 0;
}`,
    explanation: 'C에서는 int(정수), char[](문자열) 같은 타입을 명시해야 해요. %d는 정수, %s는 문자열을 출력할 때 사용해요.',
  },
  {
    id: 'code-2-2-java',
    lessonId: 'lesson-2-2',
    language: 'java',
    codeExample: `public class Main {
    public static void main(String[] args) {
        int age = 10;
        String name = "철수";
        
        System.out.println("이름: " + name);
        System.out.println("나이: " + age);
    }
}`,
    explanation: 'Java에서는 int, String 같은 타입을 사용해요. +를 사용해서 문자열을 연결할 수 있어요.',
  },
  {
    id: 'code-2-2-js',
    lessonId: 'lesson-2-2',
    language: 'javascript',
    codeExample: `let age = 10;
let name = "철수";

console.log("이름: " + name);
console.log("나이: " + age);`,
    explanation: 'JavaScript는 let이나 const로 변수를 만들어요. 타입을 자동으로 알아서 정해줘요!',
  },
];
