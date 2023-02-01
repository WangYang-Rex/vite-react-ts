import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import {resolve} from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
      {
        find: 'src',
        replacement: '/src'
      },
      {
        find: 'components',
        replacement: '/src/components'
      },
      {
        find: 'pages',
        replacement: '/src/pages'
      },
      {
        find: 'lib',
        replacement: '/src/lib'
      }
    ]
  },
  plugins: [react()],
})
