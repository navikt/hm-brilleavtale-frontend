import { Alert, Heading } from '@navikt/ds-react'
import { Link, useLocation } from 'react-router-dom'
import { Avstand } from '../components/Avstand'
import { Virksomhet } from '../types'
import { AvtalePanel } from './AvtalePanel'

export interface AvtaleKvitteringProps {}

export function AvtaleKvittering(props: AvtaleKvitteringProps) {
  const {} = props
  const { state: virksomhet } = useLocation() as { state: Virksomhet }
  if (!virksomhet) {
    return null
  }
  return (
    <main>
      <Heading level="1" size="large" spacing>
        Kvittering for {virksomhet.navn}
      </Heading>
      <Alert variant="success">Avtale ble opprettet</Alert>
      <Avstand marginBottom={5} />
      <AvtalePanel virksomhet={virksomhet} />
      <Avstand marginBottom={5} />
      <Link to="/">Tilbake til forsiden</Link>
    </main>
  )
}
