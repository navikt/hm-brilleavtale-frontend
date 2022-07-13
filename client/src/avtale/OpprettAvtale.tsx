import { BodyLong, Button, ConfirmationPanel, Heading, Link, TextField } from '@navikt/ds-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Avstand } from '../components/Avstand'
import { removeWhitespaceAndDot, validerKontonummer } from '../kontonummer'
import { HentVirksomhetResponse, OpprettAvtaleRequest } from '../types'
import { useGet } from '../useGet'
import { usePost } from '../usePost'

export function OpprettAvtale() {
  const { orgnr } = useParams<{ orgnr: string }>()
  const { data: virksomhet } = useGet<HentVirksomhetResponse>(`/avtale/virksomheter/${orgnr}`)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ kontonr: string; lest: boolean }>({
    defaultValues: {
      kontonr: '',
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
        Her kan firmaet deres inngå avtale om direkte oppgjør av stønad til briller til barn. Vi ber deg lese grundig
        gjennom avtaleteksten. Du inngår avtalen på vegne av ditt optikerfirma ved å krysse av i boksen og trykke på
        inngå avtale.
      </BodyLong>
      <BodyLong spacing>
        <Link href="/brilleavtale.pdf" target="_blank">
          Her er avtaleteksten signert av NAV
        </Link>
      </BodyLong>
      <form
        onSubmit={handleSubmit(
          async (data) => {
            await opprettAvtale({
              orgnr: virksomhet.orgnr,
              navn: virksomhet.navn,
              kontonr: removeWhitespaceAndDot(data.kontonr),
            })
          },
          (errors) => console.log(errors)
        )}
      >
        <KontonummerTextField
          label="Kontonummer"
          error={errors.kontonr?.message}
          {...register('kontonr', {
            validate(kontonummer) {
              return validerKontonummer(kontonummer) ? true : 'Ugyldig kontonummer'
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
                label="Jeg erklærer å ha satt meg inn i avtaletekstens vilkår og på vegne av optikerfirmaet å forplikte firmaet til vilkårene i avtale om direkte oppgjør om stønad til briller til barn."
                checked={field.value}
                {...field}
              />
            )}
          />
        </Avstand>
        <Knapper>
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
            Opprett avtale
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

const KontonummerTextField = styled(TextField)`
  max-width: 330px;
`
