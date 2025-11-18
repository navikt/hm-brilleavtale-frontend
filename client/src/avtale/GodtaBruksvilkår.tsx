import { BodyLong, BodyShort, Button, Checkbox, CheckboxGroup, Heading, HStack, TextField } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Avstand } from '../components/Avstand'
import { GodtaBruksvilkårRequest, HentVirksomhetResponse } from '../types'
import { useGet } from '../useGet'
import { usePost } from '../usePost'
import { logSkjemaFullført, skjemanavn } from '../utils/amplitude'
import { Bruksvilkår } from './Bruksvilkår'

export function GodtaBruksvilkår() {
  const { t } = useTranslation()
  const { orgnr } = useParams<{ orgnr: string }>()
  const { data: virksomhet } = useGet<HentVirksomhetResponse>(`/avtale/virksomheter/${orgnr}`)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    watch,
  } = useForm<{ lest: boolean }>({
    defaultValues: {
      lest: false,
    },
  })
  const { post: godtaBruksvilkår, data: bruksvilkår } = usePost<GodtaBruksvilkårRequest, void>(
    '/avtale/virksomheter/bruksvilkar'
  )
  const navigate = useNavigate()
  const lestValue = watch('lest')

  useEffect(() => {
    if (bruksvilkår) {
      navigate('/godta-bruksvilkarkvittering', {
        state: bruksvilkår,
      })
    }
  }, [bruksvilkår])

  let dataColor = 'warning'
  if (errors.lest?.message) {
    dataColor = 'danger'
  } else if (lestValue) {
    dataColor = 'success'
  }

  if (!virksomhet) {
    return null
  }
  return (
    <main>
      <Heading level="2" size="medium" spacing>
        {t('avtale.utvidet_avtale_tittel')}
      </Heading>
      <Avstand marginTop={5} marginBottom={5}>
        <Heading level="3" size="small">
          {virksomhet.navn}
        </Heading>
        <BodyShort size="small">org. nr. {virksomhet.orgnr}</BodyShort>
      </Avstand>
      <BodyLong>{t('utvidet_avtale.ingress')}</BodyLong>
      <Avstand marginTop={5} marginBottom={5}>
        <Bruksvilkår />
      </Avstand>
      <form
        onSubmit={handleSubmit(async (data) => {
          await godtaBruksvilkår({
            orgnr: virksomhet.orgnr,
            godtattBruksvilkår: getValues('lest'),
          })
          logSkjemaFullført(virksomhet?.orgnr, skjemanavn.SKJEMANAVN_OPPRETT_UTVIDET)
        })}
      >
        <Avstand marginTop={5} marginBottom={5}>
          <Controller
            control={control}
            name="lest"
            rules={{
              validate(value) {
                return value || t('avtale.må_huke_av')
              },
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <div data-color={dataColor}>
                <div className="aksel-confirmation-panel__inner">
                  <CheckboxGroup legend={t('felles.duMåBekreftefølgende')} hideLegend error={errors.lest?.message}>
                    <Checkbox checked={value} onChange={onChange} onBlur={onBlur}>
                      {t('utvidet_avtale.bekreftelse')}
                    </Checkbox>
                  </CheckboxGroup>
                </div>
              </div>
            )}
          />
        </Avstand>

        <HStack gap="3" justify="start">
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
            {t('avtale.inngå_bruksvilkar')}
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
    </main>
  )
}
