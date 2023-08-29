import styled from 'styled-components'

export const Data = styled.dl`
  display: grid;
  grid-template-columns: 150px auto;
  gap: var(--a-spacing-1);
  margin: 0;
  align-items: center;
  
  @media (max-width: 768px) {
    display: block;
    scale: 80%;
  }
`
