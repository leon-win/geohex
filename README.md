# geohex
[![JavaScript Standard Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](https://standardjs.com)
[![License: MIT](https://img.shields.io/github/license/leon-win/node-auth-tokens?style=flat-square)](http://opensource.org/licenses/MIT)

This is ECMAScript 2015 fork of [GeoHex](http://geohex.net/) hexagonal geocoding system originally made by [@sa2da](http://twitter.com/sa2da).

## Examples

```javascript
getCellByCode('QG') // code
// Cell { lat: 56.76599911636905, lon: 39.999999999999986, x: 4, y: 2, code: 'QG' }

getCellByLocation(56.76599911636905, 39.999999999999986, 0) // lat, lon, zoomLevel
// Cell { lat: 56.76599911636905, lon: 39.999999999999986, x: 4, y: 2, code: 'QG' }

getCellByXY(4, 2, 0) // x, y, zoomLevel
// Cell { lat: 56.76599911636905, lon: 39.999999999999986, x: 4, y: 2, code: 'QG' }

getCellByCode('QG').getHexCoords()
// [ { lat: 56.76599911636905, lon: 26.66666666666665 },
//   { lat: 62.5793731923105, lon: 33.33333333333332 },
//   { lat: 62.5793731923105, lon: 46.66666666666666 },
//   { lat: 56.76599911636905, lon: 53.33333333333332 },
//   { lat: 49.8887630323615, lon: 46.66666666666666 },
//   { lat: 49.8887630323615, lon: 33.33333333333332 } ]
```

## License
[MIT](http://opensource.org/licenses/MIT)

© 2009 @sa2da (http://twitter.com/sa2da) http://www.geohex.org

© 2020 Leonid Vinogradov
