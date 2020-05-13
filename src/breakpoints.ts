import { css } from 'styled-components';

const breakpoints = {
  xsmall: '480px',
  small: '768px',
  medium: '992px',
  large: '1200px'
};

const breakpointMixin = (breakpoint: string, styles: TemplateStringsArray) => css`
  @media (max-width: ${breakpoint}) {
    ${css(styles)}
  }
`;

export const xsmall = (styles: TemplateStringsArray) => breakpointMixin(breakpoints.xsmall, styles);
export const small = (styles: TemplateStringsArray) => breakpointMixin(breakpoints.small, styles);
export const medium = (styles: TemplateStringsArray) => breakpointMixin(breakpoints.medium, styles);
export const large = (styles: TemplateStringsArray) => breakpointMixin(breakpoints.large, styles);