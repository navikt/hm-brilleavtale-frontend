import { http, HttpResponse, RequestHandler } from 'msw'
import { apiUrl } from '../http'
import {
  GodtaBruksvilkårRequest,
  HentVirksomheterResponse,
  HentVirksomhetResponse,
  OppdaterAvtaleRequest,
  OppdaterAvtaleResponse,
  OpprettAvtaleRequest,
  OpprettAvtaleResponse,
  Virksomhet,
} from '../types'
import { setupWorker } from "msw/browser";

const virksomheter: Record<string, Virksomhet> = {
  '123456789': {
    orgnr: '123456789',
    navn: 'Optikerkjeden AS',
    aktiv: true,
    bruksvilkår: true,
    bruksvilkårOpprettet: '2023-08-10T14:27:31.487356',
    kontonr: '12341112345',
    epost: 'test@test',
    opprettet: '2023-02-12T12:07:08.487356',
  },
  '987654321': {
    orgnr: '987654321',
    navn: 'Sterke Briller AS',
    aktiv: true,
    bruksvilkår: false,
    kontonr: '12341112345',
    epost: 'test@test',
    opprettet: '2022-07-12T12:07:08.487356',
  },
  '112233445': {
    orgnr: '112233445',
    navn: 'Bedre Briller AS',
    aktiv: false,
    bruksvilkår: false,
  },
  '544332211': {
    orgnr: '544332211',
    navn: 'Brillesjø AS',
    aktiv: false,
    bruksvilkår: false,
  },
}

const handlers: RequestHandler[] = [
  http.get<{}, {}, HentVirksomheterResponse>(apiUrl('/avtale/virksomheter'), ({}) => {
    return HttpResponse.json(Object.values(virksomheter))
  }),
  http.get<{ orgnr: string }, {}, HentVirksomhetResponse>(apiUrl('/avtale/virksomheter/:orgnr'), ({ params }) => {
    return HttpResponse.json(virksomheter[params.orgnr])
  }),
  http.post<OpprettAvtaleRequest, {}, OpprettAvtaleResponse>(apiUrl('/avtale/virksomheter'), () => {
    return HttpResponse.json(virksomheter['123456789'], { status: 201 })
  }),
  http.post<{}, GodtaBruksvilkårRequest, OpprettAvtaleResponse>(
    apiUrl('/avtale/virksomheter/bruksvilkar'),
    () => {
      return HttpResponse.json(virksomheter['123456789'], { status: 201 })
    }
  ),
  http.put<{ orgnr: string }, OppdaterAvtaleRequest, OppdaterAvtaleResponse>(
    apiUrl('/avtale/virksomheter/:orgnr'),
    ({ params }) => {
      return HttpResponse.json(virksomheter[params.orgnr])
    }
  ),
]

export const worker = setupWorker(...handlers)
