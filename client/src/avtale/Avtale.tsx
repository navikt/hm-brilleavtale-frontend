import { BodyLong, Box, Heading } from '@navikt/ds-react'
import { useTranslation } from 'react-i18next'
import nb from './nb_avtale.json'
import nn from './nn_avtale.json'

export function Avtale() {
  const {
    i18n: { language },
  } = useTranslation()
  const avtale = language === 'nn' ? nn : nb
  return (
    <Box.New borderWidth="1" borderColor="neutral" padding="4" borderRadius="large">
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
    </Box.New>
  )
}
