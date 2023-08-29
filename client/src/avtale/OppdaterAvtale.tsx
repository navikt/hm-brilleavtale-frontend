import {BodyShort, Button, Heading, TextField} from '@navikt/ds-react'
import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {useNavigate, useParams} from 'react-router-dom'
import styled from 'styled-components'
import {Avstand} from '../components/Avstand'
import {validerEpost} from '../epost'
import {removeWhitespaceAndDot, validerKontonummer} from '../kontonummer'
import {HentVirksomhetResponse, OppdaterAvtaleRequest, OppdaterAvtaleResponse} from '../types'
import {useGet} from '../useGet'
import {usePut} from '../usePut'
import {logSkjemaFullført, skjemanavn} from '../utils/amplitude'
import {DownloadIcon} from "@navikt/aksel-icons";

export function OppdaterAvtale() {
    const {t} = useTranslation()
    const {orgnr} = useParams<{ orgnr: string }>()
    const {data: virksomhet} = useGet<HentVirksomhetResponse>(`/avtale/virksomheter/${orgnr}`)
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<{ kontonr: string; epost: string }>({
        defaultValues: {
            kontonr: '',
            epost: '',
        },
    })
    const {put: endreAvtale, data: avtale} = usePut<OppdaterAvtaleRequest, OppdaterAvtaleResponse>(
        `/avtale/virksomheter/${orgnr}`
    )

    useEffect(() => {
        if (virksomhet) {
            reset({kontonr: virksomhet.kontonr, epost: virksomhet.epost})
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

            <Avtaleboks>
                <Heading level="2" size="xsmall" spacing>
                    Avtale om direkte oppgjør av briller til barn
                </Heading>
                <LastNedKnapp>
                    Last ned
                    <DownloadIcon title="a11y-title" fontSize="1.5rem" style={{marginLeft: '0.25rem'}}/>
                </LastNedKnapp>
            </Avtaleboks>



            <Kontaktinformasjon>
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
                    <Tekstfelt
                        label={t('ledetekst.kontonr')}
                        error={errors.kontonr?.message}
                        {...register('kontonr', {
                            validate(kontonummer) {
                                return validerKontonummer(kontonummer) ? true : t('felles.ugyldig_kontonr')
                            },
                        })}
                    />
                    <Avstand marginBottom={5}/>
                    <Tekstfelt
                        label={t('ledetekst.epost')}
                        error={errors.epost?.message}
                        {...register('epost', {
                            validate(epost) {
                                return validerEpost(epost) ? true : t('felles.ugyldig_epost')
                            },
                        })}
                    />
                    <Avstand marginBottom={5}/>
                    <Knapper>
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
                    </Knapper>
                </form>
            </Kontaktinformasjon>
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

const Avtaleboks = styled.div`
  display: flex;
  background-color: var(--a-gray-100);
  padding: var(--a-spacing-8);
  margin: var(--a-spacing-4) 0;
  border-radius: 10px;
`

const LastNedKnapp = styled.a`
  display: flex;
  color: var(--a-blue-600);
  margin-left: auto;
`
const Kontaktinformasjon = styled.div`
  margin-top: var(--a-spacing-10);
`