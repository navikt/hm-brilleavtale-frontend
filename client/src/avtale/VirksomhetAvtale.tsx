import { BodyLong, Button, ConfirmationPanel, Heading, Link, TextField } from '@navikt/ds-react'
import { Controller, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { Avstand } from '../components/Avstand'
import { HentVirksomhetResponse } from '../types'
import { useGet } from '../useGet'

export interface VirksomhetAvtaleProps {}

export function VirksomhetAvtale(props: VirksomhetAvtaleProps) {
  const {} = props
  const { orgnr } = useParams<{ orgnr: string }>()
  const { data: virksomhet } = useGet<HentVirksomhetResponse>(`/virksomheter/${orgnr}`)
  const { register, control, handleSubmit } = useForm<{ kontonr: string; lest: boolean }>({
    defaultValues: {
      kontonr: '',
      lest: false,
    },
  })
  if (!virksomhet) {
    return null
  }
  return (
    <main>
      <Heading level="1" size="large" spacing>
        Opprett avtale for {virksomhet.navn}
      </Heading>
      <BodyLong spacing>
        <Link href="/brille.pdf" target="_blank">
          Åpne avtalen
        </Link>
      </BodyLong>
      <form
        onSubmit={handleSubmit(async (data) => {
          console.log({ orgnr: virksomhet.orgnr, ...data })
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
