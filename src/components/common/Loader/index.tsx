import React from 'react';
import styled, { keyframes } from 'styled-components';

import { px } from '@src/styles/utils';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  min-height: ${px(192)};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Spinner = styled.div`
  width: ${px(96)};
  height: ${px(96)};
  border-radius: 50%;
  display: inline-block;
  border-top: ${px(5)} solid ${({ theme }) => theme.colors.casablanca};
  border-right: ${px(5)} solid transparent;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;

const Loader: React.FC = () => (
  <LoaderContainer>
    <Spinner />
  </LoaderContainer>
);

export default Loader;
