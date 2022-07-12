import type { HttpError } from './error'

export type Nullable<T> = T | null
export type Maybe<T> = T | undefined

export interface Resultat<T> {
  data?: T
  error?: HttpError
  loading?: boolean
}

export interface Virksomhet {
  orgnr: string
  navn: string
  harNavAvtale: boolean
  kontonr?: string
  avtaleVersjon?: string
}

export interface HentVirksomheterResponse extends Array<Virksomhet> {}

export interface HentVirksomhetResponse extends Virksomhet {}

export interface OpprettAvtaleRequest {
  orgnr: string
  kontonr: string
}
