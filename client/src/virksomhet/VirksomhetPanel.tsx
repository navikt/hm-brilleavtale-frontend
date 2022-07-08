import { BodyLong, Button, Heading, Panel } from '@navikt/ds-react'
import { Link } from 'react-router-dom'
import { Virksomhet } from '../types'

export interface VirksomhetPanelProps {
  virksomhet: Virksomhet
}

export function VirksomhetPanel(props: VirksomhetPanelProps) {
  const { virksomhet } = props
  return (
    <Panel border>
      <Heading level="2" size="medium" spacing>
        {virksomhet.navn}
      </Heading>
      <BodyLong spacing>Organisasjonsnummer: {virksomhet.orgnr}</BodyLong>
      <Button as={Link} to={`/avtale/${virksomhet.orgnr}`} variant="secondary">
        Opprett avtale
      </Button>
    </Panel>
  )
}
