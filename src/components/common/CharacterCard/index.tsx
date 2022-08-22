import React, { useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

import { px } from '@src/styles/utils';
import paths from '@src/pages/paths';
import theme from '@src/styles/theme';
import Text from '@src/components/common/Text';

type Props = {
  characterName: string;
  url: string;
};

const textResizing = keyframes`
  from {
    font-size: ${px(28)};
  }

  to {
    font-size: ${px(33)};
  }
`;

const Name = styled(Text)`
  color: ${theme.colors.casablanca};
`;

const Card = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${px(300)};
  height: ${px(400)};
  border: ${px(1)} solid ${theme.colors.blackHaze};
  border-radius: ${px(6)};
  text-decoration: none;
  margin: 0 ${px(20)} ${px(20)} 0;
  background-color: ${theme.colors.blackHaze};

  &:hover {
    box-shadow: 0 ${px(11)} ${px(13)} ${theme.colors.gallery};
  }

  &:hover ${Name} {
    animation: ${textResizing} 0.3s linear;
    font-size: ${px(33)};
  }
`;

const CharacterCard: React.FC<Props> = ({ characterName, url }: Props) => {
  const getId = useCallback((url: string) => {
    const expression = /^((http[s]):\/)?\/?([^:/\s]+)((\/\w+)*\/)([\w\-.]+[^#?\s]+)(.*)?(#[\w-]+)?$/;
    const regex = new RegExp(expression);

    const res = url.match(regex);

    return res;
  }, []);

  return (
    <Card
      key={url}
      to={paths.character(
        (getId(url) as RegExpMatchArray)[6].substring(0, (getId(url) as RegExpMatchArray)[6].length - 1)
      )}
    >
      <Name variant="title" bold>
        {characterName}
      </Name>
    </Card>
  );
};

export default CharacterCard;
