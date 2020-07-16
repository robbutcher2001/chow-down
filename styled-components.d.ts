import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colours: object,
    effect: object,
    typography: object
  }
}