export interface KontonummerProps {
  verdi?: string
}

export function Kontonummer(props: KontonummerProps) {
  const { verdi } = props
  if (!verdi) {
    return null
  }
  if (verdi.length !== 11) {
    return <>{verdi}</>
  }
  return <>{verdi.slice(0, 4) + ' ' + verdi.slice(4, 6) + ' ' + verdi.slice(6)}</>
}
