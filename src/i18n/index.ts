import en from './en.json';
import bn from './bn.json';

export const dictionaries = { en, bn } as const;
export type Lang = keyof typeof dictionaries;
export const t = (lang: Lang) => dictionaries[lang];
