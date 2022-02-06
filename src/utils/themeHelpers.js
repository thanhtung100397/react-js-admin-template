import { getObjField } from './helpers';

export const getThemeFromProps = (props, path, defaultValue) => {
  return getObjField(props.theme, path.endsWith('.')? path.replace(/\./g, '') : path, defaultValue)
}

export const getThemeStylesFromProps = (props, path, defaultValue = {}) => {
  return getThemeFromProps(props, `${path}._css`, defaultValue)
}