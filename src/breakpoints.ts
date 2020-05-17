import { css, ThemedStyledProps } from 'styled-components';

const breakpoints = {
  xsmall: '480px',
  small: '768px',
  medium: '992px',
  large: '1200px'
};

const breakpointMixin = (breakpoint: string, styles: TemplateStringsArray, props: ThemedStyledProps<any, any>) => css`
  @media (max-width: ${breakpoint}) {
    ${css(styles, props)}
  }
`;

export const xsmall = (styles: TemplateStringsArray, props?: ThemedStyledProps<any, any>) => breakpointMixin(breakpoints.xsmall, styles, props);
export const small = (styles: TemplateStringsArray, props?: ThemedStyledProps<any, any>) => breakpointMixin(breakpoints.small, styles, props);
export const medium = (styles: TemplateStringsArray, props?: ThemedStyledProps<any, any>) => breakpointMixin(breakpoints.medium, styles, props);
export const large = (styles: TemplateStringsArray, props?: ThemedStyledProps<any, any>) => breakpointMixin(breakpoints.large, styles, props);