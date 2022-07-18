import { RequestHandler, rest, setupWorker } from 'msw'
import {
  HentVirksomheterResponse,
  HentVirksomhetResponse,
  OpprettAvtaleRequest,
  OpprettAvtaleResponse,
  RedigerAvtaleRequest,
  RedigerAvtaleResponse,
  Virksomhet,
} from '../types'

const virksomheter: Record<string, Virksomhet> = {
  '123456789': {
    orgnr: '123456789',
    navn: 'Optikerkjeden AS',
    aktiv: true,
    kontonr: '12341112345',
    opprettet: '2022-07-12T12:07:08.487356',
  },
  '987654321': {
    orgnr:"987654321"',
    navn:"Sterke Briller AS"',
    aktiv: true,
    kontonr:"12341112345"',
    opprettet:"2022-07-12T12:07:08.487356",
  },
  '112233445': {
    orgnr: "112233445",
    navn: "Bedre Briller AS",
    aktiv: false
  },
  '544332211': {
    orgnr: "544332211",
    navn: "Brillesjø AS",
    aktiv: false
  },
}

const handlers: RequestHandler[] = [
  rest.get<{}, {}, HentVirksomheterResponse>('/api/avtale/virksomheter', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Object.values(virksomheter)))
  }),
  rest.get<{}, { orgnr: string }, HentVirksomhetResponse>('/api/avtale/virksomheter/:orgnr', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(virksomheter[req.params.orgnr]))
  }),
  rest.post<OpprettAvtaleRequest, {}, OpprettAvtaleResponse>('/api/avtale/virksomheter', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(virksomheter['123456789']))
  }),
  rest.put<RedigerAvtaleRequest, { orgnr: string }, RedigerAvtaleResponse>(
    '/api/avtale/virksomheter/:orgnr',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(virksomheter[req.params.orgnr]))
    }
  ),
]

export const worker = setupWorker(...handlers)
