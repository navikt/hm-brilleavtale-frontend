import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'
import { AvtaleKvittering } from './avtale/AvtaleKvittering'
import { OpprettAvtale } from './avtale/OpprettAvtale'
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
      <Routes>
        <Route path="/" element={<Virksomheter />} />
        <Route path="/opprett-avtale/kvittering" element={<AvtaleKvittering />} />
        <Route path="/opprett-avtale/:orgnr" element={<OpprettAvtale />} />
        <Route path="*" element={<Feilside status={404} />} />
      </Routes>
    </ErrorBoundary>
  )
}
