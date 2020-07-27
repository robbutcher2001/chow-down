import { DefaultTheme } from 'styled-components';

import { lightColour, darkColour } from './defs/_colour';
import { lightEffect, darkEffect } from './defs/_effect';
import typography from './defs/_typography';

export const lightTheme: DefaultTheme = {
  colour: lightColour,
  effect: lightEffect,
  typography
};

export const darkTheme: DefaultTheme = {
  colour: darkColour,
  effect: darkEffect,
  typography
};

export default lightTheme;