import { BodyLong, Heading, Panel } from '@navikt/ds-react'
import { useTranslation } from 'react-i18next'
import nb from './nb_utvidet_avtale.json'
import nn from './nn_utvidet_avtale.json'

export function UtvidetAvtale() {
  const {
    i18n: { language },
  } = useTranslation()
  const avtale = language === 'nn' ? nn : nb
  return (
    <Panel>
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
