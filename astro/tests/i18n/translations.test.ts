import { describe, it, expect } from 'vitest';
import { translations, t } from '../../src/i18n/translations.ts';

describe('translations', () => {
  it('en and ja have the same keys', () => {
    const enKeys = Object.keys(translations.en).sort();
    const jaKeys = Object.keys(translations.ja).sort();
    expect(enKeys).toEqual(jaKeys);
  });

  it('t() returns the correct locale', () => {
    expect(t('en').name).toBe('Hirokazu Toki');
    expect(t('ja').name).toBe('時 大和');
  });

  it('t() falls back to en for unknown locale', () => {
    expect(t('fr')).toEqual(translations.en);
  });
});
