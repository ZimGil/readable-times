# readable-times
Convert readable time strings to milliseconds and vice versa.

## installation
`npm install readable-times`

## usage
### toReadable()
```javascript
const { toReadable } = require('readable-times');

toReadable(1);
// => '1ms'

toReadable(38898367008);
// => '1y 2mo 3w 4d 5h 6m 7s 8ms'

toReadable(38898367008, { sep: ';' });
// => '1y;2mo;3w;4d;5h;6m;7s;8ms'

toReadable(38898367008, { asArray: true });
// => ['1y','2mo','3w','4d','5h','6m','7s','8ms']

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
toReadable(38898367008, { identifiers });
// => '1shana 2hodesh 3shavua 4yom 5sha'a 6daka 7shniya 8milishniya'
```

### toMilliseconds()
```javascript
const { toMilliseconds } = require('readable-times');

toMilliseconds('1d');
// => 86400000

toMilliseconds('1y 2mo 3w 4d 5h 6m 7s 8ms');
// => 38898367008

toMilliseconds('1y|2mo|3w|4d|5h|6m|7s|8ms', {sep: '|'});
// => 38898367008

toMilliseconds('1yfoobar2mofoobar3wbarfoo4dfoobar5hfoobar6mbarfoo7sfoobar8ms', {sep: /(?:foobar|barfoo)/});
// => 38898367008

toMilliseconds(['1y', '2mo', '3w', '4d', '5h', '6m', '7s', '8ms']);
// => 38898367008

toMilliseconds(123);
// => 123

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
toReadable('1shana 2hodesh 3shavua 4yom 5sha\'a 6daka 7shniya 8milishniya', { identifiers });
// => 38898367008
```

Available identifiers:
```
MILLISECOND: ['milliseconds', 'millisecond', 'millisecs', 'millisec', 'ms']
SECOND: ['seconds','second','secs','sec','s']
MINUTE: ['minutes','minute','mins','min','m']
HOUR: ['hours','hour','h']
DAY: ['days','day','d']
WEEK: ['weeks','week','w']
MONTH: ['months','month','mo']
YEAR: ['years','year','y']
```

