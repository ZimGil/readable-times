const expect = require('chai').expect;
const toMilliseconds = require('../lib/toMilliseconds');

describe('toMilliseconds()', () => {
  it('Should return correct number for single value', () => {
    const input = '1w';
    const expected = 1000 * 60 * 60 * 24 * 7;
    expect(() => toMilliseconds(input)).to.not.throw();
    const actual = toMilliseconds(input);
    expect(actual).to.be.a('number');
    expect(actual).to.be.equal(expected);
  });


  it('Should return correct number for multiple values', () => {
    const input = '1y 1w';
    const expected = (1000 * 60 * 60 * 24 * 365) + (1000 * 60 * 60 * 24 * 7);
    expect(() => toMilliseconds(input)).to.not.throw();
    const actual = toMilliseconds(input);
    expect(actual).to.be.a('number');
    expect(actual).to.be.equal(expected);
  });


  it('Should return correct number for repeadted values', () => {
    const input = '1y 1y 1y 2w 2w 2w';
    const expected = 3 * (1000 * 60 * 60 * 24 * 365) + 6 * (1000 * 60 * 60 * 24 * 7);
    expect(() => toMilliseconds(input)).to.not.throw();
    const actual = toMilliseconds(input);
    expect(actual).to.be.a('number');
    expect(actual).to.be.equal(expected);
  });

  it('Should return correct number when string separator indicated', () => {
    const sep = ',';
    const input = '1y,1y,1y,2w,2w,2w';
    const expected = 3 * (1000 * 60 * 60 * 24 * 365) + 6 * (1000 * 60 * 60 * 24 * 7);
    expect(() => toMilliseconds(input, { sep })).to.not.throw();
    const actual = toMilliseconds(input, { sep });
    expect(actual).to.be.a('number');
    expect(actual).to.be.equal(expected);
  });

  it('Should return correct number when regex separator indicated', () => {
    const sep = /(?:foobar|barfoo)/;
    const input = '1yfoobar1ybarfoo1ybarfoo2wbarfoo2wfoobar2w';
    const expected = 3 * (1000 * 60 * 60 * 24 * 365) + 6 * (1000 * 60 * 60 * 24 * 7);
    expect(() => toMilliseconds(input, { sep })).to.not.throw();
    const actual = toMilliseconds(input, { sep });
    expect(actual).to.be.a('number');
    expect(actual).to.be.equal(expected);
  });

  it('Should return correct number array of values', () => {
    const input = ['1y', '1y', '1y', '2w', '2w', '2w'];
    const expected = 3 * (1000 * 60 * 60 * 24 * 365) + 6 * (1000 * 60 * 60 * 24 * 7);
    expect(() => toMilliseconds(input)).to.not.throw();
    const actual = toMilliseconds(input);
    expect(actual).to.be.a('number');
    expect(actual).to.be.equal(expected);
  });

  it('Should return correct number when input use any of possible identifiers', () => {
    const input = [
      '1milliseconds',
      '1millisecond',
      '1millisecs',
      '1millisec',
      '1ms',
      '1seconds',
      '1second',
      '1secs',
      '1sec',
      '1s',
      '1minutes',
      '1minute',
      '1mins',
      '1min',
      '1m',
      '1hours',
      '1hour',
      '1h',
      '1days',
      '1day',
      '1d',
      '1weeks',
      '1week',
      '1w',
      '1months',
      '1month',
      '1mo',
      '1years',
      '1year',
      '1y'
    ].join(' ');

    const expected =
      1 + // "1milliseconds",
      1 + // "1millisecond",
      1 + // "1millisecs",
      1 + // "1millisec",
      1 + // "1ms",
      1 * 1000 + // "1seconds",
      1 * 1000 + // "1second",
      1 * 1000 + // "1secs",
      1 * 1000 + // "1sec",
      1 * 1000 + // "1s",
      1 * 1000 * 60 + // "1minutes",
      1 * 1000 * 60 + // "1minute",
      1 * 1000 * 60 + // "1mins",
      1 * 1000 * 60 + // "1min",
      1 * 1000 * 60 + // "1m",
      1 * 1000 * 60 * 60 + // "1hours",
      1 * 1000 * 60 * 60 + // "1hour",
      1 * 1000 * 60 * 60 + // "1h",
      1 * 1000 * 60 * 60 * 24 + // "1days",
      1 * 1000 * 60 * 60 * 24 + // "1day",
      1 * 1000 * 60 * 60 * 24 + // "1d",
      1 * 1000 * 60 * 60 * 24 * 7 + // "1weeks",
      1 * 1000 * 60 * 60 * 24 * 7 + // "1week",
      1 * 1000 * 60 * 60 * 24 * 7 + // "1w",
      1 * 1000 * 60 * 60 * 24 * 30 + // "1months",
      1 * 1000 * 60 * 60 * 24 * 30 + // "1month",
      1 * 1000 * 60 * 60 * 24 * 30 + // "1mo",
      1 * 1000 * 60 * 60 * 24 * 365 + // "1years",
      1 * 1000 * 60 * 60 * 24 * 365 + // "1year",
      1 * 1000 * 60 * 60 * 24 * 365;   // "1y"

    expect(() => toMilliseconds(input)).to.not.throw();
    const actual = toMilliseconds(input);
    expect(actual).to.be.a('number');
    expect(actual).to.be.equal(expected);
  });

  it('Should return correct number for empty string', () => {
    const input = '';
    const expected = 0;
    expect(() => toMilliseconds(input)).to.not.throw();
    const actual = toMilliseconds(input);
    expect(actual).to.be.a('number');
    expect(actual).to.be.equal(expected);
  });

  it('Should return correct number for empty array', () => {
    const input = [];
    const expected = 0;
    expect(() => toMilliseconds(input)).to.not.throw();
    const actual = toMilliseconds(input);
    expect(actual).to.be.a('number');
    expect(actual).to.be.equal(expected);
  });


  it('Should return correct number for number string', () => {
    const input = '100';
    const expected = 100;
    expect(() => toMilliseconds(input)).to.not.throw();
    const actual = toMilliseconds(input);
    expect(actual).to.be.a('number');
    expect(actual).to.be.equal(expected);
  });


  it('Should return correct number for number value', () => {
    const input = 100;
    const expected = 100;
    expect(toMilliseconds.bind(null, input)).to.not.throw();
    const actual = toMilliseconds(input);
    expect(actual).to.be.a('number');
    expect(actual).to.be.equal(expected);
  });

  it('Should be case insensitive', () => {
    const input = '1yEaR';
    expected = 1000 * 60 * 60 * 24 * 365;

    expect(() => toMilliseconds(input)).to.not.throw();
    const actual = toMilliseconds(input);
    expect(actual).to.be.a('number');
    expect(actual).to.be.equal(expected);
  });

  it('Should throw an error if no input', () => {
    const expected = 'Unexpected value type: [undefined] is not supported, expected [string]';
    expect(() => toMilliseconds()).to.throw(expected);
  });

  it('Should throw an error if unsupported input type', () => {
    const input = { foo: 'bar' };
    const expected = 'Unexpected value type: [object] is not supported, expected [string]';
    expect(() => toMilliseconds(input)).to.throw(expected);
  });

  it('Should throw an error if unsupported value in input', () => {
    const input = '1y foobar 2h';
    const expected = 'Unexpected value pattern: "foobar"';
    expect(() => toMilliseconds(input)).to.throw(expected);
  });

  it('Should throw an error if unsupported time identifier', () => {
    const input = '1y 1f 2h';
    const expected = 'Unexpected value pattern: "1f"';
    expect(() => toMilliseconds(input)).to.throw(expected);
  });
});

