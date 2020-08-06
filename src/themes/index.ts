//TODO: we used this here: lightTheme: DefaultTheme, was it needed?
// import { DefaultTheme } from 'styled-components';

import { lightColour, darkColour } from './defs/_colour';
import { lightEffect, darkEffect } from './defs/_effect';
import typography from './defs/_typography';

export const lightTheme = {
  colour: lightColour,
  effect: lightEffect,
  typography,
  isDark: false
};

export const darkTheme = {
  colour: darkColour,
  effect: darkEffect,
  typography,
  isDark: true
};

type ThemeType = typeof lightTheme & typeof darkTheme;

export { ThemeType };
export default lightTheme;