import "@navikt/ds-css/darkside";
import { Theme } from "@navikt/ds-react";
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SWRConfig, SWRConfiguration } from 'swr'
import { App } from './App'
import { GlobalStyle } from './GlobalStyle'
import { baseUrl, http } from './http'
import './i18n'
import { initMSW } from './mocks/initMSW'
import { initAmplitude } from './utils/amplitude'
import { HelmetProvider } from 'react-helmet-async'

const swrConfig: SWRConfiguration = {
  async fetcher(url: string) {
    return http.get(url)
  },
}

initMSW().then(() => {
  const container = document.getElementById('root')!
  initAmplitude()
  createRoot(container).render(
    <React.StrictMode>
      <GlobalStyle />
      <SWRConfig value={swrConfig}>
        <HelmetProvider>
          <BrowserRouter basename={baseUrl()}>
            <Theme>
              <App />
            </Theme>
          </BrowserRouter>
        </HelmetProvider>
      </SWRConfig>
    </React.StrictMode>
  )
})
