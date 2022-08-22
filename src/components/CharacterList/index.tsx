import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { px } from '@src/styles/utils';
import { getAllCharacterList, useCharacterListState } from '@src/modules/characterStore';
import theme from '@src/styles/theme';
import Loader from '../common/Loader';
import CharacterCard from '../common/CharacterCard';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  max-width: ${theme.contentWidth};
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: ${px(24)} ${px(80)};
  display: flex;
  flex-wrap: wrap;
`;

const Search = styled.input`
  max-width: ${theme.contentWidth};
  width: 50%;
  padding: ${px(5)};
  margin: ${px(24)} ${px(80)};
  outline: none;
  border: ${px(1)} solid ${theme.colors.blackHaze};
  border-radius: ${px(6)};
  color: ${theme.colors.casablanca};

  ::placeholder,
  ::-webkit-input-placeholder {
    font-weight: lighter;
    color: ${theme.colors.casablanca};
  }
`;

const CharacterList: React.FC = () => {
  const dispatch = useDispatch();
  const { data: characterList, isLoading } = useCharacterListState();

  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    dispatch(getAllCharacterList());
  }, [dispatch]);

  const list = useMemo(
    () =>
      characterList?.results.map((character) => <CharacterCard characterName={character.name} url={character.url} />),
    [characterList?.results]
  );

  const foundCard = useMemo(
    () =>
      characterList?.results
        .map((character) => {
          if (character.name.toLocaleLowerCase().includes(searchValue.toLowerCase())) return character;

          return null;
        })
        .map((foundCharacter) => {
          if (foundCharacter) return <CharacterCard characterName={foundCharacter.name} url={foundCharacter.url} />;

          return null;
        }),
    [characterList?.results, searchValue]
  );

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Search
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter character name"
          />
          <Content>{searchValue ? foundCard : list}</Content>
        </>
      )}
    </Container>
  );
};

export default CharacterList;
