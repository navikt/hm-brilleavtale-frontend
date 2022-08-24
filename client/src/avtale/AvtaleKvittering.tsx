import { Alert, BodyLong, Heading } from '@navikt/ds-react'
import { Trans, useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { AppLink } from '../components/AppLink'
import { Avstand } from '../components/Avstand'
import { DsLink } from '../components/DsLink'
import { Virksomhet } from '../types'
import { AvtalePanel } from './AvtalePanel'

export function AvtaleKvittering() {
  const { t } = useTranslation()
  const { state: virksomhet } = useLocation() as { state: Virksomhet }
  if (!virksomhet) {
    return null
  }
  return (
    <main>
      <Heading level="2" size="medium" spacing>
        {t('avtale.kvittering_for', { navn: virksomhet.navn })}
      </Heading>
      <Alert variant="success">{t('avtale.suksess')}</Alert>
      <Avstand marginBottom={5} />
      <BodyLong spacing>
        <AppLink href="/avtale.pdf" target="_blank">
          {t('avtale.lenke_last_ned_avtalen')}
        </AppLink>
      </BodyLong>
      <Heading level="3" size="medium" spacing>
        {t('avtale.overskrift_forklaring')}
      </Heading>
      <BodyLong spacing>
        <Trans t={t} i18nKey="avtale.optiker_sender_krav">
          <></>
          <DsLink href="https://nav.no/hjelpemidler/barnebriller">
            <></>
          </DsLink>
          <></>
        </Trans>
      </BodyLong>
      <BodyLong spacing>{t('avtale.legg_inn_kravet')}</BodyLong>
      <BodyLong spacing>{t('avtale.nav_utbetaler')}</BodyLong>
      <BodyLong spacing>
        <Trans t={t} i18nKey="avtale.mer_informasjon">
          <></>
          <DsLink href="https://nav.no/barnebriller" target="_blank">
            <></>
          </DsLink>
        </Trans>
      </BodyLong>
      <AvtalePanel virksomhet={virksomhet} />
      <Avstand marginBottom={5} />
      <Link to="/">{t('avtale.lenke_tilbake_til_forsiden')}</Link>
    </main>
  )
}
