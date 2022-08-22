import React, { useMemo, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Link as _Link, useRouteMatch } from 'react-router-dom';

import { px } from '@src/styles/utils';
import Text from '@src/components/common/Text';
import paths from '@src/pages/paths';
import theme from '@src/styles/theme';

type Props = {
  transparentOnTop?: boolean;
};

const Container = styled.div<{ pageTop?: boolean; isMobileMenuOpen?: boolean; transparentOnTop?: boolean }>`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${theme.colors.bgVeryDarkBlue};
  pointer-events: ${({ pageTop, transparentOnTop }) => (transparentOnTop && pageTop ? 'none' : 'auto')};
  z-index: 5;
  transition: background-color 0.3s;
`;

const Content = styled.div<{ pageTop?: boolean; transparentOnTop?: boolean }>`
  max-width: ${({ theme }) => theme.contentWidth};
  width: 100%;
  margin: 0 auto;
  padding: ${({ pageTop, transparentOnTop }) =>
    transparentOnTop && pageTop ? `${px(48)} ${px(80)}` : `${px(24)} ${px(80)}`};
  display: flex;
  justify-content: space-between;
  transition: all 0.3s;
`;

const LogoLink = styled(_Link)`
  pointer-events: auto;
  user-select: none;
  height: ${px(44)};

  img {
    max-height: 100%;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Link = styled(_Link)<{ $active?: boolean }>`
  text-decoration: none;
  pointer-events: auto;
  text-decoration: none;
  margin-right: ${px(32)};

  ${Text} {
    color: ${({ theme, $active }) => ($active ? theme.colors.casablanca : theme.colors.white)};
  }
`;

const Header: React.FC<Props> = ({ transparentOnTop }) => {
  const vacancies = useRouteMatch(paths.characters);

  const [isPageTop, setIsPageTop] = useState(window.pageYOffset === 0);

  const handleScroll = useCallback(() => {
    setIsPageTop(window.pageYOffset <= 0);
  }, [setIsPageTop]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const links = useMemo(
    () => [
      {
        href: paths.characters,
        title: 'Characters',
        isActive: !!vacancies,
      },
    ],
    [vacancies]
  );

  const renderLogo = () => (
    <LogoLink to={paths.index}>
      <img id="star_wars_logo" src="/icons/logo.svg" alt="test project logo" />
    </LogoLink>
  );

  const getId = useCallback((title: string) => title.replace(/ /g, '_'), []);

  const renderLinks = useCallback(
    () => (
      <LinksContainer>
        {links.map((link) => (
          <Link key={link.href} to={link.href} $active={link.isActive}>
            <Text id={getId(link.title)} bold>
              {link.title}
            </Text>
          </Link>
        ))}
      </LinksContainer>
    ),
    [links, getId]
  );

  return (
    <Container pageTop={isPageTop} isMobileMenuOpen={false} transparentOnTop={transparentOnTop}>
      <Content pageTop={isPageTop} transparentOnTop={transparentOnTop}>
        {renderLogo()}
        {renderLinks()}
      </Content>
    </Container>
  );
};

export default Header;
