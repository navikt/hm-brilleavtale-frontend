import { BodyLong, Button, ConfirmationPanel, Heading, Link, TextField } from '@navikt/ds-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Avstand } from '../components/Avstand'
import { removeWhitespaceAndDot, validerKontonummer } from '../kontonummer'
import { HentVirksomhetResponse, RedigerAvtaleRequest, RedigerAvtaleResponse } from '../types'
import { useGet } from '../useGet'
import { usePut } from '../usePut'

export function RedigerAvtale() {
  const { orgnr } = useParams<{ orgnr: string }>()
  const { data: virksomhet } = useGet<HentVirksomhetResponse>(`/avtale/virksomheter/${orgnr}`)
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ kontonr: string }>({
    defaultValues: {
      kontonr: '',
    },
  })
  const { put: endreAvtale, data: avtale } = usePut<RedigerAvtaleRequest, RedigerAvtaleResponse>(
    `/avtale/virksomheter/${orgnr}`
  )

  useEffect(() => {
    if (virksomhet) {
      reset({ kontonr: virksomhet.kontonr })
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
      <Heading level="2" size="medium" spacing>
        Endre {virksomhet.navn}
      </Heading>

      <form
        onSubmit={handleSubmit(
          async (data) => {
            await endreAvtale({
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
        <Avstand marginBottom={5} />
        <Knapper>
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
            Lagre
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
