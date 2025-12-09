import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 1. 현재 작업 디렉토리에서 환경 변수 로드 (.env 파일 등)
  const env = loadEnv(mode, process.cwd(), '');
  
  // 2. Vercel 환경(process.env) 또는 로컬 환경(env)에서 API_KEY 찾기
  // Vercel 배포 시 process.env.API_KEY가 우선될 수 있습니다.
  const apiKey = process.env.API_KEY || env.API_KEY;

  // 빌드 로그에 키 감지 여부 출력 (보안을 위해 키 값 자체는 출력하지 않음)
  if (mode === 'production') {
    if (apiKey) {
      console.log('✅ Build: API_KEY detected successfully.');
    } else {
      console.warn('⚠️ Build Warning: API_KEY is missing in the environment variables!');
    }
  }

  return {
    plugins: [react()],
    define: {
      // 코드 내의 process.env.API_KEY를 실제 값으로 치환 (Stringify 필수)
      'process.env.API_KEY': JSON.stringify(apiKey),
    },
  };
});