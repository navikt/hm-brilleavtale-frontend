import { LinkPanel } from '@navikt/ds-react'
import { useNavigate } from 'react-router-dom'
import { Data } from '../components/Data'
import { Dato } from '../components/Dato'
import { Datum } from '../components/Datum'
import { Kontonummer } from '../components/Kontonummer'
import { Organisasjonsnummer } from '../components/Organisasjonsnummer'
import { Virksomhet } from '../types'

export interface AvtalePanelProps {
  virksomhet: Virksomhet
}

export function AvtalePanel(props: AvtalePanelProps) {
  const { virksomhet } = props
  const navigate = useNavigate()
  return (
    <LinkPanel
      onClick={() => {
        navigate(`/oppdater-avtale/${virksomhet.orgnr}`)
      }}
    >
      <LinkPanel.Title className="navds-heading--small">{virksomhet.navn}</LinkPanel.Title>
      <LinkPanel.Description>
        <Data>
          <Datum label="Organisasjonsnummer">
            <Organisasjonsnummer verdi={virksomhet.orgnr} />
          </Datum>
          <Datum label="Dato opprettet">
            <Dato verdi={virksomhet.opprettet} />
          </Datum>
          <Datum label="Kontonummer">
            <Kontonummer verdi={virksomhet.kontonr} />
          </Datum>
          <Datum label="Epost">{virksomhet.epost}</Datum>
        </Data>
      </LinkPanel.Description>
    </LinkPanel>
  )
}
