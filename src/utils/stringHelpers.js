
export const stringJoin = (delim, ...values) => {
  return values.filter(value => value).join(delim);
};