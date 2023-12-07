import React from 'react'

import styled from 'styled-components'
import { DocPencilIcon, FilesIcon, PencilLineIcon } from '@navikt/aksel-icons'

export interface IkonProps {
  bgSize?: number
  iconSize?: number
  className?: string
}

export interface IkonBakgrunnProps {
  size: number
}

export const IkonBakgrunn = styled.div<IkonBakgrunnProps>`
  border-radius: ${(props) => props.size || '40'}px;
  display: flex;
  align-items: center;
  padding-right: 1rem;
`

export const InnsendteKravIkon: React.FC<IkonProps> = ({ bgSize = 62, iconSize = 32 }) => (
  <IkonBakgrunn size={bgSize}>
    <FilesIcon aria-hidden width={iconSize} height={iconSize} />
  </IkonBakgrunn>
)

export const PennIkon: React.FC<IkonProps> = ({ bgSize = 62, iconSize = 32 }) => (
  <IkonBakgrunn size={bgSize}>
    <PencilLineIcon aria-hidden title="a11y-title" width={iconSize} height={iconSize} />
  </IkonBakgrunn>
)
