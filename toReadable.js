const times = require('./_times');

module.exports = function toReadable(ms) {
  if (isNaN(ms)) { return null; }
  ms = +ms;

  const results = [];

  if (ms >= times.YEAR) {
    const totalYears = Math.floor(ms / times.YEAR);
    results.push(`${totalYears}y`);
    ms = ms - (totalYears * times.YEAR);
  }

  if (ms >= times.MONTH) {
    const totalMonths = Math.floor(ms / times.MONTH);
    results.push(`${totalMonths}mo`);
    ms = ms - (totalMonths * times.MONTH);
  }

  if (ms >= times.WEEK) {
    const totalWeeks = Math.floor(ms / times.WEEK);
    results.push(`${totalWeeks}w`);
    ms = ms - (totalWeeks * times.WEEK);
  }


  if (ms >= times.DAY) {
    const totalDays = Math.floor(ms / times.DAY);
    results.push(`${totalDays}d`);
    ms = ms - (totalDays * times.DAY);
  }

  if (ms >= times.HOUR) {
    const totalHours = Math.floor(ms / times.HOUR);
    results.push(`${totalHours}h`);
    ms = ms - (totalHours * times.HOUR);
  }

  if (ms >= times.MINUTE) {
    const totalMinutes = Math.floor(ms / times.MINUTE);
    results.push(`${totalMinutes}m`);
    ms = ms - (totalMinutes * times.MINUTE);
  }

  if (ms >= times.SECOND) {
    const totalSeconds = Math.floor(ms / times.SECOND);
    results.push(`${totalSeconds}s`);
    ms = ms - (totalSeconds * times.SECOND);
  }

  if (ms) {
    results.push(`${ms}ms`);
  }

  return results.join(' ');

}
