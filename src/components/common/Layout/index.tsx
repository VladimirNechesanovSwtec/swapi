import React from 'react';
import styled from 'styled-components';

import { px } from '@src/styles/utils';
import Header from '../Header';

type Props = {
  transparentOnTop?: boolean;
};

const Container = styled.div`
  height: 100%;
  padding-top: ${px(92)};
`;

const Layout: React.FC<Props> = ({ children, transparentOnTop }) => (
  <>
    <Header transparentOnTop={transparentOnTop} />
    <Container>{children}</Container>
  </>
);
export default Layout;
