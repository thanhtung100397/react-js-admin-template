
const ROMAN_NUMERALS_GROUP = [
  "","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
  "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
  "","I","II","III","IV","V","VI","VII","VIII","IX"
];

export const toRomanNumber = (num) => {
  if (!num) {
    return '';
  }
  const digits = String(+num).split("");
  let groupIndex = 3;// started group index;
  let romanNum = '';
  while (groupIndex--) {
    romanNum = (ROMAN_NUMERALS_GROUP[+digits.pop() + (groupIndex * 10)] || "") + romanNum;
  }
  return Array(+digits.join("") + 1).join("M") + romanNum;
};