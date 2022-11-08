import { Heading } from '@navikt/ds-react'
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler'
import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { Route, Routes } from 'react-router-dom'
import { AvtaleKvittering } from './avtale/AvtaleKvittering'
import { OppdaterAvtale } from './avtale/OppdaterAvtale'
import { OpprettAvtale } from './avtale/OpprettAvtale'
import { Banner } from './components/Banner'
import { isHttpError } from './error'
import { Feilside } from './Feilside'
import { baseUrl } from './http'
import { Virksomheter } from './virksomhet/Virksomheter'

export function App() {
  const { t } = useTranslation()
  useEffect(() => {
    setBreadcrumbs([
      { url: 'https://www.nav.no/barnebriller', title: t('brødsmuler.1') },
      { url: baseUrl('/'), title: t('brødsmuler.2') },
    ])
  }, [])

  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        if (isHttpError(error)) {
          return <Feilside status={error.status} error={error} />
        } else {
          return <Feilside status={500} error={error} />
        }
      }}
    >
      <header>
        <Banner>
          <Heading level="1" size="large">
            {t('banner')}
          </Heading>
        </Banner>
      </header>
      <Routes>
        <Route path="/" element={<Virksomheter />} />
        <Route path="/opprett-avtale/kvittering" element={<AvtaleKvittering />} />
        <Route path="/opprett-avtale/:orgnr" element={<OpprettAvtale />} />
        <Route path="/oppdater-avtale/:orgnr" element={<OppdaterAvtale />} />
        <Route path="*" element={<Feilside status={404} />} />
      </Routes>
    </ErrorBoundary>
  )
}
