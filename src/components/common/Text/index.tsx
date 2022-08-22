import styled from 'styled-components';

import theme from '@src/styles/theme';
import { px } from '@src/styles/utils';

type TextVariant = 'title' | 'header' | 'main';

type Props = {
  variant?: TextVariant;
  bold?: boolean;
};

const getFontFamily = (variant: TextVariant) => {
  switch (variant) {
    case 'header':
      return theme.fontFamily2;
    default:
      return theme.fontFamily;
  }
};

const getFontSize = (variant: TextVariant) => {
  switch (variant) {
    case 'title':
      return px(28);
    case 'header':
      return px(60);
    case 'main':
    default:
      return px(16);
  }
};

const getLineHeight = (variant: TextVariant) => {
  switch (variant) {
    case 'title':
      return px(54);
    case 'header':
      return px(64);
    case 'main':
    default:
      return px(32);
  }
};

const getTextTag = (variant: TextVariant) => {
  switch (variant) {
    case 'header':
      return 'h1';
    case 'main':
    default:
      return 'p';
  }
};

export default styled.p.attrs(({ variant = 'main' }: Props) => ({ as: getTextTag(variant) }))<Props>`
  font-family: ${({ variant = 'main' }) => getFontFamily(variant)};
  font-size: ${({ variant = 'main' }) => getFontSize(variant)};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  line-height: ${({ variant = 'main' }) => getLineHeight(variant)};
`;
