import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GradeReport } from "../types";

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    studentName: { type: Type.STRING, description: "Name of the student. If missing, '미기입'" },
    className: { type: Type.STRING, description: "Class name. If missing, '미기입'" },
    totalScore: { type: Type.NUMBER, description: "Sum of all scores" },
    averageScore: { type: Type.NUMBER, description: "Average of scores" },
    summaryComment: { type: Type.STRING, description: "Overall summary comment (2-3 sentences)" },
    subjectComparisons: { type: Type.STRING, description: "Brief comparison of highest/lowest subjects" },
    subjectEvaluations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          subject: { type: Type.STRING },
          score: { type: Type.NUMBER },
          comment: { type: Type.STRING, description: "Specific comment based on the score" }
        },
        required: ["subject", "score", "comment"]
      }
    },
    improvementPoints: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "2-3 actionable advice points for the student"
    },
    visualizationData: {
      type: Type.OBJECT,
      properties: {
        subjects: { type: Type.ARRAY, items: { type: Type.STRING } },
        scores: { type: Type.ARRAY, items: { type: Type.NUMBER } },
        average: { type: Type.NUMBER },
        radar_chart: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              subject: { type: Type.STRING },
              score: { type: Type.NUMBER },
              fullMark: { type: Type.NUMBER, description: "Always 100" }
            }
          }
        }
      }
    }
  },
  required: [
    "studentName", "className", "totalScore", "averageScore", 
    "summaryComment", "subjectComparisons", "subjectEvaluations", 
    "improvementPoints", "visualizationData"
  ]
};

export const analyzeGrades = async (inputText: string): Promise<GradeReport> => {
  // 앱이 로드될 때가 아니라, 분석 요청 시에 API Key를 확인하고 인스턴스를 생성합니다.
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key가 설정되지 않았습니다. Vercel 환경 변수(Environment Variables)에 'API_KEY'가 올바르게 등록되었는지 확인해주세요.");
  }

  const genAI = new GoogleGenAI({ apiKey });
  const modelId = "gemini-2.5-flash"; 
  
  const systemInstruction = `
    You are a professional educational consultant and data analyst. 
    Your role is to analyze raw student grade data provided by the user and generate a structured JSON report.
    
    1. Parse the input text which may contain Name, Class, and a list of Subject/Score pairs.
    2. If information is missing, use "미기입" for strings or 0 for numbers, but try to infer context.
    3. Generate a professional summary, detailed subject evaluations, and actionable learning advice.
    4. Provide data structures strictly formatted for visualization.
    5. Ensure the tone is professional, encouraging, and objective.
    6. All text output must be in Korean.
  `;

  try {
    const response = await genAI.models.generateContent({
      model: modelId,
      contents: [
        { role: 'user', parts: [{ text: `Analyze the following student data:\n${inputText}` }] }
      ],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.3,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated");
    }

    return JSON.parse(text) as GradeReport;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};