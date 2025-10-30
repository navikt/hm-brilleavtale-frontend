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
        params: {
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
        },
      })
      const {
        DECORATOR_HEAD_ASSETS: HeadAssets,
        DECORATOR_HEADER: Header,
        DECORATOR_FOOTER: Footer,
        DECORATOR_SCRIPTS: Scripts,
      } = decorator
      return {
        html: Mustache.render(html.replace(/\{\{\./g, '{{{').replace(/\}\}/g, '}}}'), {
          HeadAssets,
          Header,
          Footer,
          Scripts,
        }),
        tags: [
          {
            tag: 'script',
            children: `window.appSettings = {
              GIT_COMMIT: 'ukjent',
              NAIS_CLUSTER_NAME: 'labs-gcp',
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
