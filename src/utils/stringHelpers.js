
export const stringJoin = (delim, ...values) => {
  return values.filter(value => value).join(delim);
};

export const isEmpty = (value) => {
  return !value;
};

export const isBlank = (value) => {
  return !value || !value.trim();
};