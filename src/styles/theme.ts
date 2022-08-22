import { DefaultTheme } from 'styled-components';

export const Colors = {
  white: '#fff',
  black: '#000',
  bgVeryDarkBlue: '#00061A',
  casablanca: '#F6C744',
  blackHaze: '#F4F6F6',
  gallery: '#EEEEEE',
  grayText: '#434A4A',
  ebony: '#09111A',
} as const;

const contentWidth = 1440;

const theme: DefaultTheme = {
  fontFamily: 'proxima-nova, sans-serif',
  fontFamily2: 'Montserrat, sans-serif',
  colors: Colors,
  contentWidth: `${contentWidth}px`,
};

export default theme;
