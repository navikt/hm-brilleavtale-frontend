import { Heading } from '@navikt/ds-react'
import { useLocation } from 'react-router-dom'

export interface AvtaleKvitteringProps {}

export function AvtaleKvittering(props: AvtaleKvitteringProps) {
  const {} = props
  const { state } = useLocation()
  return (
    <main>
      <Heading level="1" size="large">
        Kvittering
      </Heading>
      <pre>{JSON.stringify(state, null, '  ')}</pre>
    </main>
  )
}
