import { fetchDecoratorHtml } from '@navikt/nav-dekoratoren-moduler/ssr/index.js'
import react from '@vitejs/plugin-react'
import Mustache from 'mustache'
import { defineConfig, Plugin } from 'vite'

const htmlPlugin = ({ development }: { development?: boolean }): Plugin => ({
  name: 'html-transform',
  async transformIndexHtml(html) {
    if (development) {
      const decorator = await fetchDecoratorHtml({
        env: 'dev',
        context: 'samarbeidspartner',
        chatbot: false,
        language: 'nb',
        availableLanguages: [
          {
            locale: 'nb',
            handleInApp: true,
          },
          {
            locale: 'nn',
            handleInApp: true,
          },
        ],
      })
      return {
        html: Mustache.render(html, decorator),
        tags: [
          {
            tag: 'script',
            children: `window.appSettings = {
              GIT_COMMIT: 'ukjent',
              MILJO: 'labs-gcp',
              USE_MSW: true,
            }`,
          },
        ],
      }
    } else {
      return {
        html,
        tags: [
          {
            tag: 'script',
            children: `window.appSettings = {}`,
          },
          {
            tag: 'script',
            attrs: {
              src: '/hjelpemidler/brilleavtale/settings.js',
            },
          },
        ],
      }
    }
  },
})

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  base: env.mode === 'development' ? '/' : '/hjelpemidler/brilleavtale/',
  plugins: [htmlPlugin({ development: env.mode === 'development' }), react()],
  build: {
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
}))
