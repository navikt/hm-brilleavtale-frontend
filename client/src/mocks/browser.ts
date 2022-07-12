import { RequestHandler, rest, setupWorker } from 'msw'
import { HentVirksomheterResponse, HentVirksomhetResponse, OpprettAvtaleRequest, Virksomhet } from '../types'

const virksomheter: Record<string, Virksomhet> = {
  '123456789': {
    orgnr: '123456789',
    navn: 'Optikerkjeden AS',
    harNavAvtale: false,
  },
}

const handlers: RequestHandler[] = [
  rest.get<{}, {}, HentVirksomheterResponse>('/api/avtale/virksomheter', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(Object.values(virksomheter)))
  }),
  rest.get<{}, { orgnr: string }, HentVirksomhetResponse>('/api/avtale/virksomheter/:orgnr', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(virksomheter[req.params.orgnr]))
  }),
  rest.post<OpprettAvtaleRequest, {}, {}>('/api/avtale/virksomheter', (req, res, ctx) => {
    return res(ctx.status(201))
  }),
]

export const worker = setupWorker(...handlers)
