# geohex

[![JavaScript Standard Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)
[![License: MIT](https://img.shields.io/github/license/leon-win/node-auth-tokens?style=flat-square)](http://opensource.org/licenses/MIT)

Hexagonal geocoding system, library for converting geographic coordinates to hexagonal grid cell and vice versa. This is ECMAScript 2015 fork of [GeoHex](http://geohex.net) which was originally made by [@sa2da](http://twitter.com/sa2da).

## Installation

```sh 
npm install geohex --save
```

Or grab from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/geohex):

```html
<script src="https://cdn.jsdelivr.net/npm/geohex@0.0.4/lib/geohex.min.js"></script>
```

Or from [unpkg CDN](https://unpkg.com/geohex):

```html
<script src="https://unpkg.com/geohex@0.0.4/lib/geohex.min.js"></script>
```

## Usage


```js
// ES6 Modules
import { getCellByCode } from 'geohex'

// CommonJS
const { getCellByCode } = require('geohex')
```

Or:

```html
<script src="geohex/lib/geohex.min.js"></script>
```

Or with JS modules:

```html
<script type="module">
  import { getCellByCode } from 'geohex/lib/geohex.min.js'
</script>
```

## Examples

```javascript
getCellByCode('QH3360') // code
getCellByLocation(59.943201, 30.324086, 4) // lat, lon, zoomLevel
getCellByXY(326, 203, 4) // x, y, zoomLevel

// Each function return hexagonal grid cell instance with five properties:
// {
//   lat: 59.97788999458348,
//   lon: 30.37037037037038,
//   x: 326,
//   y: 203,
//   code: 'QH3360'
// }

// and three methods:

getCellByCode('QH3360').getZoomLevel()
// 4

getCellByCode('QH3360').getHexSize():
// 9162.098006401464

getCellByCode('QH3360').getHexCoords():
// [
//   { lat: 59.97788999458348, lon: 30.205761316872437 },
//   { lat: 60.0491386517641, lon: 30.288065843621407 },
//   { lat: 60.0491386517641, lon: 30.45267489711935 },
//   { lat: 59.97788999458348, lon: 30.53497942386832 },
//   { lat: 59.90648768479527, lon: 30.45267489711935 },
//   { lat: 59.90648768479527, lon: 30.288065843621407 }
// ]
```

## Alternatives
* http://www.geohex.org -- original GeoHex library
* https://github.com/uupaa/GeoHex -- GeoHex v3.2 with TypeScript implementation
* https://github.com/teralytics/geohex -- GeoHex implementation in Scala. Forked from [geohex4j](https://github.com/chsh/geohex4j)

## License
[MIT](http://opensource.org/licenses/MIT)

© 2009 @sa2da (http://twitter.com/sa2da) http://www.geohex.org

© 2020 Leonid Vinogradov
