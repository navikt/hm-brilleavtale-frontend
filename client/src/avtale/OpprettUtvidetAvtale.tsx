import {BodyLong, BodyShort, Button, ConfirmationPanel, Heading, Link, Panel, TextField} from '@navikt/ds-react'
import React, {useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {useNavigate, useParams} from 'react-router-dom'
import styled from 'styled-components'
import {Avstand} from '../components/Avstand'
import {removeWhitespaceAndDot} from '../kontonummer'
import {HentVirksomhetResponse, OpprettAvtaleRequest, OpprettUtvidetAvtaleRequest} from '../types'
import {useGet} from '../useGet'
import {usePost} from '../usePost'
import {logSkjemaFullført, skjemanavn} from '../utils/amplitude'
import {UtvidetAvtale} from "./UtvidetAvtale";
import {DownloadIcon} from "@navikt/aksel-icons";
import {AppLink} from "../components/AppLink";

export function OpprettUtvidetAvtale() {
    const {t} = useTranslation()
    const {orgnr} = useParams<{ orgnr: string }>()
    const {data: virksomhet} = useGet<HentVirksomhetResponse>(`/avtale/virksomheter/${orgnr}`)
    const {
        register,
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
        getValues
    } = useForm<{ lest: boolean, bilag1: boolean, bilag2: boolean, bilag3: boolean, bilag4: boolean }>({
        defaultValues: {
            lest: false,
            bilag1: false,
            bilag2: false,
            bilag3: false,
            bilag4: false
        },
    })
    const {
        post: opprettUtvidetAvtale,
        data: utvidetAvtale
    } = usePost<OpprettUtvidetAvtaleRequest, void>('/avtale/virksomheter/utvidet')
    const navigate = useNavigate()
    useEffect(() => {
        if (utvidetAvtale) {
            navigate('/opprett-utvidet-avtale/kvittering', {
                state: utvidetAvtale,
            })
        }
    }, [utvidetAvtale])
    if (!virksomhet) {
        return null
    }
    return (
        <main>
            <Heading level="2" size="medium" spacing>
                {t('avtale.utvidet_avtale_tittel')}
            </Heading>
            <Avstand marginTop={5} marginBottom={5}>
                <Heading level="2" size="small">
                    {virksomhet.navn}
                </Heading>
                <BodyShort size="small">
                    org. nr. {virksomhet.orgnr}
                </BodyShort>
            </Avstand>
            <BodyLong>{t('utvidet_avtale.ingress')}</BodyLong>
            <Avstand marginTop={5} marginBottom={5}>
                <UtvidetAvtale/>
            </Avstand>
            <form
                onSubmit={handleSubmit(async (data) => {
                    await opprettUtvidetAvtale({
                        orgnr: virksomhet.orgnr,
                        utvidetAvtale: getValues("lest"),
                        bilag1: getValues("bilag1"),
                        bilag2: getValues("bilag2"),
                        bilag3: getValues("bilag3"),
                        bilag4: getValues("bilag4")
                    })
                    logSkjemaFullført(virksomhet?.orgnr, skjemanavn.SKJEMANAVN_OPPRETT_UTVIDET)
                })}
            >

                <Avstand marginTop={2} marginBottom={2}>
                    <Controller
                        control={control}
                        name="bilag1"
                        rules={{
                            validate(value) {
                                return value || t('avtale.må_huke_av')
                            },
                        }}
                        render={({field}) => (
                            <div style={{display: 'grid', gridTemplateColumns: '1fr auto'}}>
                                <ConfirmationPanel
                                    error={errors.bilag1?.message}
                                    label={<>{t('bilag_lest')}<i>{t('bilag1_bekreftelse')}</i></>}
                                    checked={field.value}
                                    {...field}
                                />

                                <AppLink href="/bilag1.pdf" target="_blank"
                                         style={{textDecoration: "none", cursor: "pointer", padding: '0.5rem'}}>
                                    Last ned bilag
                                    <DownloadIcon title="a11y-title" fontSize="1.5rem" style={{marginLeft: '0.25rem'}}/>
                                </AppLink>
                            </div>
                        )}
                    />
                </Avstand>

                <Avstand>
                    <Controller
                        control={control}
                        name="bilag2"
                        rules={{
                            validate(value) {
                                return value || t('avtale.må_huke_av')
                            },
                        }}
                        render={({field}) => (
                            <div style={{display: 'grid', gridTemplateColumns: '1fr auto'}}>
                                <ConfirmationPanel
                                    error={errors.bilag2?.message}
                                    label={<>{t('bilag_lest')}<i>{t('bilag2_bekreftelse')}</i></>}
                                    checked={field.value}
                                    {...field}
                                />
                                <AppLink href="/bilag2.pdf" target="_blank"
                                         style={{textDecoration: "none", cursor: "pointer", padding: '0.5rem'}}>
                                    Last ned bilag
                                    <DownloadIcon title="a11y-title" fontSize="1.5rem" style={{marginLeft: '0.25rem'}}/>
                                </AppLink>

                            </div>
                        )}
                    />
                </Avstand>

                <Avstand marginTop={2} marginBottom={2}>
                    <Controller
                        control={control}
                        name="bilag3"
                        rules={{
                            validate(value) {
                                return value || t('avtale.må_huke_av')
                            },
                        }}
                        render={({field}) => (
                            <div style={{display: 'grid', gridTemplateColumns: '1fr auto'}}>
                                <ConfirmationPanel
                                    error={errors.bilag3?.message}
                                    label={<>{t('bilag_lest')}<i>{t('bilag3_bekreftelse')}</i></>}
                                    checked={field.value}
                                    {...field}
                                />
                                <AppLink href="/bilag3.pdf" target="_blank"
                                         style={{textDecoration: "none", cursor: "pointer", padding: '0.5rem'}}>
                                    Last ned bilag
                                    <DownloadIcon title="a11y-title" fontSize="1.5rem" style={{marginLeft: '0.25rem'}}/>
                                </AppLink>

                            </div>
                        )}
                    />
                </Avstand>
                <Avstand marginTop={2} marginBottom={2}>
                    <Controller
                        control={control}
                        name="bilag4"
                        rules={{
                            validate(value) {
                                return value || t('avtale.må_huke_av')
                            },
                        }}
                        render={({field}) => (
                            <div style={{display: 'grid', gridTemplateColumns: '1fr auto'}}>
                                <ConfirmationPanel
                                    error={errors.bilag4?.message}
                                    label={<>{t('bilag_lest')}<i>{t('bilag4_bekreftelse')}</i></>}
                                    checked={field.value}
                                    {...field}
                                />
                                <AppLink href="/bilag4.pdf" target="_blank"
                                         style={{textDecoration: "none", cursor: "pointer", padding: '0.5rem'}}>
                                    Last ned bilag
                                    <DownloadIcon title="a11y-title" fontSize="1.5rem" style={{marginLeft: '0.25rem'}}/>
                                </AppLink>

                            </div>
                        )}
                    />
                </Avstand>

                <Avstand marginTop={5} marginBottom={5}>

                    <Controller
                        control={control}
                        name="lest"
                        rules={{
                            validate(value) {
                                return value || t('avtale.må_huke_av')
                            },
                        }}
                        render={({field}) => (
                            <ConfirmationPanel
                                error={errors.lest?.message}
                                label={t('utvidet_avtale.bekreftelse')}
                                checked={field.value}
                                {...field}
                            />
                        )}
                    />

                </Avstand>

                <Knapper>
                    <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
                        {t('avtale.inngå_avtale')}
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

        </main>
    )
}

const Knapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: var(--a-spacing-3);
  justify-content: left;
`
