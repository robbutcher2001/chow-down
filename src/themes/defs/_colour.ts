export const lightColour = {
  black: '#000',
  lightBlack: 'rgba(0, 0, 0, 0.6)',
  grey: '#989898',
  darkGrey: '#657786', //rgb(101,119,134)
  lightGrey: '#f5f8fa', //rgb(245,248,250)
  lightestGrey: '#fafafa',
  white: '#fff',

  red: '#df3034',
  pink: '#ca4a6c',
  turquoise: '#4acaa8',
  lightBlue: '#0693e3',
  blue: '#005ea5', //rgb(0, 94, 165)

  semantic: {}
};

lightColour.semantic = {
  theme: lightColour.turquoise,
  text: lightColour.black,
  link: lightColour.blue,
  reset: lightColour.red,
  negative: lightColour.pink
};

export const darkColour = {
  black: '#000',
  lightBlack: 'rgba(0, 0, 0, 0.6)',
  grey: '#989898',
  darkGrey: '#201f1f',
  lightGrey: '#2d2c2c',
  lightestGrey: '#fafafa',
  white: '#fff',

  red: '#df3034',
  pink: 'hsl(344 45% 54% / 1)',
  turquoise: 'hsl(164 40% 54% / 1)',
  lightBlue: 'hsl(202 50% 46% / 1)',
  blue: '#005ea5', //rgb(0, 94, 165)

  semantic: {}
};

darkColour.semantic = {
  theme: darkColour.turquoise,
  text: darkColour.black,
  link: darkColour.blue,
  reset: darkColour.red,
  negative: darkColour.pink
};

export default lightColour;