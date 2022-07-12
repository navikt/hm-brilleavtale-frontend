import { BodyLong, Button, ConfirmationPanel, Heading, Link, TextField } from '@navikt/ds-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Avstand } from '../components/Avstand'
import { HentVirksomhetResponse, OpprettAvtaleRequest } from '../types'
import { useGet } from '../useGet'
import { usePost } from '../usePost'

export interface OpprettAvtaleProps {}

export function OpprettAvtale(props: OpprettAvtaleProps) {
  const {} = props
  const { orgnr } = useParams<{ orgnr: string }>()
  const { data: virksomhet } = useGet<HentVirksomhetResponse>(`/avtale/virksomheter/${orgnr}`)
  const { register, control, handleSubmit } = useForm<{ kontonr: string; lest: boolean }>({
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
      <Heading level="1" size="large" spacing>
        Opprett avtale for {virksomhet.navn}
      </Heading>
      <BodyLong spacing>
        <Link href="/Brille.pdf" target="_blank">
          Åpne avtalen
        </Link>
      </BodyLong>
      <form
        onSubmit={handleSubmit(async (data) => {
          await opprettAvtale({
            orgnr: virksomhet.orgnr,
            navn: virksomhet.navn,
            kontonr: data.kontonr,
          })
        })}
      >
        <TextField label="Kontonummer" {...register('kontonr')} />
        <Avstand marginTop={5} marginBottom={5}>
          <Controller
            control={control}
            name="lest"
            render={({ field }) => (
              <ConfirmationPanel label="Jeg har lest og forstått avtalen" checked={field.value} {...field} />
            )}
          />
        </Avstand>
        <Button type="submit">Opprett avtale</Button>
      </form>
    </main>
  )
}
