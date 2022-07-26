import { BodyLong, Button, ConfirmationPanel, Heading, TextField } from '@navikt/ds-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { AppLink } from '../components/AppLink'
import { Avstand } from '../components/Avstand'
import { validerEpost } from '../epost'
import { removeWhitespaceAndDot, validerKontonummer } from '../kontonummer'
import { HentVirksomhetResponse, OpprettAvtaleRequest } from '../types'
import { useGet } from '../useGet'
import { usePost } from '../usePost'
import { Avtale } from './Avtale'

export function OpprettAvtale() {
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
        Opprett avtale for {virksomhet.navn}
      </Heading>
      <BodyLong>
        Her kan du inngå avtale om direkte oppgjør for stønad til briller til barn på vegne av firmaet ditt. Les grundig
        gjennom avtaleteksten. Kryss av for at du har satt deg inn i vilkårene for avtalen, og trykk på "inngå avtale".
      </BodyLong>
      <Avstand marginTop={5} marginBottom={5}>
        <Avtale />
      </Avstand>
      <BodyLong spacing>
        <AppLink href="/avtale.pdf" target="_blank">
          Her er avtaleteksten signert av NAV
        </AppLink>
      </BodyLong>
      <form
        onSubmit={handleSubmit(async (data) => {
          await opprettAvtale({
            orgnr: virksomhet.orgnr,
            kontonr: removeWhitespaceAndDot(data.kontonr),
            epost: data.epost,
          })
        })}
      >
        <Tekstfelt
          label="Kontonummer"
          error={errors.kontonr?.message}
          {...register('kontonr', {
            validate(kontonummer) {
              return validerKontonummer(kontonummer) ? true : 'Ugyldig kontonummer'
            },
          })}
        />
        <Avstand marginBottom={5} />
        <Tekstfelt
          label="Epost"
          error={errors.epost?.message}
          {...register('epost', {
            validate(epost) {
              return validerEpost(epost) ? true : 'Ugyldig epost'
            },
          })}
        />
        <Avstand marginTop={5} marginBottom={5}>
          <Controller
            control={control}
            name="lest"
            rules={{
              validate(value) {
                return value || 'Du må huke av for å gå videre'
              },
            }}
            render={({ field }) => (
              <ConfirmationPanel
                error={errors.lest?.message}
                label="Jeg har satt meg inn i vilkårene i avtalen, og bekrefter at firmaet forplikter seg til vilkårene i avtalen om direkte oppgjør for stønad til briller til barn."
                checked={field.value}
                {...field}
              />
            )}
          />
        </Avstand>
        <Knapper>
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
            Inngå avtale
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              navigate('/')
            }}
          >
            Avbryt
          </Button>
        </Knapper>
      </form>
    </main>
  )
}

const Knapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: var(--navds-spacing-3);
  justify-content: left;
`

const Tekstfelt = styled(TextField)`
  max-width: 330px;
`
