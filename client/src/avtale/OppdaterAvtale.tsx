import { BodyShort, Button, Heading, TextField } from '@navikt/ds-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Avstand } from '../components/Avstand'
import { validerEpost } from '../epost'
import { removeWhitespaceAndDot, validerKontonummer } from '../kontonummer'
import { HentVirksomhetResponse, OppdaterAvtaleRequest, OppdaterAvtaleResponse } from '../types'
import { useGet } from '../useGet'
import { usePut } from '../usePut'
import { logSkjemaFullført, skjemanavn } from '../utils/amplitude'

export function OppdaterAvtale() {
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
      <Heading level="2" size="medium" spacing>
        Endre {virksomhet.navn}
      </Heading>
      <BodyShort spacing>Orgnr. {virksomhet.orgnr}</BodyShort>
      <form
        onSubmit={handleSubmit(async (data) => {
          await endreAvtale({
            kontonr: removeWhitespaceAndDot(data.kontonr),
            epost: data.epost,
          })
          logSkjemaFullført(virksomhet?.orgnr, skjemanavn.SKJEMANAVN_ENDRE)
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

const Tekstfelt = styled(TextField)`
  max-width: 330px;
`
