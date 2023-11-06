import {useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {baseUrl} from '../http'
import {useTranslation} from 'react-i18next'
import {setBreadcrumbs, onBreadcrumbClick} from '@navikt/nav-dekoratoren-moduler'

const Breadcrumbs = () => {
    const {t} = useTranslation()
    const location = useLocation()
    useEffect(() => {
        const {pathname} = location
        let subBreadcrumbs = []
        if (pathname.indexOf('/oppdater-avtale/') === 0) {
            subBreadcrumbs.push({url: '/oppdater-avtale/', title: t('brødsmuler.oppdater.avtale'), handleInApp: true})
        }
        if (pathname.indexOf('/opprett-avtale/') === 0) {
            subBreadcrumbs.push({url: '/opprett-avtale/', title: t('brødsmuler.opprett.avtale'), handleInApp: true})
        }
        if (pathname.indexOf('/godta-bruksvilkar/') === 0) {
            subBreadcrumbs.push({url: '/godta-bruksvilkar/', title: t('brødsmuler.bruksvilkar'), handleInApp: true})
        }
        if (pathname.indexOf('/godta-bruksvilkarkvittering') === 0) {
            subBreadcrumbs.push({
                url: '/godta-bruksvilkarkvittering',
                title: t('brødsmuler.bruksvilkar.kvittering'),
                handleInApp: true,
            })
        }


        setBreadcrumbs([
            {url: 'https://www.nav.no/barnebriller', title: t('brødsmuler.optikers_rolle')},
            {url: '/', title: t('brødsmuler.forside'), handleInApp: true},
            ...subBreadcrumbs,
        ])
    }, [location])

    // For breadcrumbs that have "handleInApp=true" specified we have to ourselves specify how to navigate inside our app.
    const navigate = useNavigate()
    onBreadcrumbClick((bc) => {
        navigate(bc.url)
    })

    return null
}

export default Breadcrumbs
