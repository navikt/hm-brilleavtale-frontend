import { Heading } from '@navikt/ds-react'
import styled from 'styled-components'
import { AvtalePanel } from '../avtale/AvtalePanel'
import { Avstand } from '../components/Avstand'
import { HentVirksomheterResponse } from '../types'
import { useGet } from '../useGet'
import { VirksomhetPanel } from './VirksomhetPanel'

export interface VirksomheterProps {}

export function Virksomheter(props: VirksomheterProps) {
  const { data: virksomheter } = useGet<HentVirksomheterResponse>('/avtale/virksomheter')

  if (!virksomheter) {
    return null
  }

  const ikkeSignerteVirksomheter = virksomheter.filter((virksomhet) => !virksomhet.harNavAvtale)
  const signerteVirksomheter = virksomheter.filter((virksomhet) => virksomhet.harNavAvtale)

  return (
    <main>
      {ikkeSignerteVirksomheter.length > 0 && (
        <>
          <Heading level="1" size="large" spacing>
            Virksomheter til signering
          </Heading>
          <Kolonne>
            {ikkeSignerteVirksomheter.map((virksomhet) => (
              <VirksomhetPanel key={virksomhet.orgnr} virksomhet={virksomhet} />
            ))}
          </Kolonne>
        </>
      )}
      {signerteVirksomheter.length > 0 && (
        <>
          <Avstand marginTop={10} />
          <Heading level="1" size="large" spacing>
            Virksomheter som er signert
          </Heading>
          <Kolonne>
            {signerteVirksomheter.map((virksomhet) => (
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
