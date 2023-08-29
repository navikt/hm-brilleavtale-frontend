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
import {logSkjemaFullført, logSkjemaStartet, skjemanavn} from '../utils/amplitude'
import {ChevronRightIcon, DownloadIcon} from "@navikt/aksel-icons";
import {AppLink} from "../components/AppLink";
import {Dato} from "../components/Dato";

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
                <div style={{maxWidth: '70%'}}>
                    <Heading level="2" size="small">
                        {t('avtale.hovedavtale_tittel')}
                    </Heading>
                    <BodyShort size="small">
                        {t('ledetekst.opprettet')}: <Dato verdi={virksomhet.opprettet}/>
                    </BodyShort>

                    {virksomhet.utvidetAvtale && (
                        <>
                            <Avstand marginBottom={10}/>
                            <BodyShort size="medium">
                                {t('avtale.utvidet_avtale_tittel')}
                            </BodyShort>
                            <Avstand marginBottom={1}/>
                            <BodyShort size="small">
                                {t('ledetekst.opprettet')}: <Dato verdi={virksomhet.opprettet}/>
                            </BodyShort>
                        </>
                    )}
                </div>
                <LastNedKnapp>
                    <AppLink href="/avtale.pdf" target="_blank" style={{textDecoration: "none", cursor: "pointer"}}>
                        Last ned
                        <DownloadIcon title="a11y-title" fontSize="1.5rem" style={{marginLeft: '0.25rem'}}/>
                    </AppLink>

                </LastNedKnapp>
            </Avtaleboks>

            {!virksomhet.utvidetAvtale && (

                <UtvidetAvtaleBoks>
                    <Heading level="2" size="small" style={{maxWidth: '70%'}}>
                        {t('avtale.utvid_avtale_tittel')}
                    </Heading>
                    <LastNedKnapp
                        onClick={() => {
                            logSkjemaStartet(virksomhet.orgnr, skjemanavn.SKJEMANAVN_OPPRETT_UTVIDET)
                            navigate(`/opprett-utvidet-avtale/${virksomhet.orgnr}`)
                        }}
                    >
                        <div style={{display: 'flex', alignItems: 'center', cursor: "pointer"}}>
                            Se avtale
                            <ChevronRightIcon title="a11y-title"/>
                        </div>

                    </LastNedKnapp>
                </UtvidetAvtaleBoks>

            )}

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
  align-items: center;
`

const UtvidetAvtaleBoks = styled.div`
  display: flex;
  background-color: var(--a-blue-50);
  padding: var(--a-spacing-8);
  margin: var(--a-spacing-4) 0;
  border-radius: 10px;
  align-items: center;
`

const LastNedKnapp = styled.a`
  display: flex;
  color: var(--a-blue-600);
  margin-left: auto;
`
const Kontaktinformasjon = styled.div`
  margin-top: var(--a-spacing-10);
`