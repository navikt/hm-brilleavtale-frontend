import { Alert, BodyLong, Heading, Link as DsLink } from '@navikt/ds-react'
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
      <Heading level="2" size="medium" spacing>
        Kvittering for {virksomhet.navn}
      </Heading>
      <Alert variant="success">
        Nå har firmaet deres inngått avtale med NAV om direkte oppgjør for stønad til briller til barn.
      </Alert>
      <Avstand marginBottom={5} />
      <BodyLong spacing>
        <DsLink href="/brilleavtale.pdf" target="_blank">
          Last ned kopi av avtalen
        </DsLink>
      </BodyLong>
      <BodyLong spacing>
        Krav om direkte oppgjør sendes inn gjennom løsningen for krav om direkte oppgjør ved stønad etter forskrift om
        briller til barn.
      </BodyLong>
      <BodyLong spacing>
        Optikere kan legge inn krav i løsningen etter at brillen er bestilt. Første gang optiker bruker løsningen vil
        hen inngå en avtale med NAV om bruk av løsningen.
      </BodyLong>
      <BodyLong spacing>
        Stønaden utbetales fortløpende til firmaets kontonummer etter at kravet er registrert. Utbetaling vil skje
        senest 30 dager etter at kravet er registrert.
      </BodyLong>
      <AvtalePanel virksomhet={virksomhet} />
      <Avstand marginBottom={5} />
      <Link to="/">Tilbake til forsiden</Link>
    </main>
  )
}
