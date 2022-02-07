
export const colorToHex = (color) => {
  if (color < 0 || color > 255) {
    return '';
  }
  const hex = color.toString(16);
  return hex.length === 1? '0' + hex : hex;
};

export const alphaToHex = (alpha) => {
  if (alpha < 0 || alpha > 1) {
    return '';
  }
  return Math.round(alpha * 255).toString(16);
};

export const rgbaToHex = ({ r, g, b, a}) => {
  return '#' + colorToHex(r) + colorToHex(g) + colorToHex(b) + (a === 1? '' : alphaToHex(a));
};