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
  aktiv: boolean
  kontonr?: string
  epost?: string
  bruksvilkår: boolean
  bruksvilkårOpprettet?: string
  avtaleversjon?: string
  opprettet?: string
  oppdatert?: string
}

export interface HentVirksomheterResponse extends Array<Virksomhet> {}

export interface HentVirksomhetResponse extends Virksomhet {}

export interface OpprettAvtaleRequest {
  orgnr: string
  kontonr: string
  epost: string
}

export interface GodtaBruksvilkårRequest {
  godtattBruksvilkår: boolean
  orgnr: string
}

export interface OpprettAvtaleResponse extends Virksomhet {}

export interface OppdaterAvtaleRequest {
  kontonr: string
  epost: string
}

export interface OppdaterAvtaleResponse extends Virksomhet {}
