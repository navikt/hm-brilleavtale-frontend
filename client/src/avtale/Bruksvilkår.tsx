import {BodyLong, Heading, Panel} from '@navikt/ds-react'
import {useTranslation} from 'react-i18next'
import nb from './nb_utvidet_avtale.json'
import React from "react";
import nn from './nn_utvidet_avtale.json'

export function Bruksvilkår() {
    const {
        i18n: {language},
    } = useTranslation()
    const avtale = language === 'nn' ? nn : nb

    return (
        <Panel border>
            {avtale.kapittel.map(({overskrift, avsnitt}, index) => (
                <div key={index}>
                    <Heading size="small" level="3" spacing>
                        {`${index + 1}. ${overskrift}`}
                    </Heading>
                    {avsnitt.map((t, index) => (
                        <BodyLong key={index} spacing>
                            <>
                                {t.overskrift &&
                                    <Heading size="xsmall" level="4">
                                        {t.overskrift}
                                    </Heading>
                                }
                                {t.tekst}
                                {t.lenke &&
                                    <a href={t.lenke}>{t.lenke}</a>
                                }
                            </>
                        </BodyLong>


                    ))}
                </div>
            ))}
        </Panel>
    )
}

export interface Avtaletekst {
    kapittel: Kapittel[]
}

export interface Kapittel {
    overskrift: string
    avsnitt: Avsnitt[]
}

export interface Avsnitt {
    overskrift?: string,
    tekst?: string,
    liste?: string[]
    lenke?: string
    epost?: string
}
