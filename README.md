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
```

Available identifiers:
```
MILLISECOND: ['milliseconds', 'millisec', 'millisec', 'ms']
SECOND: ['seconds','second','secs','sec','s']
MINUTE: ['minutes','minute','mins','min','m']
HOUR: ['hours','hour','h']
DAY: ['days','day','d']
WEEK: ['weeks','week','w']
MONTH: ['months','month','mo']
YEAR: ['years','year','y']
```

