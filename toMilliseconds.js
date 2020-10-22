const times = require('./_times');

module.exports = function toMilliseconds(readableTimes) {
  if (!isNaN(readableTimes)) { return +readableTimes; }
  if (typeof readableTimes !== 'string') { throw new Error(`Unexpected value type: ${readableTimes} is of type ${typeof readableTimes}, expected 'string'`); }
  const readables = readableTimes.trim().split(/\s+/);
  return readables.reduce((milliseconds, readable) => milliseconds + toMillisecondsSingle(readable), 0);
}

function toMillisecondsSingle(readable) {
  readable = readable.toLowerCase();
  let factor = readable.slice(-1);
  if (factor === 'o') {
    const monthFactor = readable.slice(-2);
    factor = monthFactor === 'mo' ? monthFactor : factor;
  }

  const value = +readable.slice(0, -factor.length);

  if (isNaN(value)) { throw new Error(`Unexpected value: ${readable} is not a supported value`); }

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
      throw new Error(`Unexpected value: ${factor} is not a supported time identifier`);
  }
}
