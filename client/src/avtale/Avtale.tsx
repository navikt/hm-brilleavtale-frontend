import { BodyLong, Heading, Panel } from '@navikt/ds-react'
import avtale from './avtale.json'

export function Avtale() {
  return (
    <Panel border>
      {avtale.map(({ overskrift, tekst }, index) => (
        <div key={index}>
          <Heading size="small" level="3" spacing>
            {`${index + 1}. ${overskrift}`}
          </Heading>
          {tekst.map((t, index) => (
            <BodyLong key={index} spacing>
              {t}
            </BodyLong>
          ))}
        </div>
      ))}
    </Panel>
  )
}
