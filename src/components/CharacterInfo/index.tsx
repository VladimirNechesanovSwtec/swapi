/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import _last from 'lodash/last';

import { getCharacterById, useCharacterByIdState, resetCharacter } from '@src/modules/characterStore';
import { getFilmsList, resetFilmStore, useFilmsState } from '@src/modules/filmsStore';

import { px } from '@src/styles/utils';
import Text from '@src/components/common/Text';
import theme from '@src/styles/theme';
import { Config } from '@src/models/models';
import Loader from '../common/Loader';
import prepareConfig from './helper';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const Content = styled.div`
  max-width: ${({ theme }) => theme.contentWidth};
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: ${px(0)} ${px(80)};
  display: flex;
  flex-direction: column;
`;

const CommonInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
  padding-top: ${px(44)};
  justify-content: center;
  align-items: center;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: row;
`;

const FilmSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${px(24)};
`;

const FilmSectionTitle = styled(Text)`
  color: ${theme.colors.casablanca};
  font-size: ${px(90)};
  justify-content: flex-start;
`;

const InfoItemTitle = styled(Text)`
  color: ${theme.colors.casablanca};
  min-width: ${px(230)};
  text-align: left;
  justify-content: flex-start;
`;

const InfoItemValue = styled(Text)`
  color: ${theme.colors.grayText};
  padding-left: ${px(12)};
  min-width: ${px(230)};
  text-align: right;
`;

const TitleSection = styled.div`
  min-width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  perspective: ${px(400)};
`;

const CharacterName = styled(Text)`
  font-size: ${px(160)};
  line-height: ${px(200)};
  text-align: center;
  color: ${theme.colors.casablanca};
  transform: rotateX(40deg) translateZ(0);
`;

const ShowFilms = styled(Text)`
  font-size: ${px(15)};
  font-weight: 100;
  color: ${theme.colors.grayText};
  cursor: pointer;
  padding-top: ${px(8)};
`;

const CharacterInfo: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { data: character, isLoading } = useCharacterByIdState();
  const { data: films, isLoading: isFilmsLoading } = useFilmsState();

  const [config, setConfig] = useState<Config[]>([]);
  const [isFilmVisible, setFilmVisibility] = useState(false);

  useEffect(() => {
    const path = history.location.pathname.split('/');

    dispatch(getCharacterById(_last(path) as string));
  }, [dispatch, history.location.pathname]);

  useEffect(() => {
    if (!character) return;

    if (isFilmVisible) {
      dispatch(getFilmsList(character.films));
    }
  }, [character, dispatch, isFilmVisible]);

  useEffect(() => {
    if (!character) return;

    setConfig(prepareConfig(character));
  }, [character]);

  useEffect(
    () => () => {
      dispatch(resetFilmStore());
      dispatch(resetCharacter());
    },
    [dispatch]
  );

  const title = useMemo(
    () => (
      <TitleSection>
        <CharacterName variant="header" bold>
          {character?.name}
        </CharacterName>
      </TitleSection>
    ),
    [character?.name]
  );

  const commonInfo = useMemo(
    () => (
      <CommonInfoSection>
        {config.map((item) => (
          <InfoItem>
            <InfoItemTitle variant="title" bold>
              {item.title}
            </InfoItemTitle>
            <InfoItemValue variant="title" bold>
              {item.value}
            </InfoItemValue>
          </InfoItem>
        ))}
      </CommonInfoSection>
    ),
    [config]
  );

  const filmSection = useMemo(
    () => (
      <FilmSection>
        <FilmSectionTitle variant="title" bold>
          films
        </FilmSectionTitle>
        {isFilmVisible ? (
          isFilmsLoading ? (
            <Loader />
          ) : (
            <InfoItem>
              {films.map((film) => (
                <InfoItemValue variant="title" bold>
                  {film.title},
                </InfoItemValue>
              ))}
            </InfoItem>
          )
        ) : (
          <ShowFilms onClick={() => setFilmVisibility(true)}>click to show films</ShowFilms>
        )}
      </FilmSection>
    ),
    [films, isFilmVisible, isFilmsLoading]
  );

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : (
        <Content>
          {title}
          {commonInfo}
          {filmSection}
        </Content>
      )}
    </Container>
  );
};

export default CharacterInfo;
