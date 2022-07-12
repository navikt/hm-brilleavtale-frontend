import { LinkPanel } from '@navikt/ds-react'
import { useNavigate } from 'react-router-dom'
import { Data } from '../components/Data'
import { Datum } from '../components/Datum'
import { Organisasjonsnummer } from '../components/Organisasjonsnummer'
import { Virksomhet } from '../types'

export interface VirksomhetPanelProps {
  virksomhet: Virksomhet
}

export function VirksomhetPanel(props: VirksomhetPanelProps) {
  const { virksomhet } = props
  const navigate = useNavigate()
  return (
    <LinkPanel
      onClick={() => {
        navigate(`/opprett-avtale/${virksomhet.orgnr}`)
      }}
    >
      <LinkPanel.Title className="navds-heading--small">{virksomhet.navn}</LinkPanel.Title>
      <LinkPanel.Description>
        <Data>
          <Datum label="Organisasjonsnummer">
            <Organisasjonsnummer verdi={virksomhet.orgnr} />
          </Datum>
        </Data>
      </LinkPanel.Description>
    </LinkPanel>
  )
}
