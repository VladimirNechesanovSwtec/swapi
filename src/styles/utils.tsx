const REM_RATIO: number = 0.0625;

// TODO: When there would be more than one method remove eslint-disable
// eslint-disable-next-line import/prefer-default-export
export const px = (pixels: number) => `${pixels * REM_RATIO}rem`;
