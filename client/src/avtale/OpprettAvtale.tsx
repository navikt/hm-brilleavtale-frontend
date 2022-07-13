import { BodyLong, Button, ConfirmationPanel, Heading, Link, Panel, TextField } from '@navikt/ds-react'
import PDFObject from 'pdfobject'
import { useEffect, useRef } from 'react'
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
        Her kan du inngå avtale om direkte oppgjør av stønad til briller til barn på vegne av firmaet ditt. Vi ber deg
        lese grundig gjennom avtaleteksten. Du inngår avtalen ved å krysse av for at du har satt deg inn i vilkårene for
        avtalen og trykke inngå avtale.
      </BodyLong>

      <EmbeddedPDF href="/brilleavtale.pdf#toolbar=0" />
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
                label="Jeg erklærer å ha satt meg inn i avtaletekstens vilkår og at firmaet forplikter seg til fylle vilkårene i avtalen om direkte oppgjør om stønad til briller til barn."
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

function EmbeddedPDF({ href }: { href: string }) {
  const embed = useRef(null)
  useEffect(() => {
    PDFObject.embed(href, embed.current, {})
  }, [href])
  return <Content ref={embed} border></Content>
}

const Content = styled(Panel)`
  height: 90vh;
  padding: 0;
  margin: var(--navds-spacing-5) 0;
`
