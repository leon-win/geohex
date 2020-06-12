const {
  getCellByCode,
  getCellByLocation,
  getCellByXY,
  getXYByLocation
} = require('./../../lib/geohex.min.js')

module.exports = [
  {
    name: 'code2HEX',
    mode: 'code -> HEX',
    input: 'code',
    output: 'cell.lat, cell.lon (expectaion)',
    logic: function (testCase) {
      const lat = parseFloat(testCase[1])
      const lon = parseFloat(testCase[2])
      const code = testCase[0]
      const cell = getCellByCode(code)

      return {
        err: (Math.abs(cell.lat - lat) < 0.0000000001 && Math.abs(cell.lon - lon) < 0.0000000001) ? 0 : 1,
        message: code + ': ' + (cell.lat) + ', ' + (cell.lon) + ' (' + lat + ', ' + lon + ')'
      }
    }
  },
  {
    name: 'code2XY',
    mode: 'code -> XY',
    input: 'code',
    output: 'cell.x, cell.y (expectaion)',
    logic: function (testCase) {
      const code = testCase[0]
      const X = parseInt(testCase[1])
      const Y = parseInt(testCase[2])
      const cell = getCellByCode(code)

      return {
        err: (cell.x === X) && (cell.y === Y) ? 0 : 1,
        message: code + ': ' + cell.x + ', ' + cell.y + ' (' + X + ', ' + Y + ')'
      }
    }
  },
  {
    name: 'coord2HEX',
    mode: 'coordinate -> HEX',
    input: 'level, lat, lon',
    output: 'cell.code (expectaion)',
    logic: function (testCase) {
      const level = parseInt(testCase[0])
      const lat = parseFloat(testCase[1])
      const lon = parseFloat(testCase[2])
      const code = testCase[3]
      const cell = getCellByLocation(lat, lon, level)

      return {
        err: cell.code === code ? 0 : 1,
        message: level + ', ' + lat + ', ' + lon + ': ' + cell.code + ' (' + code + ')'
      }
    }
  },
  {
    name: 'coord2XY',
    mode: 'coordinate -> XY',
    input: 'level, lat, lon',
    output: 'X, Y (expectaion)',
    logic: function (testCase) {
      const level = parseInt(testCase[0])
      const lat = parseFloat(testCase[1])
      const lon = parseFloat(testCase[2])
      const X = parseInt(testCase[3])
      const Y = parseInt(testCase[4])
      const XY = getXYByLocation(lat, lon, level)

      return {
        err: (XY.x === X) && (XY.y === Y) ? 0 : 1,
        message: level + ', ' + lat + ', ' + lon + ': ' + XY.x + ', ' + XY.y + ' (' + X + ', ' + Y + ')'
      }
    }
  },
  {
    name: 'XY2HEX',
    mode: 'XY -> HEX',
    input: 'level, X, Y',
    output: 'cell.code (expectaion)',
    logic: function (testCase) {
      const level = parseInt(testCase[0])
      const X = parseInt(testCase[1])
      const Y = parseInt(testCase[2])
      const code = testCase[3]
      const cell = getCellByXY(X, Y, level)

      return {
        err: cell.code === code ? 0 : 1,
        message: level + ', ' + X + ', ' + Y + ': ' + cell.code + ' (' + code + ')'
      }
    }
  }
]
