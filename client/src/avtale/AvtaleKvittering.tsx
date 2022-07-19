import { Alert, BodyLong, Heading, Link as DsLink } from '@navikt/ds-react'
import { Link, useLocation } from 'react-router-dom'
import { AppLink } from '../components/AppLink'
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
        Du har inngått avtale med NAV om direkte oppgjør for stønad til briller til barn på vegne av firmaet ditt.
      </Alert>
      <Avstand marginBottom={5} />
      <BodyLong spacing>
        <AppLink href="/avtale.pdf" target="_blank">
          Last ned kopi av avtalen
        </AppLink>
      </BodyLong>
      <Heading level="3" size="medium" spacing>
        Slik sender dere inn krav og får utbetaling
      </Heading>
      <BodyLong spacing>
        Optikeren sender inn krav gjennom den&nbsp;
        <DsLink href="https://nav.no/hjelpemidler/barnebriller">digitale løsningen</DsLink>. Hver enkelt optiker inngår
        en avtale med NAV første gangen hen skal bruke løsningen.
      </BodyLong>
      <BodyLong spacing>Legg inn kravet etter at brillen er bestilt.</BodyLong>
      <BodyLong spacing>
        NAV utbetaler stønaden til firmaets kontonummer senest 30 dager etter at kravet er registrert.
      </BodyLong>
      <BodyLong spacing>
        Her kan dere finne mer informasjon om briller til barn:&nbsp;
        <DsLink href="https://nav.no/barnebriller" target="_blank">
          NAV barnebriller
        </DsLink>
      </BodyLong>
      <AvtalePanel virksomhet={virksomhet} />
      <Avstand marginBottom={5} />
      <Link to="/">Tilbake til forsiden</Link>
    </main>
  )
}
