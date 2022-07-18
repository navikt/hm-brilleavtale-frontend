import { Alert, BodyLong, Heading } from '@navikt/ds-react'
import styled from 'styled-components'
import { AvtalePanel } from '../avtale/AvtalePanel'
import { Avstand } from '../components/Avstand'
import { HentVirksomheterResponse } from '../types'
import { useGet } from '../useGet'
import { VirksomhetPanel } from './VirksomhetPanel'

export function Virksomheter() {
  const { data: virksomheter } = useGet<HentVirksomheterResponse>('/avtale/virksomheter')

  if (!virksomheter) {
    return null
  }

  const virksomheterUtenAvtale = virksomheter.filter((virksomhet) => !virksomhet.aktiv)
  const virksomheterMedAvtale = virksomheter.filter((virksomhet) => virksomhet.aktiv)

  if (virksomheter && !virksomheter.length) {
    return (
      <main>
        <Alert variant="info">
          <BodyLong>Vi fant ingen virksomheter i Altinn som du er hovedadministrator for.</BodyLong>
        </Alert>
      </main>
    )
  }

  return (
    <main>
      {virksomheterUtenAvtale.length > 0 && (
        <>
          <Heading level="2" size="medium" spacing>
            Virksomheter uten avtale
          </Heading>
          <Kolonne>
            {virksomheterUtenAvtale.map((virksomhet) => (
              <VirksomhetPanel key={virksomhet.orgnr} virksomhet={virksomhet} />
            ))}
          </Kolonne>
        </>
      )}
      {virksomheterMedAvtale.length > 0 && (
        <>
          <Avstand marginTop={10} />
          <Heading level="2" size="medium" spacing>
            Virksomheter med avtale
          </Heading>
          <Kolonne>
            {virksomheterMedAvtale.map((virksomhet) => (
              <AvtalePanel key={virksomhet.orgnr} virksomhet={virksomhet} />
            ))}
          </Kolonne>
        </>
      )}
    </main>
  )
}

const Kolonne = styled.div`
  display: grid;
  gap: var(--navds-spacing-5);
`
