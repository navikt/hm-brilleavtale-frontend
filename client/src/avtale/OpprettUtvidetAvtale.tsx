import {BodyLong, BodyShort, Button, ConfirmationPanel, Heading, Panel, TextField} from '@navikt/ds-react'
import {useEffect} from 'react'
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

export function OpprettUtvidetAvtale() {
    const {t} = useTranslation()
    const {orgnr} = useParams<{ orgnr: string }>()
    const {data: virksomhet} = useGet<HentVirksomhetResponse>(`/avtale/virksomheter/${orgnr}`)
    const {
        register,
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm<{ lest: boolean }>({
        defaultValues: {
            lest: false,
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
                        orgnr: virksomhet.orgnr
                    })
                    logSkjemaFullført(virksomhet?.orgnr, skjemanavn.SKJEMANAVN_OPPRETT_UTVIDET)
                })}
            >

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
                                label={t('avtale.bekreftelse')}
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
