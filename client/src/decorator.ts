import { Locale, setParams } from '@navikt/nav-dekoratoren-moduler'
import Cookies from 'js-cookie'
import { baseUrl } from './http'
import i18n, { changeLanguage } from 'i18next'

export interface Params {
  context?: 'privatperson' | 'arbeidsgiver' | 'samarbeidspartner'
  simple?: boolean
  enforceLogin?: boolean
  redirectToApp?: boolean
  redirectToUrl?: string
  level?: string
  language?: Locale
  utilsBackground?: 'white' | 'gray' | 'transparent'
  feedback?: boolean
  chatbot?: boolean
  taSurveys?: string
  urlLookupTable?: boolean
  shareScreen?: boolean
  utloggingsvarsel?: boolean
  logoutUrl?: string
}

const DECORATOR_LANGUAGE_COOKIE = 'decorator-language'
const DEFAULT_PARAMS: Params = {
  chatbot: false,
  simple: false,
  feedback: false,
  context: 'samarbeidspartner',
}
const SPRAAK = ['nb', 'nn']

export const initDecorator = () => {
  let language = Cookies.get(DECORATOR_LANGUAGE_COOKIE)

  if (language === undefined || !SPRAAK.includes(language)) {
    language = 'nb'
  }

  changeLanguage(language)
  setParams({
    ...DEFAULT_PARAMS,
    language: language as Locale,
    availableLanguages: [
      { locale: 'nb', url: baseUrl(), handleInApp: true },
      { locale: 'nn', url: baseUrl(), handleInApp: true },
    ],
  })
}