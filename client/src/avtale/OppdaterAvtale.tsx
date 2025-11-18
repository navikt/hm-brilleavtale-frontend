import { BodyShort, Box, Button, Heading, HStack, TextField, VStack } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Avstand } from '../components/Avstand'
import { validerEpost } from '../epost'
import { removeWhitespaceAndDot, validerKontonummer } from '../kontonummer'
import { HentVirksomhetResponse, OppdaterAvtaleRequest, OppdaterAvtaleResponse } from '../types'
import { useGet } from '../useGet'
import { usePut } from '../usePut'
import { logSkjemaFullført, logSkjemaStartet, skjemanavn } from '../utils/amplitude'
import { ChevronRightIcon, DownloadIcon, PencilLineIcon } from '@navikt/aksel-icons'
import { AppLink } from '../components/AppLink'
import { Dato } from '../components/Dato'

export function OppdaterAvtale() {
  const { t } = useTranslation()
  const { orgnr } = useParams<{ orgnr: string }>()
  const { data: virksomhet } = useGet<HentVirksomhetResponse>(`/avtale/virksomheter/${orgnr}`)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ kontonr: string; epost: string }>({
    defaultValues: {
      kontonr: '',
      epost: '',
    },
  })
  const { put: endreAvtale, data: avtale } = usePut<OppdaterAvtaleRequest, OppdaterAvtaleResponse>(
    `/avtale/virksomheter/${orgnr}`
  )

  useEffect(() => {
    if (virksomhet) {
      reset({ kontonr: virksomhet.kontonr, epost: virksomhet.epost })
    }
  }, [virksomhet])

  const navigate = useNavigate()
  useEffect(() => {
    if (avtale) {
      navigate('/')
    }
  }, [avtale])
  if (!virksomhet) {
    return null
  }

  return (
    <main>
      <Box.New borderRadius="xlarge" background="neutral-moderate">
        <VStack marginBlock="2" paddingBlock="2" paddingInline="6">
          <HStack paddingBlock="4">
            <div style={{ maxWidth: '100%' }}>
              <Heading level="2" size="small">
                {t('avtale.hovedavtale_tittel')}
              </Heading>
              <BodyShort size="small" style={{ color: '#525962' }}>
                {t('ledetekst.opprettet')}: <Dato verdi={virksomhet.opprettet} />
              </BodyShort>
            </div>
            <Box.New marginInline="auto 0" flexShrink="0" padding="4">
              <AppLink href="/avtale.pdf" target="_blank" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                {t('last.ned')}
                <DownloadIcon title="a11y-title" fontSize="1.5rem" style={{ marginLeft: '0.25rem' }} />
              </AppLink>
            </Box.New>
          </HStack>

          {virksomhet.bruksvilkår && (
            <>
              <hr style={{ width: '100%' }} />
              <HStack paddingBlock="4">
                <div style={{ maxWidth: '100%' }}>
                  <BodyShort size="medium">{t('avtale.utvidet_avtale_tittel')}</BodyShort>
                  <BodyShort size="small" style={{ color: '#525962' }}>
                    {t('ledetekst.opprettet')}: <Dato verdi={virksomhet.bruksvilkårOpprettet} />
                  </BodyShort>
                </div>
                <Box.New marginInline="auto 0" flexShrink="0" padding="4">
                  <AppLink
                    href="/bruksvilkar_1_0.pdf"
                    target="_blank"
                    style={{ textDecoration: 'none', cursor: 'pointer' }}
                  >
                    Last ned
                    <DownloadIcon title="a11y-title" fontSize="1.5rem" style={{ marginLeft: '0.25rem' }} />
                  </AppLink>
                </Box.New>
              </HStack>
            </>
          )}
        </VStack>
      </Box.New>

      {!virksomhet.bruksvilkår && (
        <Box.New borderRadius="xlarge" background="brand-blue-soft">
          <HStack align="center" padding="6" marginBlock="2" wrap={false}>
            <HStack marginInline="0 4" align="center"><PencilLineIcon aria-hidden title="a11y-title" width={32} height={32} /></HStack>
            <Heading level="2" size="small" style={{ maxWidth: '70%' }}>
              {t('avtale.utvidet_avtale_tittel')}
            </Heading>
            <Box.New marginInline="auto 0" flexShrink="0" padding="4">
              <AppLink
                href={`/godta-bruksvilkar/${virksomhet.orgnr}`}
                onClick={(it) => {
                  logSkjemaStartet(virksomhet.orgnr, skjemanavn.SKJEMANAVN_OPPRETT_UTVIDET)
                }}
                style={{ textDecoration: 'none', cursor: 'pointer' }}
              >
                {t('avtale.se_bruksvilkar')}
                <ChevronRightIcon />
              </AppLink>
            </Box.New>
          </HStack>
        </Box.New>
      )}

      <Box.New marginBlock="10 0">
        <Heading level="2" size="small" spacing>
          {t('avtale.endre_kontaktinformasjon')}
        </Heading>
        <form
          onSubmit={handleSubmit(async (data) => {
            await endreAvtale({
              kontonr: removeWhitespaceAndDot(data.kontonr),
              epost: data.epost,
            })
            logSkjemaFullført(virksomhet?.orgnr, skjemanavn.SKJEMANAVN_ENDRE)
          })}
        >
          <TextField
            label={t('ledetekst.kontonr')}
            error={errors.kontonr?.message}
            {...register('kontonr', {
              validate(kontonummer) {
                return validerKontonummer(kontonummer) ? true : t('felles.ugyldig_kontonr')
              },
            })}
            style={{ maxWidth: '330px' }}
          />
          <Avstand marginBottom={5} />
          <TextField
            label={t('ledetekst.epost')}
            error={errors.epost?.message}
            {...register('epost', {
              validate(epost) {
                return validerEpost(epost) ? true : t('felles.ugyldig_epost')
              },
            })}
            style={{ maxWidth: '330px' }}
          />

          <Avstand marginBottom={5} />
          <HStack gap="3" justify="start">
            <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
              {t('felles.lagre_endringer')}
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
          </HStack>
        </form>
      </Box.New>
    </main>
  )
}