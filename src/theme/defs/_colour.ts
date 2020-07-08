const colour = {
  black: '#000',
  grey: '#989898',
  darkGrey: '#657786', //rgb(101,119,134)
  lightGrey: '#f5f8fa', //rgb(245,248,250)
  white: '#fff',

  red: '#df3034',
  pink: '#ca4a6c',
  turquoise: '#4acaa8',
  lightBlue: '#0693e3',
  blue: '#005ea5', //rgb(0, 94, 165)

  semantic: {}
};

colour.semantic = {
  theme: colour.turquoise,
  text: colour.black,
  link: colour.blue,
  reset: colour.red,
  negative: colour.pink
};

export default colour;