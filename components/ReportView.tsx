import React from 'react';
import { GradeReport } from '../types';
import { GradeBarChart, GradeRadarChart } from './Charts';
import { User, CheckCircle2, TrendingUp, BookOpen, GraduationCap } from 'lucide-react';

interface ReportViewProps {
  report: GradeReport;
  onReset: () => void;
}

const ReportView: React.FC<ReportViewProps> = ({ report, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header Info */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{report.studentName} 학생</h1>
            <p className="text-gray-500 font-medium">{report.className}</p>
          </div>
        </div>
        <div className="flex space-x-8 text-center">
            <div>
                <p className="text-sm text-gray-400 uppercase font-semibold tracking-wider">총점</p>
                <p className="text-3xl font-bold text-gray-800">{report.totalScore}</p>
            </div>
            <div>
                <p className="text-sm text-gray-400 uppercase font-semibold tracking-wider">평균</p>
                <div className={`text-3xl font-bold ${report.averageScore >= 90 ? 'text-blue-600' : report.averageScore >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {report.averageScore}
                </div>
            </div>
        </div>
      </div>

      {/* Summary Section */}
      <section>
        <div className="flex items-center space-x-2 mb-3">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">1. 성적표 요약</h2>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="mb-4 pb-4 border-b border-gray-100">
             <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full mb-2">종합 의견</span>
             <p className="text-gray-700 leading-relaxed">{report.summaryComment}</p>
          </div>
          <div>
             <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full mb-2">과목 비교</span>
             <p className="text-gray-600 text-sm">{report.subjectComparisons}</p>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section>
         <div className="flex items-center space-x-2 mb-3">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">2. 시각화 분석</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GradeBarChart data={report.visualizationData} />
            <GradeRadarChart data={report.visualizationData} />
        </div>
      </section>

      {/* Subject Evaluation */}
      <section>
        <div className="flex items-center space-x-2 mb-3">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">3. 과목별 평가</h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {report.subjectEvaluations.map((subject, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between hover:border-blue-300 transition-colors">
              <div className="flex items-center md:w-1/4 mb-2 md:mb-0">
                <div className="w-2 h-10 bg-blue-500 rounded-full mr-3"></div>
                <div>
                    <h3 className="font-bold text-lg text-gray-800">{subject.subject}</h3>
                    <span className={`text-sm font-semibold ${subject.score >= 90 ? 'text-blue-600' : 'text-gray-500'}`}>{subject.score}점</span>
                </div>
              </div>
              <div className="md:w-3/4 border-t md:border-t-0 md:border-l border-gray-100 pt-2 md:pt-0 md:pl-6">
                <p className="text-gray-600 text-sm leading-relaxed">{subject.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Improvement Points */}
      <section>
        <div className="flex items-center space-x-2 mb-3">
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-800">4. 학습 개선 포인트</h2>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
          <ul className="space-y-4">
            {report.improvementPoints.map((point, idx) => (
              <li key={idx} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mt-0.5 mr-3">
                  {idx + 1}
                </span>
                <p className="text-gray-800 font-medium">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reset Button */}
      <div className="flex justify-center pt-8">
        <button
          onClick={onReset}
          className="px-8 py-3 text-gray-600 bg-white border border-gray-300 font-semibold rounded-full hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-sm"
        >
          새로운 분석 하기
        </button>
      </div>
    </div>
  );
};

export default ReportView;