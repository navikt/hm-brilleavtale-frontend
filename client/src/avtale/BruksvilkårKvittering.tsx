import { Alert, BodyLong, Heading } from '@navikt/ds-react'
import { Trans, useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { Avstand } from '../components/Avstand'
import { DsLink } from '../components/DsLink'
import { Virksomhet } from '../types'
import ScrollToTop from '../components/ScrollToTop'
import { BruksvilkårPanel } from './BruksvilkårPanel'

export function BruksvilkårKvittering() {
  const { t } = useTranslation()
  const { state: virksomhet } = useLocation() as { state: Virksomhet }
  if (!virksomhet) {
    return null
  }
  return (
    <main>
      <ScrollToTop />
      <Heading level="2" size="medium" spacing>
        {t('avtale.kvittering_for', { navn: virksomhet.navn })}
      </Heading>
      <Alert variant="success">{t('avtale_utvidet.suksess')}</Alert>
      <Avstand marginBottom={20}></Avstand>
      <Alert variant="info">{t('avtale_utvidet.informasjon')}</Alert>
      <Avstand marginBottom={20} />
      <BodyLong spacing>
        <Trans t={t} i18nKey="avtale.mer_informasjon">
          <></>
          <DsLink href="https://nav.no/barnebriller" target="_blank">
            <></>
          </DsLink>
        </Trans>
      </BodyLong>
      <BruksvilkårPanel virksomhet={virksomhet} />
      <Avstand marginBottom={20} />
      <Link to="/">{t('avtale.lenke_tilbake_til_forsiden')}</Link>
    </main>
  )
}
