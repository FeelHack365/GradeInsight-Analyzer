import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 브라우저 환경에서 process is not defined 에러 방지 (Vercel 배포 시 필수)
if (typeof window !== 'undefined' && !(window as any).process) {
  (window as any).process = { env: {} };
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);