import Vi from '../translations/vi.json';
import En from '../translations/en.json';

export const DEFAULT_LOCALE = 'vi';
export const Translations = {
  vi: Vi,
  en: En
}

export const ValidateStatus = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  VALIDATING: 'validating',
};

export const Regex = {
  EMAIL: '^[A-z0-9][A-z0-9_\\.\\+-]{0,32}@([a-z0-9_-]{1,}\\.){0,}([a-z0-9_-]{2,}\\.){0,}[a-z0-9-_]{2,}(\\.[a-z0-9_-]{2,}){1,2}$',
  PHONE: '[0-9]{8,11}'
}