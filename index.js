const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

module.exports = function toMilliseconds(readableTimes) {
  if (!isNaN(readableTimes)) { return +readableTimes; }
  if (typeof readableTimes !== 'string') { return null; }
  const readables = readableTimes.split(' ');
  return readables.reduce((milliseconds, readable) => {
    if (milliseconds === null) { return null; }
    const value = toMillisecondsSingle(readable);
    return value !== null ? milliseconds + value : null;
  }, 0);
}

function toMillisecondsSingle(readable) {
  let factor = readable.slice(-1);
  if (factor.toLowerCase() === 'o') {
    const monthFactor = readable.slice(-2);
    factor = monthFactor.toLowerCase() === 'mo' ? monthFactor : factor;
  }

  const value = +readable.slice(0, -factor.length);

  if (isNaN(value)) { return null; }

  switch (factor) {
    case 's':
    case 'S':
      return value * SECOND;
    case 'm':
    case 'M':
      return value * MINUTE;
    case 'h':
    case 'H':
      return value * HOUR;
    case 'd':
    case 'D':
      return value * DAY;
    case 'w':
    case 'W':
      return value * WEEK;
    case 'mo':
    case 'Mo':
    case 'mO':
    case 'MO':
      return value * MONTH;
    case 'y':
    case 'Y':
      return value * YEAR;
    default:
      return null;
  }
}
