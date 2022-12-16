import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  main {
    width: 680px;
    margin: 0 auto;
    padding: 40px;
    
     @media (max-width: 768px) {
        width: 80%;
        padding: 10px;
    }
    
  }
`
