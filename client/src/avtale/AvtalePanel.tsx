import { LinkCard } from '@navikt/ds-react'
import { Link } from 'react-router-dom'
import { Data } from '../components/Data'
import { Dato } from '../components/Dato'
import { Datum } from '../components/Datum'
import { Kontonummer } from '../components/Kontonummer'
import { Organisasjonsnummer } from '../components/Organisasjonsnummer'
import { Virksomhet } from '../types'
import { logSkjemaStartet, skjemanavn } from '../utils/amplitude'

export interface AvtalePanelProps {
  virksomhet: Virksomhet
}

export function AvtalePanel(props: AvtalePanelProps) {
  const { virksomhet } = props
  return (
    <LinkCard tabIndex={0}>
      <LinkCard.Title>
        <LinkCard.Anchor asChild>
          <Link
            to={`/oppdater-avtale/${virksomhet.orgnr}`}
            onClick={() => { logSkjemaStartet(virksomhet.orgnr, skjemanavn.SKJEMANAVN_ENDRE); window.scrollTo(0, 0); }}
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
          <Datum label="ledetekst.dato_opprettet">
            <Dato verdi={virksomhet.opprettet} />
          </Datum>
          <Datum label="ledetekst.kontonr">
            <Kontonummer verdi={virksomhet.kontonr} />
          </Datum>
          <Datum label="ledetekst.epost">{virksomhet.epost}</Datum>
        </Data>
      </LinkCard.Description>
    </LinkCard>
  )
}
