import { HGrid, LinkCard } from '@navikt/ds-react'
import { Link } from 'react-router-dom'
import { Dato } from '../components/Dato'
import { Datum } from '../components/Datum'
import { Organisasjonsnummer } from '../components/Organisasjonsnummer'
import { Virksomhet } from '../types'
import { logSkjemaStartet, skjemanavn } from '../utils/amplitude'

export interface AvtalePanelProps {
  virksomhet: Virksomhet
}

export function BruksvilkårPanel(props: AvtalePanelProps) {
  const { virksomhet } = props
  return (
    <LinkCard tabIndex={0}>
      <LinkCard.Title>
        <LinkCard.Anchor asChild>
          <Link
            to={`/oppdater-avtale/${virksomhet.orgnr}`}
            onClick={() => { logSkjemaStartet(virksomhet.orgnr, skjemanavn.SKJEMANAVN_ENDRE_BRUKSVILKÅR); window.scrollTo(0, 0); }}
          >
            {virksomhet.navn}
          </Link>
        </LinkCard.Anchor>
      </LinkCard.Title>
      <LinkCard.Description>
        <HGrid columns={{ xs: "block", sm: "190px auto" }} gap="1" margin="0" align="center">
          <Datum label="ledetekst.orgnr">
            <Organisasjonsnummer verdi={virksomhet.orgnr} />
          </Datum>
          <Datum label="ledetekst.dato_opprettet">
            <Dato verdi={virksomhet.opprettet} />
          </Datum>
        </HGrid>
      </LinkCard.Description>
    </LinkCard>
  )
}
