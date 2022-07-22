import { Heading } from '@navikt/ds-react'
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler'
import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { AvtaleKvittering } from './avtale/AvtaleKvittering'
import { OpprettAvtale } from './avtale/OpprettAvtale'
import { RedigerAvtale } from './avtale/RedigerAvtale'
import { Banner } from './components/Banner'
import { isHttpError } from './error'
import { Feilside } from './Feilside'
import { baseUrl } from './http'
import { Virksomheter } from './virksomhet/Virksomheter'

export function App() {
  useEffect(() => {
    setBreadcrumbs([
      { url: 'https://www.nav.no/barnebriller', title: 'Briller til barn - optikers rolle' },
      { url: baseUrl('/'), title: 'Avtale om direkte oppgjør av briller for barn' },
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
            Avtale om direkte oppgjør av briller for barn
          </Heading>
        </Banner>
      </header>
      <Routes>
        <Route path="/" element={<Virksomheter />} />
        <Route path="/opprett-avtale/kvittering" element={<AvtaleKvittering />} />
        <Route path="/opprett-avtale/:orgnr" element={<OpprettAvtale />} />
        <Route path="/rediger-avtale/:orgnr" element={<RedigerAvtale />} />
        <Route path="*" element={<Feilside status={404} />} />
      </Routes>
      <Kontakt className="main">
        Har du problemer med å inngå avtale, opplever du feil i løsningen eller har du andre spørsmål? Kontakt oss på
        epost:&nbsp;
        <a href="mailto:digihot@nav.no">digihot@nav.no</a>
      </Kontakt>
    </ErrorBoundary>
  )
}

const Kontakt = styled.div`
  width: 680px;
  margin: 0 auto;
  padding: 0 40px 40px 40px;
`
