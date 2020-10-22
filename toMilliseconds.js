const times = require('./_times');

module.exports = function toMilliseconds(readableTimes) {
  if (!isNaN(readableTimes)) { return +readableTimes; }
  if (typeof readableTimes !== 'string') { return null; }
  const readables = readableTimes.trim().split(/\s+/);
  return readables.reduce((milliseconds, readable) => {
    if (milliseconds === null) { return null; }
    const value = toMillisecondsSingle(readable);
    return value !== null ? milliseconds + value : null;
  }, 0);
}

function toMillisecondsSingle(readable) {
  readable = readable.toLowerCase();
  let factor = readable.slice(-1);
  if (factor === 'o') {
    const monthFactor = readable.slice(-2);
    factor = monthFactor === 'mo' ? monthFactor : factor;
  }

  const value = +readable.slice(0, -factor.length);

  if (isNaN(value)) { return null; }

  switch (factor) {
    case 's':
      return value * times.SECOND;
    case 'm':
      return value * times.MINUTE;
    case 'h':
      return value * times.HOUR;
    case 'd':
      return value * times.DAY;
    case 'w':
      return value * times.WEEK;
    case 'mo':
      return value * times.MONTH;
    case 'y':
      return value * times.YEAR;
    default:
      return null;
  }
}
