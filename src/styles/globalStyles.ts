import { createGlobalStyle } from 'styled-components';

import theme from '@src/styles/theme';

export default createGlobalStyle`
  html, body {
    font-size: 100%;
    margin: 0;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
  }

  body {
    color: ${theme.colors.black};
    cursor: default;
    font-family: ${theme.fontFamily};
    line-height: 1.5;
    position: relative;
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.white};
    overflow-x: hidden;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }
`;
