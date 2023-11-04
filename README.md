# Geohex

[![npm](https://img.shields.io/npm/v/geohex?logo=npm&style=flat-square)](https://www.npmjs.com/package/geohex)
[![Code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier&style=flat-square)](https://prettier.io)
[![License: MIT](https://img.shields.io/github/license/leon-win/geohex?style=flat-square)](http://opensource.org/licenses/MIT)

Hexagonal geocoding system, library for converting geographic coordinates to hexagonal grid cells and vice versa.

This is ECMAScript 2015 fork of [GeoHex library](http://geohex.net) which was originally made by [@sa2da](http://twitter.com/sa2da).

## Installation

```sh
npm install geohex --save
```

Or grab from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/geohex):

```html
<script src="https://cdn.jsdelivr.net/npm/geohex@0.0.7/lib/geohex.min.js"></script>
```

Or from [unpkg CDN](https://unpkg.com/geohex/):

```html
<script src="https://unpkg.com/geohex@0.0.7/lib/geohex.min.js"></script>
```

## Usage

### ES6 Modules

```js
import Geohex from "geohex";
// or import { getCellByCode } from 'geohex'
```

### CommonJS

```js
const Geohex = require("geohex");
// or const { getCellByCode } = require('geohex')
```

### JS modules:

```html
<script type="module">
  import Geohex from "geohex/src/index.js";
  // or import { getCellByCode } from 'geohex/src/index.js'
</script>
```

### Global variable

```html
<script src="geohex/lib/geohex.min.js"></script>
```

## Examples

[Online demo of Geohex usage](https://leon-win.github.io/geohex-examples/)

```javascript
// Get Geohex cell instance by code
const geohexCell = Geohex.getCellByCode('QH3360')

// Get Geohex cell instance by geographic coordinates and zoom level
const geohexCell = Geohex.getCellByLocation(59.943201, 30.324086, 4)

// Get Geohex cell instance by cell coordinates and zoomLevel
const geohexCell = Geohex.getCellByXY(326, 203, 4)

// Get Geohex cell coordinates by geographic coordinates and zoom level
Geohex.getXYByLocation(59.943201, 30.324086, 4):
// { x: 326, y: 203 }

// Get Geohex cell coordinates by code
Geohex.getXYByCode('QH3360')
// { x: 326, y: 203 }
```

### Geohex cell instance

Geohex cell instance is hexagon grid cell with properties and methods:

```javascript
console.log(JSON.stringify(geohexCell, null, 2))
// {
//   "lat": 59.97788999458348,
//   "lon": 30.37037037037038,
//   "x": 326,
//   "y": 203,
//   "code": "QH3360"
// }

// Cell zoom level
geohexCell.getZoomLevel()
// 4

// Cell side length in degrees
geohexCell.getHexSize():
// 9162.098006401464

// Geographic coordinates of hexagon corners
geohexCell.getHexCoords():
// [
//   { lat: 59.97788999458348, lon: 30.205761316872437 },
//   { lat: 60.0491386517641, lon: 30.288065843621407 },
//   { lat: 60.0491386517641, lon: 30.45267489711935 },
//   { lat: 59.97788999458348, lon: 30.53497942386832 },
//   { lat: 59.90648768479527, lon: 30.45267489711935 },
//   { lat: 59.90648768479527, lon: 30.288065843621407 }
// ]
```

## Other implementations

- [Original GeoHex library](http://www.geohex.org)
- [GeoHex TypeScript implementation](https://github.com/uupaa/GeoHex)
- [GeoHex Dart implementation](https://github.com/NiKoTron/geohex)
- [GeoHex Swift implementation](https://github.com/nekowen/GeoHex3.swift)
- [GeoHex Scala implementation](https://github.com/teralytics/geohex)
- [GeoHex Java implementation](https://github.com/chsh/geohex4j)
- [GeoHex C# implementation](https://github.com/mattak/GeoHex.cs)

## License

[MIT](http://opensource.org/licenses/MIT)

© 2009 @sa2da (http://twitter.com/sa2da) http://www.geohex.org

© 2020 Leonid Vinogradov
