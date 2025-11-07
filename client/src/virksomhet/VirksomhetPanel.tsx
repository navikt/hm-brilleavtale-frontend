import { LinkCard } from '@navikt/ds-react'
import { Link } from 'react-router-dom'
import { Data } from '../components/Data'
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
            onClick={() => { logSkjemaStartet(virksomhet.orgnr, skjemanavn.SKJEMANAVN_OPPRETT); window.scrollTo(0, 0); }}
          >
            {virksomhet.navn}
          </Link>
        </LinkCard.Anchor>
      </LinkCard.Title>
      <LinkCard.Description>
        <Data>
          <Datum label="ledetekst.orgnr">
            <Organisasjonsnummer verdi={virksomhet.orgnr} />
          </Datum>
        </Data>
      </LinkCard.Description>
    </LinkCard>
  )
}
