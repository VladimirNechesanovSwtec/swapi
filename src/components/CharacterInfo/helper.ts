import { Character } from '@src/models/api';
import { Config } from '@src/models/models';

const namingMap: { [k: string]: string } = {
  height: 'height',
  mass: 'mass',
  hair_color: 'hair color',
  skin_color: 'skin color',
  eye_color: 'eye color',
  birth_year: 'birth year',
  gender: 'gender',
};

const prepareConfig = (character: Character): Config[] => {
  const config: Config[] = Object.entries(character).map((item) => {
    const key = item[0];
    const value = item[1];

    if (!namingMap[key]) {
      return { title: '', value: '' };
    }

    return {
      title: namingMap[key],
      value: value as string,
    };
  });

  return config.filter((item) => !!item);
};

export default prepareConfig;
