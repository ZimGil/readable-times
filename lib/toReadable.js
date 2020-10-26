const times = require('./_times');

const defaultIdentifiers = {
  year: 'y',
  month: 'mo',
  week: 'w',
  day: 'd',
  hour: 'h',
  minute: 'm',
  second: 's',
  millisecond: 'ms'
};

/**
 * Convert milliseconds to readable times string.
 *
 * @since 0.1.0
 * @param { Number }  ms                    - Milliseconds to convert to string.
 * @param { Object }  [options]             - Options.
 * @param { Boolean } [options.asArray]     - Return result as Array.
 * @param { String }  [options.sep]          - Result separator.
 * @param { Object }  [options.identifiers] - Time identifiers.
 * @param { String }  [options.identifiers.year] - Year identifier.
 * @param { String }  [options.identifiers.month] - Month identifier.
 * @param { String }  [options.identifiers.week] - Week identifier.
 * @param { String }  [options.identifiers.day] - Day identifier.
 * @param { String }  [options.identifiers.hour] - Hour identifier.
 * @param { String }  [options.identifiers.minute] - Minute identifier.
 * @param { String }  [options.identifiers.second] - Second identifier.
 * @param { String }  [options.identifiers.millisecond] - Millisecond identifier.
 * @returns { String | String[] } Return a String (or Array of Strings) representing the millisecinds as readable times.
 *
 * @example
 *
 * toReadable(1);
 * // => '1ms'
 *
 * toReadable(38898367008);
 * // => '1y 2mo 3w 4d 5h 6m 7s 8ms'
 *
 * toReadable(38898367008, { sep: ';' });
 * // => '1y;2mo;3w;4d;5h;6m;7s;8ms'
 *
 * toReadable(38898367008, { asArray: true });
 * // => ['1y','2mo','3w','4d','5h','6m','7s','8ms']
 *
 * toReadable(3600000, { identifiers: { hour: 'foo' } });
 * // => '1foo'
 */
module.exports = function toReadable(ms, options = {}) {
  if (isNaN(ms)) { throw new Error(`Unexpected value: ${ms} is not convertable to number`); }
  ms = +ms;
  options = Object.assign({ identifiers: defaultIdentifiers, asArray: false, sep: ' ' }, options);

  const { identifiers } = options;
  const results = [];

  if (ms >= times.YEAR) {
    const totalYears = Math.floor(ms / times.YEAR);
    results.push(`${totalYears}${identifiers.year}`);
    ms = ms - (totalYears * times.YEAR);
  }

  if (ms >= times.MONTH) {
    const totalMonths = Math.floor(ms / times.MONTH);
    results.push(`${totalMonths}${identifiers.month}`);
    ms = ms - (totalMonths * times.MONTH);
  }

  if (ms >= times.WEEK) {
    const totalWeeks = Math.floor(ms / times.WEEK);
    results.push(`${totalWeeks}${identifiers.week}`);
    ms = ms - (totalWeeks * times.WEEK);
  }


  if (ms >= times.DAY) {
    const totalDays = Math.floor(ms / times.DAY);
    results.push(`${totalDays}${identifiers.day}`);
    ms = ms - (totalDays * times.DAY);
  }

  if (ms >= times.HOUR) {
    const totalHours = Math.floor(ms / times.HOUR);
    results.push(`${totalHours}${identifiers.hour}`);
    ms = ms - (totalHours * times.HOUR);
  }

  if (ms >= times.MINUTE) {
    const totalMinutes = Math.floor(ms / times.MINUTE);
    results.push(`${totalMinutes}${identifiers.minute}`);
    ms = ms - (totalMinutes * times.MINUTE);
  }

  if (ms >= times.SECOND) {
    const totalSeconds = Math.floor(ms / times.SECOND);
    results.push(`${totalSeconds}${identifiers.second}`);
    ms = ms - (totalSeconds * times.SECOND);
  }

  if (ms) {
    results.push(`${ms}${identifiers.millisecond}`);
  }

  const { asArray, sep = ' ' } = options;
  return asArray ? results : results.join(sep);

};
