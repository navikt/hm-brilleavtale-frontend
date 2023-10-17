import {LinkPanel} from '@navikt/ds-react'
import {useNavigate} from 'react-router-dom'
import {Data} from '../components/Data'
import {Dato} from '../components/Dato'
import {Datum} from '../components/Datum'
import {Kontonummer} from '../components/Kontonummer'
import {Organisasjonsnummer} from '../components/Organisasjonsnummer'
import {Virksomhet} from '../types'
import {logSkjemaStartet, skjemanavn} from '../utils/amplitude'

export interface AvtalePanelProps {
    virksomhet: Virksomhet
}

export function BruksvilkårPanel(props: AvtalePanelProps) {
    const {virksomhet} = props
    const navigate = useNavigate()
    return (
        <LinkPanel
            tabIndex={0}
            onClick={() => {
                logSkjemaStartet(virksomhet.orgnr, skjemanavn.SKJEMANAVN_ENDRE_BRUKSVILKÅR)
                navigate(`/oppdater-avtale/${virksomhet.orgnr}`)
            }}
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    logSkjemaStartet(virksomhet.orgnr, skjemanavn.SKJEMANAVN_ENDRE_BRUKSVILKÅR)
                    navigate(`/oppdater-avtale/${virksomhet.orgnr}`)
                }
            }}
        >
            <LinkPanel.Title className="navds-heading--small">{virksomhet.navn}</LinkPanel.Title>
            <LinkPanel.Description>
                <Data>
                    <Datum label="ledetekst.orgnr">
                        <Organisasjonsnummer verdi={virksomhet.orgnr}/>
                    </Datum>
                    <Datum label="ledetekst.dato_opprettet">
                        <Dato verdi={virksomhet.opprettet}/>
                    </Datum>
                    <Datum label="ledetekst.epost-bruksvilkar">{virksomhet.bruksvilkårEpost}</Datum>
                </Data>
            </LinkPanel.Description>
        </LinkPanel>
    )
}
