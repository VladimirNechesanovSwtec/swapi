import 'styled-components';

import { Colors } from '@src/styles/theme';

export type ColorType = typeof Colors;

type ContentWidth = string;

type HalfContentWidth = string;

declare module 'styled-components' {
  export interface DefaultTheme {
    fontFamily: string;
    fontFamily2: string;
    colors: ColorType;

    contentWidth: ContentWidth;
  }
}
