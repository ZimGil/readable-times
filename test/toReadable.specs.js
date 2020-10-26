const expect = require('chai').expect;
const toReadable = require('../lib/toReadable');

describe('toReadable()', () => {
  it('Should return empty string for input (0)', () => {
    const input = 0;
    const expected = '';
    expect(() => toReadable(input)).to.not.throw();
    const actual = toReadable(input);
    expect(actual).to.be.a('string');
    expect(actual).to.be.equal(expected);
  });

  it('Should return highest readable time as possible', () => {
    const input = 1000 * 60;
    const expected = '1m';
    expect(() => toReadable(input)).to.not.throw();
    const actual = toReadable(input);
    expect(actual).to.be.a('string');
    expect(actual).to.be.equal(expected);
  });

  it('Should return single readable time for multipications', () => {
    const input = 1000 * 60 * 60 * 24 * 365 * 2;
    const expected = '2y';
    expect(() => toReadable(input)).to.not.throw();
    const actual = toReadable(input);
    expect(actual).to.be.a('string');
    expect(actual).to.be.equal(expected);
  });

  it('Should be able to use all identifiers correctly', () => {
    const input = 38898367008;
    const expected = '1y 2mo 3w 4d 5h 6m 7s 8ms';
    expect(() => toReadable(input)).to.not.throw();
    const actual = toReadable(input);
    expect(actual).to.be.a('string');
    expect(actual).to.be.equal(expected);
  });

  it('Should return correctly when input is string number', () => {
    const input = '38898367008';
    const expected = '1y 2mo 3w 4d 5h 6m 7s 8ms';
    expect(() => toReadable(input)).to.not.throw();
    const actual = toReadable(input);
    expect(actual).to.be.a('string');
    expect(actual).to.be.equal(expected);
  });

  it('Should be able to return result using option separator', () => {
    const sep = ';';
    const input = 38898367008;
    const expected = '1y;2mo;3w;4d;5h;6m;7s;8ms';
    expect(() => toReadable(input, { sep })).to.not.throw();
    const actual = toReadable(input, { sep });
    expect(actual).to.be.a('string');
    expect(actual).to.be.equal(expected);
  });

  it('Should be able to return result as array', () => {
    const asArray = true;
    const input = 38898367008;
    const expected = ['1y', '2mo', '3w', '4d', '5h', '6m', '7s', '8ms'];
    expect(() => toReadable(input, { asArray })).to.not.throw();
    const actual = toReadable(input, { asArray });
    expect(actual).to.be.an('array');
    expect(actual).to.be.deep.equal(expected);
  });

  it('Should be able to return result using option identifiers', () => {
    const input = 38898367008;
    const identifiers = {
      year: 'shana',
      month: 'hodesh',
      week: 'shavua',
      day: 'yom',
      hour: 'sha\'a',
      minute: 'daka',
      second: 'shniya',
      millisecond: 'milishniya'
    };
    const expected = '1shana 2hodesh 3shavua 4yom 5sha\'a 6daka 7shniya 8milishniya';
    expect(() => toReadable(input, { identifiers })).to.not.throw();
    const actual = toReadable(input, { identifiers });
    expect(actual).to.be.a('string');
    expect(actual).to.be.equal(expected);
  });

  it('Should throw an error when input is NaN', () => {
    const input = { foo: 'bar' };
    const expected = 'Unexpected value: [object Object] is not convertable to number';
    expect(() => toReadable(input)).to.throw(expected);
  });

  it('Should throw an error when no input', () => {
    const expected = 'Unexpected value: undefined is not convertable to number';
    expect(() => toReadable()).to.throw(expected);
  });
});
