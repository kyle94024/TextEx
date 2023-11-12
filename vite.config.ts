import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react'
import zipPack from 'vite-plugin-zip-pack'

import manifest from './src/manifest'
//@ts-ignore
import { config } from './src/read_pages_folder'
import postcss from 'postcss'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    css: {
      postcss: require('./postcss.config.js'),
    },
    build: {
      emptyOutDir: true,
      outDir: 'build',
      rollupOptions: {
        input: config,
        output: {
          chunkFileNames: 'assets/chunk-[hash].js',
        },
      },
    },

    plugins: [
      crx({ manifest }),
      react(),
      zipPack({
        outDir: `package`,
        inDir: 'build',
        // @ts-ignore
        outFileName: `${manifest.short_name ?? manifest.name.replaceAll(' ', '-')}-extension-v${
          // @ts-ignore
          manifest.version
        }.zip`,
      }),
    ],
  }
})
