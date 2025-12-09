import React, { useState } from 'react';
import { GradeReport, LoadingState } from './types';
import { analyzeGrades } from './services/geminiService';
import InputForm from './components/InputForm';
import ReportView from './components/ReportView';
import { AlertCircle, GraduationCap } from 'lucide-react';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>({ status: 'idle' });
  const [report, setReport] = useState<GradeReport | null>(null);

  const handleGenerateReport = async (input: string) => {
    setLoadingState({ status: 'loading' });
    try {
      const result = await analyzeGrades(input);
      setReport(result);
      setLoadingState({ status: 'success' });
    } catch (error) {
      console.error(error);
      setLoadingState({ 
        status: 'error', 
        message: '보고서를 생성하는 중 오류가 발생했습니다. 입력을 확인하거나 잠시 후 다시 시도해주세요.' 
      });
    }
  };

  const handleReset = () => {
    setReport(null);
    setLoadingState({ status: 'idle' });
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-gray-900 font-sans selection:bg-blue-100">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <GraduationCap size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            GradeInsight <span className="text-blue-600">Analyzer</span>
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {loadingState.status === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center text-red-700">
            <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
            <p>{loadingState.message}</p>
          </div>
        )}

        {report ? (
          <ReportView report={report} onReset={handleReset} />
        ) : (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                학생 성적 데이터를 <br/>
                <span className="text-blue-600">전문적인 인사이트</span>로 변환하세요
              </h1>
              <p className="text-gray-500 text-lg">
                성적표 텍스트만 입력하면 AI가 분석하여 요약, 평가, 시각화 차트가 포함된 리포트를 즉시 생성합니다.
              </p>
            </div>
            <InputForm 
              onSubmit={handleGenerateReport} 
              isLoading={loadingState.status === 'loading'} 
            />
          </div>
        )}
      </main>

      <footer className="py-8 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} GradeInsight Analyzer. Powered by Google Gemini.
      </footer>
    </div>
  );
};

export default App;