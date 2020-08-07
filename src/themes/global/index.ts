import { createGlobalStyle } from 'styled-components';

import { ThemeType } from '../';

import spinner from './spinner';
import LatoRegular400 from '../fonts/Lato-Regular.ttf';
import LatoItalic400 from '../fonts/Lato-Italic.ttf';
import LatoRegular700 from '../fonts/Lato-Bold.ttf';
import LatoItalic700 from '../fonts/Lato-BoldItalic.ttf';

export default createGlobalStyle<{ theme: ThemeType }>`
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src: url(${LatoRegular400});
  }

  @font-face {
    font-family: 'Lato';
    font-style: italic;
    font-weight: 400;
    src: url(${LatoItalic400});
  }

  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    src: url(${LatoRegular700});
  }

  @font-face {
    font-family: 'Lato';
    font-style: italic;
    font-weight: 700;
    src: url(${LatoItalic700});
  }

  html {
    font-family: ${({ theme }) => theme.typography.fontFamily.app};
  }
  
  body {
    margin: 0;
    overflow-y: scroll;
  
    a, button, input, textarea, select {
      &:focus {
        outline: none;
      }
    }
  }

  ${spinner}
`