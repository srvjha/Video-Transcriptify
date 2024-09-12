import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
        // ---> Local SERVER LINK
     // '/api': 'http://localhost:3000',

      //--> Production SERVER LINK
       '/api': 'https://video-transcriptify.onrender.com', 
      
     
    }
  },
  plugins: [react()],

})
