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
    const sep = ','
    const input = '1y,1y,1y,2w,2w,2w';
    const expected = 3 * (1000 * 60 * 60 * 24 * 365) + 6 * (1000 * 60 * 60 * 24 * 7);
    expect(() => toMilliseconds(input, { sep })).to.not.throw();
    const actual = toMilliseconds(input, { sep });
    expect(actual).to.be.a('number');
    expect(actual).to.be.equal(expected);
  });

  it('Should return correct number when regex separator indicated', () => {
    const sep = /(?:foobar|barfoo)/
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

