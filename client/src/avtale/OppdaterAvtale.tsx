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
import {PennIkon} from "../resources/ikoner/Ikon";

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
            <Avtalecontainer>
                <Avtalerad>
                    <Avtaleboks>
                        <div style={{maxWidth: '100%'}}>
                            <Heading level="2" size="small">
                                {t('avtale.hovedavtale_tittel')}
                            </Heading>
                            <BodyShort size="small" style={{color: '#525962'}}>
                                {t('ledetekst.opprettet')}: <Dato verdi={virksomhet.opprettet}/>
                            </BodyShort>
                        </div>
                    </Avtaleboks>
                    <LastNedKnapp>
                        <AppLink href="/avtale.pdf" target="_blank" style={{textDecoration: "none", cursor: "pointer"}}>
                            {t('last.ned')}
                            <DownloadIcon title="a11y-title" fontSize="1.5rem" style={{marginLeft: '0.25rem'}}/>
                        </AppLink>

                    </LastNedKnapp>
                </Avtalerad>


                {virksomhet.bruksvilkår && (
                    <>
                        <hr style={{width: '100%'}}/>
                        <Avtalerad>

                            <Avtaleboks>
                                <div style={{maxWidth: '100%'}}>
                                    <BodyShort size="medium">
                                        {t('avtale.utvidet_avtale_tittel')}
                                    </BodyShort>
                                    <BodyShort size="small" style={{color: '#525962'}}>
                                        {t('ledetekst.opprettet')}: <Dato verdi={virksomhet.bruksvilkårOpprettet}/>
                                    </BodyShort>
                                </div>
                            </Avtaleboks>
                            <LastNedKnapp>
                                <AppLink href="/bruksvilkar_1_0.pdf" target="_blank"
                                         style={{textDecoration: "none", cursor: "pointer"}}>
                                    Last ned
                                    <DownloadIcon title="a11y-title" fontSize="1.5rem" style={{marginLeft: '0.25rem'}}/>
                                </AppLink>

                            </LastNedKnapp>
                        </Avtalerad>
                    </>
                )}


            </Avtalecontainer>


            {!virksomhet.bruksvilkår && (

                <BruksvilkårBoks>
                    <PennIkon/>
                    <Heading level="2" size="small" style={{maxWidth: '70%'}}>
                        {t('avtale.utvidet_avtale_tittel')}
                    </Heading>
                    <LastNedKnapp
                        onClick={() => {
                            logSkjemaStartet(virksomhet.orgnr, skjemanavn.SKJEMANAVN_OPPRETT_UTVIDET)
                            navigate(`/godta-bruksvilkar/${virksomhet.orgnr}`)
                        }}
                    >
                        <div style={{display: 'flex', alignItems: 'center', cursor: "pointer"}}>
                            {t('avtale.se_bruksvilkar')}
                            <ChevronRightIcon title="a11y-title"/>
                        </div>

                    </LastNedKnapp>
                </BruksvilkårBoks>
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

`

const Avtalerad = styled.div`
  display: flex;
  padding: var(--a-spacing-4) 0;
`

const Avtalecontainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--a-gray-100);
  border-radius: 10px;
  padding: var(--a-spacing-2) var(--a-spacing-6);
  margin: var(--a-spacing-2) 0;
`

const BruksvilkårBoks = styled.div`
  display: flex;
  background-color: var(--a-blue-50);
  border-radius: 10px;
  align-items: center;
  padding: var(--a-spacing-6) var(--a-spacing-6);
  margin: var(--a-spacing-2) 0;
`

const LastNedKnapp = styled.a`
  display: flex;
  color: var(--a-blue-600);
  padding: var(--a-spacing-4);
  margin-left: auto;
  flex-shrink: 0;
`
const Kontaktinformasjon = styled.div`
  margin-top: var(--a-spacing-10);
`