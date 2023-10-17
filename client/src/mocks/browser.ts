import { RequestHandler, rest, setupWorker } from 'msw'
import { apiUrl } from '../http'
import {
  HentVirksomheterResponse,
  HentVirksomhetResponse,
  OpprettAvtaleRequest,
  OpprettAvtaleResponse,
  OppdaterAvtaleRequest,
  OppdaterAvtaleResponse,
  Virksomhet, GodtaBruksvilkårRequest,
} from '../types'

const virksomheter: Record<string, Virksomhet> = {
  '123456789': {
    orgnr: '123456789',
    navn: 'Optikerkjeden AS',
    aktiv: true,
    bruksvilkår: true,
    bruksvilkårGodtattDato: '2023-08-10T14:27:31.487356',
    bruksvilkårEpost: 'teknisk@test',
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
  rest.get<{}, {}, HentVirksomheterResponse>(apiUrl('/avtale/virksomheter'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Object.values(virksomheter)))
  }),
  rest.get<{}, { orgnr: string }, HentVirksomhetResponse>(apiUrl('/avtale/virksomheter/:orgnr'), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(virksomheter[req.params.orgnr]))
  }),
  rest.post<OpprettAvtaleRequest, {}, OpprettAvtaleResponse>(apiUrl('/avtale/virksomheter'), (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(virksomheter['123456789']))
  }),
  rest.post<GodtaBruksvilkårRequest, {}, OpprettAvtaleResponse>(apiUrl('/avtale/virksomheter/bruksvilkar'), (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(virksomheter['123456789']))
  }),
  rest.put<OppdaterAvtaleRequest, { orgnr: string }, OppdaterAvtaleResponse>(
    apiUrl('/avtale/virksomheter/:orgnr'),
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(virksomheter[req.params.orgnr]))
    }
  ),
]

export const worker = setupWorker(...handlers)
