import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes } from 'react-router-dom'
import { VirksomhetAvtale } from './avtale/VirksomhetAvtale'
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
        <Route path="/avtale/:orgnr" element={<VirksomhetAvtale />} />
        <Route path="*" element={<Feilside status={404} />} />
      </Routes>
    </ErrorBoundary>
  )
}
