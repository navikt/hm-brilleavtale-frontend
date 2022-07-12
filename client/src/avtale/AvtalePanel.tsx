import { Heading, Panel } from '@navikt/ds-react'
import { Data } from '../components/Data'
import { Datum } from '../components/Datum'
import { Virksomhet } from '../types'

export interface AvtalePanelProps {
  virksomhet: Virksomhet
}

export function AvtalePanel(props: AvtalePanelProps) {
  const { virksomhet } = props
  return (
    <Panel border>
      <Heading level="2" size="medium" spacing>
        {virksomhet.navn}
      </Heading>
      <Data>
        <Datum label="Organisasjonsnummer">{virksomhet.orgnr}</Datum>
        <Datum label="Kontonummer">{virksomhet.kontonr}</Datum>
        {virksomhet.opprettet && (
          <Datum label="Dato opprettet">{formatter.format(new Date(virksomhet.opprettet))}</Datum>
        )}
      </Data>
    </Panel>
  )
}

const formatter = new Intl.DateTimeFormat('nb', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})
