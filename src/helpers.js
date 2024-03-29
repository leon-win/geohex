const CONSTANT_BASE = 20037508.34;

export const CODE_SYMBOLS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function calcHexSize(zoomLevel) {
  return CONSTANT_BASE / Math.pow(3, zoomLevel + 3);
}

export function adjustXY(x, y, zoomLevel) {
  const maxSteps = Math.pow(3, zoomLevel + 2);
  const steps = Math.abs(x - y);

  if (steps === maxSteps && x > y) {
    return {
      x: y,
      y: x,
    };
  }

  if (steps > maxSteps) {
    const dif = steps - maxSteps;
    const difX = Math.floor(dif / 2);
    const difY = dif - difX;

    if (x > y) {
      return {
        x: y + difY + difX,
        y: x - difX - difY,
      };
    }

    if (y > x) {
      return {
        x: y - difY - difX,
        y: x + difX + difY,
      };
    }
  }

  return {
    x,
    y,
  };
}

export function loc2xy(lon, lat) {
  const x = (lon * CONSTANT_BASE) / 180;
  const y =
    ((Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180)) *
      CONSTANT_BASE) /
    180;

  return { x, y };
}

export function xy2loc(x, y) {
  const lon = (x / CONSTANT_BASE) * 180;
  const lat =
    (180 / Math.PI) *
    (Math.atan(Math.exp((y / CONSTANT_BASE) * Math.PI)) * 2 - Math.PI / 2);

  return { lon, lat };
}

export function getCode(modX, modY, locX, zoomLevel) {
  const code3x = [];
  const code3y = [];

  let code = "";
  let code3 = "";
  let code9 = "";

  for (let i = 0; i <= zoomLevel + 2; i++) {
    const pow = Math.pow(3, zoomLevel + 2 - i);

    if (modX >= Math.ceil(pow / 2)) {
      code3x[i] = 2;
      modX -= pow;
    } else if (modX <= -Math.ceil(pow / 2)) {
      code3x[i] = 0;
      modX += pow;
    } else {
      code3x[i] = 1;
    }

    if (modY >= Math.ceil(pow / 2)) {
      code3y[i] = 2;
      modY -= pow;
    } else if (modY <= -Math.ceil(pow / 2)) {
      code3y[i] = 0;
      modY += pow;
    } else {
      code3y[i] = 1;
    }

    if (i === 2 && (locX === -180 || locX >= 0)) {
      if (
        code3x[0] === 2 &&
        code3y[0] === 1 &&
        code3x[1] === code3y[1] &&
        code3x[2] === code3y[2]
      ) {
        code3x[0] = 1;
        code3y[0] = 2;
      } else if (
        code3x[0] === 1 &&
        code3y[0] === 0 &&
        code3x[1] === code3y[1] &&
        code3x[2] === code3y[2]
      ) {
        code3x[0] = 0;
        code3y[0] = 1;
      }
    }
  }

  for (let i = 0; i < code3x.length; i++) {
    code3 += "" + code3x[i] + code3y[i];
    code9 += parseInt(code3, 3);
    code += code9;
    code3 = "";
    code9 = "";
  }

  const codePart1 = code.substring(0, 3);
  const codePart2 = code.substring(3);
  const symbolPosition1 = Math.floor(codePart1 / 30);
  const symbolPosition2 = codePart1 % 30;

  return (
    CODE_SYMBOLS.charAt(symbolPosition1) +
    CODE_SYMBOLS.charAt(symbolPosition2) +
    codePart2
  );
}
