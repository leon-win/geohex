import Cell from "./Cell.js";

import {
  CODE_SYMBOLS,
  calcHexSize,
  adjustXY,
  loc2xy,
  xy2loc,
  getCode,
} from "./helpers.js";

const CONSTANT_K = Math.tan(Math.PI * (30 / 180));

export function getCellByCode(code) {
  const { x, y } = getXYByCode(code);
  const zoomLevel = code.length - 2;

  return getCellByXY(x, y, zoomLevel);
}

export function getCellByLocation(lat, lon, zoomLevel) {
  const { x, y } = getXYByLocation(lat, lon, zoomLevel);

  return getCellByXY(x, y, zoomLevel);
}

export function getCellByXY(x, y, zoomLevel) {
  const size = calcHexSize(zoomLevel);
  const unitX = 6 * size;
  const unitY = 6 * size * CONSTANT_K;
  const lat = (CONSTANT_K * x * unitX + y * unitY) / 2;
  const lon = (lat - y * unitY) / CONSTANT_K;
  const maxSteps = Math.pow(3, zoomLevel + 2);
  const steps = Math.abs(x - y);

  let { lon: locX, lat: locY } = xy2loc(lon, lat);
  let modX = x;
  let modY = y;

  if (steps === maxSteps) {
    if (x > y) {
      modX = y;
      modY = x;
    }

    locX = -180;
  }

  return new Cell(locY, locX, x, y, getCode(modX, modY, locX, zoomLevel));
}

export function getXYByCode(code) {
  const zoomLevel = code.length - 2;

  let dec9 =
    "" +
    (CODE_SYMBOLS.indexOf(code.charAt(0)) * 30 +
      CODE_SYMBOLS.indexOf(code.charAt(1))) +
    code.substring(2);
  if (
    dec9.charAt(0).match(/[15]/) &&
    dec9.charAt(1).match(/[^125]/) &&
    dec9.charAt(2).match(/[^125]/)
  ) {
    if (dec9.charAt(0) === 5) {
      dec9 = "7" + dec9.substring(1, dec9.length);
    } else if (dec9.charAt(0) === 1) {
      dec9 = "3" + dec9.substring(1, dec9.length);
    }
  }

  let dec9length = dec9.length;
  for (let i = 0; i < zoomLevel + 3 - dec9length; i++) {
    dec9 = "0" + dec9;
    dec9length++;
  }

  let dec3 = "";
  for (let i = 0; i < dec9length; i++) {
    const dec0 = parseInt(dec9.charAt(i)).toString(3);

    if (!dec0) {
      dec3 += "00";
    } else if (dec0.length === 1) {
      dec3 += "0";
    }

    dec3 += dec0;
  }

  const decX = [];
  const decY = [];

  for (let i = 0; i < dec3.length / 2; i++) {
    decX[i] = parseInt(dec3.charAt(i * 2));
    decY[i] = parseInt(dec3.charAt(i * 2 + 1));
  }

  let x = 0;
  let y = 0;

  for (let i = 0; i <= zoomLevel + 2; i++) {
    const pow = Math.pow(3, zoomLevel + 2 - i);

    if (decX[i] === 0) {
      x -= pow;
    } else if (decX[i] === 2) {
      x += pow;
    }

    if (decY[i] === 0) {
      y -= pow;
    } else if (decY[i] === 2) {
      y += pow;
    }
  }

  return adjustXY(x, y, zoomLevel);
}

export function getXYByLocation(lat, lon, zoomLevel) {
  const size = calcHexSize(zoomLevel);
  const unitX = 6 * size;
  const unitY = 6 * size * CONSTANT_K;
  const { x: lonGrid, y: latGrid } = loc2xy(lon, lat);
  const posX = (lonGrid + latGrid / CONSTANT_K) / unitX;
  const posY = (latGrid - CONSTANT_K * lonGrid) / unitY;
  const X0 = Math.floor(posX);
  const Y0 = Math.floor(posY);
  const XQ = posX - X0;
  const YQ = posY - Y0;

  let x = Math.round(posX);
  let y = Math.round(posY);

  if (YQ > -XQ + 1) {
    if (YQ < 2 * XQ && YQ > 0.5 * XQ) {
      x = X0 + 1;
      y = Y0 + 1;
    }
  } else if (YQ < -XQ + 1) {
    if (YQ > 2 * XQ - 1 && YQ < 0.5 * XQ + 0.5) {
      x = X0;
      y = Y0;
    }
  }

  return adjustXY(x, y, zoomLevel);
}

export default {
  getCellByCode,
  getCellByLocation,
  getCellByXY,
  getXYByCode,
  getXYByLocation,
};
