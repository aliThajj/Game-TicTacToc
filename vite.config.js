// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// });
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom'] // Explicitly include dependencies
  },
  base: '/Game-TicTacToc/',
  // server: {
  //   port: 5173,
  //   host: true,
  // }
})
