const times = require('./_times');
const identifiers = require('./_identifiers');

const patternGroups = Object.entries(identifiers).map(([type, ids]) => `(?<${type}>${ids.join('|')})`).join('|');
const identifiersRegex = new RegExp(`^(\\d+)(${patternGroups})$`, 'i');

/**
 * Convert readable times string to milliseconds.
 *
 * @since 0.1.0
 * @param { String | String[] } readableTimes - Readable times.
 * @param { Object }            [options]     - Options.
 * @param { String | RegExp }   [options.sep] - Separator for string inputs - Avoid capturing groups.
 * @returns { Number } Returns number of milliseconds represented in the string.
 *
 * @example
 *
 * toMilliseconds('1d');
 * // => 86400000
 *
 * toMilliseconds('1y 2mo 3w 4d 5h 6m 7s 8ms');
 * // => 38898367008
 *
 * toMilliseconds('1y|2mo|3w|4d|5h|6m|7s|8ms', {sep: '|'});
 * // => 38898367008
 *
 * toMilliseconds(['1y', '2mo', '3w', '4d', '5h', '6m', '7s', '8ms']);
 * // => 38898367008
 *
 * toMilliseconds(123);
 * // => 123
 */
module.exports = function toMilliseconds(readableTimes, options = {}) {
  if (!isNaN(readableTimes)) { return +readableTimes; }
  const isArrayInput =  Array.isArray(readableTimes);
  if (typeof readableTimes !== 'string' && !isArrayInput) {
    throw new Error(`Unexpected value type: [${typeof readableTimes}] is not supported, expected [string]`);
  }

  const { sep = /\s+/ } = options;
  const readables = isArrayInput ? readableTimes : readableTimes.trim().split(sep);
  return readables.reduce((result, readable) => {
    const match = identifiersRegex.exec(readable);
    if (!match) { throw new Error(`Unexpected value pattern: "${readable}"`); }
    const value = match[1];
    const factorOptions = match.groups;
    const factor = Object.keys(match.groups).find((key) => factorOptions[key]);
    return result + (value * times[factor]);
  }, 0);
};
