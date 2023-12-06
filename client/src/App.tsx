import { Heading } from '@navikt/ds-react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'
import { Route, Routes } from 'react-router-dom'
import { AvtaleKvittering } from './avtale/AvtaleKvittering'
import { OppdaterAvtale } from './avtale/OppdaterAvtale'
import { OpprettAvtale } from './avtale/OpprettAvtale'
import { Banner } from './components/Banner'
import { isHttpError } from './error'
import { Feilside } from './Feilside'
import { Virksomheter } from './virksomhet/Virksomheter'
import { Helmet } from 'react-helmet-async'
import { GodtaBruksvilkår } from './avtale/GodtaBruksvilkår'
import { BruksvilkårKvittering } from './avtale/BruksvilkårKvittering'
import Breadcrumbs from './components/Breadcrumbs'

export function App() {
    const {t} = useTranslation()

    return (
        <ErrorBoundary
            fallbackRender={({error}) => {
                if (isHttpError(error)) {
                    return <Feilside status={error.status} error={error}/>
                } else {
                    return <Feilside status={500} error={error}/>
                }
            }}
        >
            <Breadcrumbs/>
            <header>
                <Banner>
                    <Heading level="1" size="large">
                        {t('banner')}
                    </Heading>
                </Banner>
            </header>
            <Routes>
                <Route path="/" element={<SettTittel title="helmet.title.virksomheter"><Virksomheter/></SettTittel>}/>
                <Route path="/opprett-avtale/kvittering"
                       element={<SettTittel title="helmet.title.avtale_kvittering"><AvtaleKvittering/></SettTittel>}/>
                <Route path="/godta-bruksvilkarkvittering" element={<SettTittel
                    title="helmet.title.avtale_kvittering"><BruksvilkårKvittering/></SettTittel>}/>
                <Route path="/opprett-avtale/:orgnr"
                       element={<SettTittel title="helmet.title.opprett_avtale"><OpprettAvtale/></SettTittel>}/>
                <Route path="/godta-bruksvilkar/:orgnr"
                       element={<SettTittel title="helmet.title.opprett_avtale"><GodtaBruksvilkår/></SettTittel>}/>
                <Route path="/oppdater-avtale/:orgnr"
                       element={<SettTittel title="helmet.title.oppdater_avtale"><OppdaterAvtale/></SettTittel>}/>
                <Route path="*"
                       element={<SettTittel title="helmet.title.feilside"><Feilside status={404}/></SettTittel>}/>
            </Routes>
            <Breadcrumbs/>
        </ErrorBoundary>
    )
}

const SettTittel = ({title, children}: { title: string, children?: React.ReactNode }) => {
    const {t} = useTranslation()
    return (
        <>
            <Helmet htmlAttributes={{lang: 'no'}}>
                <title>{t(title)}</title>
            </Helmet>
            {children}
        </>
    )
};
