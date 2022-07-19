import { Link } from '@navikt/ds-react'
import { LinkProps } from '@navikt/ds-react/src/link/Link'
import { baseUrl } from '../http'

export function AppLink(props: LinkProps) {
  const { href, children, ...rest } = props
  return (
    <Link href={baseUrl() + href} {...rest}>
      {children}
    </Link>
  )
}
