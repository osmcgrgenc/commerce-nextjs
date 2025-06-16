import { describe, it, expect } from 'vitest';
import { cn, formatPrice, formatDate } from './utils';

describe('utils', () => {
  it('formatPrice returns formatted price in TRY', () => {
    expect(formatPrice(1234.56)).toBe('₺1.234,56');
  });

  it('formatDate returns formatted date in Turkish', () => {
    expect(formatDate('2024-01-01')).toBe('1 Ocak 2024');
  });

  it('cn merges class names', () => {
    expect(cn('text-lg', 'font-bold')).toBe('text-lg font-bold');
    expect(cn('text-lg', 'text-lg', 'font-bold')).toBe('text-lg font-bold');
  });
});
