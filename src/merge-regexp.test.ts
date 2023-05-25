import { expect, it } from 'vitest';
import { mergeRegExp } from './merge-regexp';

const assert = ({
  regRexps,
  matches,
  notMatches,
}: {
  regRexps: RegExp[];
  matches: string[];
  notMatches: string[];
}) => {
  const merged = mergeRegExp(regRexps);
  for (const match of matches) {
    expect(merged.test(match)).toBe(true);
  }
  for (const notMatch of notMatches) {
    expect(merged.test(notMatch)).toBe(false);
  }
};

// single
it('single', () => {
  assert({
    regRexps: [/^foo/],
    matches: ['foo', 'fooo'],
    notMatches: ['fo'],
  });
});

// multiple
it('multiple', () => {
  assert({
    regRexps: [/^foo/, /^bar/],
    matches: ['foo', 'fooo', 'bar', 'barrr'],
    notMatches: ['fo', 'ba'],
  });
});

// multiple with same prefix
it('multiple with same prefix', () => {
  assert({
    regRexps: [/^foo/, /^foobar/],
    matches: ['foo', 'fooo', 'foobar', 'foobarrr'],
    notMatches: ['fo', 'ba'],
  });
});

// multiple with escape character
it('multiple with escape character', () => {
  assert({
    regRexps: [/^foo/, /^foo\//],
    matches: ['foo', 'fooo', 'foo/'],
    notMatches: ['fo', 'ba'],
  });
});
