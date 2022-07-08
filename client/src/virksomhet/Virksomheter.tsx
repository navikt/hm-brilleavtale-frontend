import { Heading } from '@navikt/ds-react'
import { HentVirksomheterResponse } from '../types'
import { useGet } from '../useGet'
import { VirksomhetPanel } from './VirksomhetPanel'

export interface VirksomheterProps {}

export function Virksomheter(props: VirksomheterProps) {
  const { data: virksomheter } = useGet<HentVirksomheterResponse>('/virksomheter')

  if (!virksomheter) {
    return null
  }

  const ikkeSignerteVirksomheter = virksomheter.filter((virksomhet) => !virksomhet.signert)
  const signerteVirksomheter = virksomheter.filter((virksomhet) => virksomhet.signert)

  const {} = props
  return (
    <main>
      {ikkeSignerteVirksomheter.length > 0 && (
        <>
          <Heading level="1" size="large" spacing>
            Virksomheter til signering
          </Heading>
          {ikkeSignerteVirksomheter.map((virksomhet) => (
            <VirksomhetPanel virksomhet={virksomhet} />
          ))}
        </>
      )}
      {signerteVirksomheter.length > 0 && (
        <>
          <Heading level="1" size="large" spacing>
            Virksomheter som er signert
          </Heading>
          {signerteVirksomheter.map((virksomhet) => (
            <div>{virksomhet.navn}</div>
          ))}
        </>
      )}
    </main>
  )
}
