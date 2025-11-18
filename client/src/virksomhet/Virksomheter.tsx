import { Alert, BodyLong, Box, Heading, VStack } from '@navikt/ds-react'
import { Trans, useTranslation } from 'react-i18next'
import { AvtalePanel } from '../avtale/AvtalePanel'
import { Avstand } from '../components/Avstand'
import { HentVirksomheterResponse } from '../types'
import { useGet } from '../useGet'
import { VirksomhetPanel } from './VirksomhetPanel'
import ScrollToTop from '../components/ScrollToTop'

export function Virksomheter() {
  const { t } = useTranslation()
  const { data: virksomheter } = useGet<HentVirksomheterResponse>('/avtale/virksomheter')

  if (!virksomheter) {
    return null
  }

  const virksomheterUtenAvtale = virksomheter.filter((virksomhet) => !virksomhet.aktiv)
  const virksomheterMedAvtale = virksomheter.filter((virksomhet) => virksomhet.aktiv)

  if (virksomheter && !virksomheter.length) {
    return (
      <main>
        <ScrollToTop />
        <Alert variant="info">
          <BodyLong>{t('virksomhet.ingen_virksomheter')}</BodyLong>
        </Alert>
      </main>
    )
  }

  return (
    <>
      <main>
        <Avstand marginBottom={5}>
          <Alert inline variant="info">
            <Heading size="small" level="3">{t('endringsvarsel.bv.tittel')}</Heading>
            {t('endringsvarsel.bv.tekst')} <a href="https://navikt.github.io/hm-brille-integrasjon/">{t('endringsvarsel.bv.lenketekst')}</a>
          </Alert>
        </Avstand>
        <ScrollToTop />
        {virksomheterUtenAvtale.length > 0 && (
          <>
            <Heading level="2" size="medium" spacing>
              {t('virksomhet.uten_avtale')}
            </Heading>
            <VStack gap="5">
              {virksomheterUtenAvtale.map((virksomhet) => (
                <VirksomhetPanel key={virksomhet.orgnr} virksomhet={virksomhet} />
              ))}
            </VStack>
          </>
        )}
        {virksomheterMedAvtale.length > 0 && (
          <>
            <Avstand marginTop={10} />
            <Heading level="2" size="medium" spacing>
              {t('virksomhet.med_avtale')}
            </Heading>
            <VStack gap="5">
              {virksomheterMedAvtale.map((virksomhet) => (
                <AvtalePanel key={virksomhet.orgnr} virksomhet={virksomhet} />
              ))}
            </VStack>
          </>
        )}
      </main>
      <Box.New className="main" width={{ xs: "80%", md: "680px" }} marginBlock="0" marginInline="auto" paddingBlock={{ xs: "3", md: "0 10" }} paddingInline={{ xs: "3", md: "10" }}>
        <Trans t={t} i18nKey="problemer">
          <></>
          <a href="mailto:nav.hot.behandlingsbriller@nav.no" />
        </Trans>
      </Box.New>
    </>
  )
}