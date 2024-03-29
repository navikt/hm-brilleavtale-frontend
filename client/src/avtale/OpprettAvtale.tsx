import { BodyLong, Button, ConfirmationPanel, Heading, TextField } from '@navikt/ds-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { AppLink } from '../components/AppLink'
import { Avstand } from '../components/Avstand'
import { validerEpost } from '../epost'
import { removeWhitespaceAndDot, validerKontonummer } from '../kontonummer'
import { HentVirksomhetResponse, OpprettAvtaleRequest } from '../types'
import { useGet } from '../useGet'
import { usePost } from '../usePost'
import { logSkjemaFullført, skjemanavn } from '../utils/amplitude'
import { Avtale } from './Avtale'

export function OpprettAvtale() {
  const { t } = useTranslation()
  const { orgnr } = useParams<{ orgnr: string }>()
  const { data: virksomhet } = useGet<HentVirksomhetResponse>(`/avtale/virksomheter/${orgnr}`)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ kontonr: string; epost: string; lest: boolean }>({
    defaultValues: {
      kontonr: '',
      epost: '',
      lest: false,
    },
  })
  const { post: opprettAvtale, data: avtale } = usePost<OpprettAvtaleRequest, void>('/avtale/virksomheter')
  const navigate = useNavigate()
  useEffect(() => {
    if (avtale) {
      navigate('/opprett-avtale/kvittering', {
        state: avtale,
      })
    }
  }, [avtale])
  if (!virksomhet) {
    return null
  }
  return (
    <main>
      <Heading level="2" size="medium" spacing>
        {t('avtale.opprett_avtale_for', { navn: virksomhet.navn })}
      </Heading>
      <BodyLong>{t('avtale.ingress')}</BodyLong>
      <Avstand marginTop={5} marginBottom={5}>
        <Avtale />
      </Avstand>
      <BodyLong spacing>
        <AppLink href="/avtale.pdf" target="_blank">
          {t('avtale.lenke_signert_avtale')}
        </AppLink>
      </BodyLong>
      <form
        onSubmit={handleSubmit(async (data) => {
          await opprettAvtale({
            orgnr: virksomhet.orgnr,
            kontonr: removeWhitespaceAndDot(data.kontonr),
            epost: data.epost,
          })
          logSkjemaFullført(virksomhet?.orgnr, skjemanavn.SKJEMANAVN_OPPRETT)
        })}
      >
        <Tekstfelt
          label={t('ledetekst.kontonr')}
          error={errors.kontonr?.message}
          {...register('kontonr', {
            validate(kontonummer) {
              return validerKontonummer(kontonummer) ? true : t('felles.ugyldig_kontonr')
            },
          })}
        />
        <Avstand marginBottom={5} />
        <Tekstfelt
          label={t('ledetekst.epost')}
          error={errors.epost?.message}
          {...register('epost', {
            validate(epost) {
              return validerEpost(epost) ? true : t('felles.ugyldig_epost')
            },
          })}
        />
        <Avstand marginTop={5} marginBottom={5}>
          <Controller
            control={control}
            name="lest"
            rules={{
              validate(value) {
                return value || t('avtale.må_huke_av')
              },
            }}
            render={({ field }) => (
              <ConfirmationPanel
                error={errors.lest?.message}
                label={t('avtale.bekreftelse')}
                checked={field.value}
                {...field}
              />
            )}
          />
        </Avstand>
        <Knapper>
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
            {t('avtale.inngå_avtale')}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              navigate('/')
            }}
          >
            {t('felles.avbryt')}
          </Button>
        </Knapper>
      </form>
    </main>
  )
}

const Knapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: var(--a-spacing-3);
  justify-content: left;
`

const Tekstfelt = styled(TextField)`
  max-width: 330px;
`
