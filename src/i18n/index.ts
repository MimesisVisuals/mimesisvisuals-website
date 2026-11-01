import { en } from './en';

export type Copy = typeof en;
export type Locale = 'en' | 'el';
// Greek is reserved, not published. Add an el.ts implementing Copy, then an /el/ page.
export const translations: Record<Locale, Copy | null> = { en, el: null };
export function getCopy(locale: Locale): Copy {
  const copy = translations[locale];
  if (!copy) throw new Error(`Translation is not ready: ${locale}`);
  return copy;
}
