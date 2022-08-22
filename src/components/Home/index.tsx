import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import { px } from '@src/styles/utils';
import theme from '@src/styles/theme';
import Text from '@src/components/common/Text';
import { setNightSky } from '@src/utils';

const textMovement = keyframes`
  from {
    top: ${px(700)};
    transform: rotateX(40deg) translateZ(0);
  }
  to { 
    top: ${px(-6000)};
    transform: rotateX(45deg) translateZ(-2500px);
  }
`;

const Container = styled.div`
  height: 100%;
  width: 100vw;
  background-color: ${theme.colors.black};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-top: ${px(92)};
`;

const WelcomeText = styled(Text)`
  position: relative;
  transform-origin: 50% 100%;
  animation: ${textMovement} 200s linear infinite;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: ${px(800)};
  height: 100%;
  color: ${theme.colors.casablanca};
  font-size: 500%;
  font-weight: 600;
  letter-spacing: ${px(6)};
  line-height: 150%;
  perspective: ${px(400)};
  text-align: justify;
`;

const Home: React.FC = () => {
  useEffect(() => {
    setNightSky('space');
  }, []);

  return (
    <Container id="space">
      <Content>
        <WelcomeText variant="header">{`
      welcome to the main page
      of the Star Wars API testing app https://swapi.dev.
      To see the list of available characters,\n click on the corresponding section in the header.
      If you want to come back, click on the Star Wars logo`}</WelcomeText>
      </Content>
    </Container>
  );
};

export default Home;
