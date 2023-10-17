import {BodyLong, BodyShort, Button, ConfirmationPanel, Heading, TextField} from '@navikt/ds-react'
import React, {useEffect} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useTranslation} from 'react-i18next'
import {useNavigate, useParams} from 'react-router-dom'
import styled from 'styled-components'
import {Avstand} from '../components/Avstand'
import {GodtaBruksvilkårRequest, HentVirksomhetResponse} from '../types'
import {useGet} from '../useGet'
import {usePost} from '../usePost'
import {logSkjemaFullført, skjemanavn} from '../utils/amplitude'
import {Bruksvilkår} from "./Bruksvilkår";
import {validerEpost} from "../epost";

export function GodtaBruksvilkår() {
    const {t} = useTranslation()
    const {orgnr} = useParams<{ orgnr: string }>()
    const {data: virksomhet} = useGet<HentVirksomhetResponse>(`/avtale/virksomheter/${orgnr}`)
    const {
        register,
        control,
        handleSubmit,
        formState: {errors, isSubmitting},
        getValues
    } = useForm<{ lest: boolean, epostKontaktperson: string }>({
        defaultValues: {
            lest: false,
            epostKontaktperson: ''
        },
    })
    const {
        post: godtaBruksvilkår,
        data: bruksvilkår
    } = usePost<GodtaBruksvilkårRequest, void>('/avtale/virksomheter/bruksvilkar')
    const navigate = useNavigate()
    useEffect(() => {
        if (bruksvilkår) {
            navigate('/godta-bruksvilkarkvittering', {
                state: bruksvilkår,
            })
        }
    }, [bruksvilkår])
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
                <Bruksvilkår/>
            </Avstand>
            <form
                onSubmit={handleSubmit(async (data) => {
                    await godtaBruksvilkår({
                        orgnr: virksomhet.orgnr,
                        epostKontaktperson: getValues("epostKontaktperson"),
                        godtattBruksvilkår: getValues("lest"),
                    })
                    logSkjemaFullført(virksomhet?.orgnr, skjemanavn.SKJEMANAVN_OPPRETT_UTVIDET)
                })}
            >
                <Avstand marginBottom={5} />
                <Tekstfelt
                    label={t('ledetekst.epost-bruksvilkar')}
                    error={errors.epostKontaktperson?.message}
                    {...register('epostKontaktperson', {
                        validate(epost) {
                            return validerEpost(epost) ? true : t('felles.ugyldig_epost')
                        },
                    })}
                />

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
const Tekstfelt = styled(TextField)`
  max-width: 330px;
`