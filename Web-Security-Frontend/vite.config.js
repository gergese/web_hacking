import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // '0.0.0.0'과 동일하게 동작 (외부 접속 허용)
    port: 5173,  // 원하는 포트 설정 (기본값: 5173)
  },
})