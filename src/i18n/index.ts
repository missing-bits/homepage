import en from './en.json';
import pl from './pl.json';

export const locales = { en, pl } as const;
export type Locale = keyof typeof locales;

export function t(locale: Locale) {
  return locales[locale];
}
