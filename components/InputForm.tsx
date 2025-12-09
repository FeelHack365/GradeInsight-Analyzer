import React, { useState } from 'react';
import { Loader2, Wand2 } from 'lucide-react';

interface InputFormProps {
  onSubmit: (input: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
    }
  };

  const handleSample = () => {
    setInput(`이름: 김하늘
반: 3학년 2반
국어 87
영어 92
수학 78
과학 90
사회 85
역사 95`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-4">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <label htmlFor="grades" className="block text-lg font-semibold text-gray-800">
            성적 데이터 입력
          </label>
          <button
            type="button"
            onClick={handleSample}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            예시 입력 채우기
          </button>
        </div>
        <textarea
          id="grades"
          className="w-full h-64 p-4 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50 placeholder-gray-400 text-base leading-relaxed"
          placeholder={`이름: 홍길동\n반: 1-1\n국어 80\n수학 90\n...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
        />
        <p className="mt-2 text-sm text-gray-500">
          * 자유로운 형식으로 이름, 반, 과목별 점수를 입력해주세요.
        </p>
      </div>

      <div className="sticky bottom-6 z-10">
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={`w-full py-4 px-6 rounded-xl shadow-lg flex items-center justify-center space-x-2 text-white font-bold text-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] ${
            isLoading || !input.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin w-6 h-6" />
              <span>분석 중...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-6 h-6" />
              <span>보고서 생성하기</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default InputForm;