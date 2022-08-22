/* eslint-disable no-plusplus */

const MAX_COUNT_OF_STARS = 800;

export const setNightSky = (elementId: string) => {
  const elem = document.getElementById(elementId);

  for (let i = 0; i < MAX_COUNT_OF_STARS; i++) {
    const dot = document.createElement('div');
    dot.style.width = `${Math.floor(Math.random() * 3)}px`;
    dot.style.height = `${Math.floor(Math.random() * 3)}px`;
    dot.style.backgroundColor = '#5f5f5f';
    dot.style.borderRadius = '3px';
    dot.style.top = `${Math.floor(Math.random() * 100)}vh`;
    dot.style.left = `${Math.floor(Math.random() * 100)}vw`;
    dot.style.position = 'absolute';

    elem?.appendChild(dot);
  }
};

export const getId = (url: string) => {
  const expression = /^((http[s]):\/)?\/?([^:/\s]+)((\/\w+)*\/)([\w\-.]+[^#?\s]+)(.*)?(#[\w-]+)?$/;
  const regex = new RegExp(expression);

  const res = url.match(regex);

  return (res as RegExpMatchArray)[6].substring(0, (res as RegExpMatchArray)[6].length - 1);
};
