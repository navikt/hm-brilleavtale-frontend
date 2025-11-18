import { HGrid, LinkCard } from '@navikt/ds-react'
import { Link } from 'react-router-dom'
import { Datum } from '../components/Datum'
import { Organisasjonsnummer } from '../components/Organisasjonsnummer'
import { Virksomhet } from '../types'
import { logSkjemaStartet, skjemanavn } from '../utils/amplitude'

export interface VirksomhetPanelProps {
  virksomhet: Virksomhet
}

export function VirksomhetPanel(props: VirksomhetPanelProps) {
  const { virksomhet } = props
  return (
    <LinkCard tabIndex={0}>
      <LinkCard.Title>
        <LinkCard.Anchor asChild>
          <Link
            to={`/opprett-avtale/${virksomhet.orgnr}`}
            onClick={() => {
              logSkjemaStartet(virksomhet.orgnr, skjemanavn.SKJEMANAVN_OPPRETT);
              window.scrollTo(0, 0);
            }}
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
        </HGrid>
      </LinkCard.Description>
    </LinkCard>
  )
}
