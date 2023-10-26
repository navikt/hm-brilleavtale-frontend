import { Alert, BodyLong, Heading } from '@navikt/ds-react'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { AvtalePanel } from '../avtale/AvtalePanel'
import { Avstand } from '../components/Avstand'
import { HentVirksomheterResponse } from '../types'
import { useGet } from '../useGet'
import { VirksomhetPanel } from './VirksomhetPanel'
import ScrollToTop from "../components/ScrollToTop";
import {Endringsvarsel} from "@navikt/hm-react-components";

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
        <ScrollToTop />
        {virksomheterUtenAvtale.length > 0 && (
          <>
              <Avstand marginBottom={5}>
                  <Endringsvarsel
                      tittel={t('endringsvarsel.bv.tittel')}
                      tekst={t('endringsvarsel.bv.tekst')}
                      lenketekst={t('endringsvarsel.bv.lenketekst')}
                      lenke="https://navikt.github.io/hm-brille-integrasjon/"
                  />
              </Avstand>
            <Heading level="2" size="medium" spacing>
              {t('virksomhet.uten_avtale')}
            </Heading>
            <Kolonne>
              {virksomheterUtenAvtale.map((virksomhet) => (
                <VirksomhetPanel key={virksomhet.orgnr} virksomhet={virksomhet} />
              ))}
            </Kolonne>
          </>
        )}
        {virksomheterMedAvtale.length > 0 && (
          <>
            <Avstand marginTop={10} />
            <Heading level="2" size="medium" spacing>
              {t('virksomhet.med_avtale')}
            </Heading>
            <Kolonne>
              {virksomheterMedAvtale.map((virksomhet) => (
                <AvtalePanel key={virksomhet.orgnr} virksomhet={virksomhet} />
              ))}
            </Kolonne>
          </>
        )}
      </main>
      <Kontakt className="main">
        <Trans t={t} i18nKey="problemer">
          <></>
          <a href="mailto:nav.hot.behandlingsbriller@nav.no" />
        </Trans>
      </Kontakt>
    </>
  )
}

const Kolonne = styled.div`
  display: grid;
  gap: var(--a-spacing-5);
`

const Kontakt = styled.div`
  width: 680px;
  margin: 0 auto;
  padding: 0 40px 40px 40px;
  @media (max-width: 768px) {
    width: 80%;
    padding: 10px;
  }
`
