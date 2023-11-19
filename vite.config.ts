import { defineConfig } from 'vite'
import { crx } from '@crxjs/vite-plugin'
import react from '@vitejs/plugin-react-swc'

import manifest from './src/manifest'
//@ts-ignore
// import { config } from './src/read_pages_folder'
import { resolve } from 'path'

const root = resolve(__dirname, 'src')
const backgroundDir = resolve(root, 'background')
const contentDir = resolve(root, 'content')
const assetsDir = resolve(root, 'assets')
// const outDir = resolve(__dirname, 'dist')
// const publicDir = resolve(__dirname, 'public')

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        '@src': root,
        '@assets': assetsDir,
        '@background': backgroundDir,
        '@content': contentDir,
      },
    },

    build: {
      emptyOutDir: true,
      outDir: 'build',
    },

    plugins: [
      react(),
      crx({
        manifest,
        contentScripts: {
          injectCss: true,
        },
      }),
      // zipPack({
      //   outDir: `package`,
      //   inDir: 'build',
      //   // @ts-ignore
      //   outFileName: `${manifest.short_name ?? manifest.name.replaceAll(' ', '-')}-extension-v${
      //     // @ts-ignore
      //     manifest.version
      //   }.zip`,
      // }),
    ],
  }
})
