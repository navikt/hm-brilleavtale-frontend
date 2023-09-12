import {BodyLong, Heading, Panel} from '@navikt/ds-react'
import {useTranslation} from 'react-i18next'
import nb from './nb_utvidet_avtale.json'
import nn from './nn_utvidet_avtale.json'
import {DownloadIcon} from "@navikt/aksel-icons";
import {AppLink} from "../components/AppLink";
import React from "react";

export function UtvidetAvtale() {
    const {
        i18n: {language},
    } = useTranslation()
    const avtale: Avtaletekst = nb
    const bilagsmap = new Map<string, string>([
        ["Bilag 1", "/bilag1.pdf"],
        ["Bilag 2", "/bilag2.pdf"],
        ["Bilag 3", "/bilag3.pdf"],
        ["Bilag 4", "/bilag4.pdf"],
    ])

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
                                {t.liste?.map((listetekst, index) => (
                                    bilagsmap.has(listetekst.substring(0, 7)) ?
                                        <ul>
                                            <li>
                                                <AppLink href={bilagsmap.get(listetekst.substring(0, 7))}
                                                         target="_blank"
                                                         style={{
                                                             textDecoration: "none",
                                                             cursor: "pointer",
                                                         }}>
                                                    {listetekst}
                                                </AppLink></li>
                                        </ul>
                                        : <ul>
                                            <li>{listetekst}</li>
                                        </ul>
                                ))
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
}
