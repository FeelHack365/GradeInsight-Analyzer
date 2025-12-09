import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Vercel의 환경 변수(API_KEY)를 코드 내의 process.env.API_KEY로 치환해줍니다.
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});