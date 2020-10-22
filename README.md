# readable-times
Convert readable time strings to milliseconds and vice versa.

## installation
`npm install readable-times`

## usage
### toMilliseconds()
```javascript
const toMilliseconds = require('readable-times/toMilliseconds');
// You could also:
// const { toMilliseconds } = require('readable-times');

toMilliseconds('1d');
// => 86400000

toMilliseconds('1y 2mo 3w 4d 5h 6m 7s 8ms');
// => 38898367008

toMilliseconds(123);
// => 123
```

### toReadable()
```javascript
const toReadable = require('readable-times/toReadable');
// You could also:
// const { toReadable } = require('readable-times');

toReadable(1);
// => '1ms'

toReadable(38898367008);
// => '1y 2mo 3w 4d 5h 6m 7s 8ms'
```
