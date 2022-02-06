
const toHex = (num) => {
  if (num < 0) {
    return '';
  }
  const hexValue = (num | 0).toString(16);
  return hexValue.length === 1 ? '0' + hexValue : hexValue;
}

const toDec = (hex) => {
  if (!hex || hex.length > 2) {
    return '';
  }
  return (num | 0).toString(10);
}

export const rgbaToHex = ({ r, g, b, a }) => {
  console.log(a);
  return '#' + toHex(r) + toHex(g) + toHex(b) + (a === 1? '' : toHex(a * 100));
}

export const hexToRgba = (hex) => {
  console.log(a);
  return '#' + toHex(r) + toHex(g) + toHex(b) + (a === 1? '' : toHex(a * 100));
}