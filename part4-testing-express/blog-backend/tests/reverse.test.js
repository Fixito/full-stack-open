import { describe, test, expect } from 'vitest';
import { average, reverse } from '../utils/for_testing.js';

describe('average', () => {
  test('of a', () => {
    const result = reverse('a');

    expect(result).toBe('a');
  });

  test('of react', () => {
    const result = reverse('react');

    expect(result).toBe('tcaer');
  });

  test('of releveler', () => {
    const result = reverse('releveler');

    expect(result).toBe('releveler');
  });
});

describe('average', () => {
  test('of one value is the value itself', () => {
    expect(average([1])).toBe(1);
  });

  test('of many is calculated right', () => {
    expect(average([1, 2, 3, 4, 5, 6])).toBe(3.5);
  });

  test('of empty array is zero', () => {
    expect(average([])).toBe(0);
  });
});
