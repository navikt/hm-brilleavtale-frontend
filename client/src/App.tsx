import { Heading } from '@navikt/ds-react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'
import { AvtaleKvittering } from './avtale/AvtaleKvittering'
import { OpprettAvtale } from './avtale/OpprettAvtale'
import { RedigerAvtale } from './avtale/RedigerAvtale'
import { Banner } from './components/Banner'
import { isHttpError } from './error'
import { Feilside } from './Feilside'
import { Virksomheter } from './virksomhet/Virksomheter'

export function App() {
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
    </ErrorBoundary>
  )
}
