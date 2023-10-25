import { calcHexSize, loc2xy, xy2loc } from "./helpers.js";

export default class Cell {
  constructor(lat, lon, x, y, code) {
    this.lat = lat;
    this.lon = lon;
    this.x = x;
    this.y = y;
    this.code = code;
  }

  getZoomLevel() {
    return this.code.length - 2;
  }

  getHexSize() {
    return calcHexSize(this.getZoomLevel());
  }

  getHexCoords() {
    const { lat, lon } = this;
    const { x, y } = loc2xy(lon, lat);
    const deg = Math.tan(Math.PI * (60 / 180));
    const size = this.getHexSize();

    const TOP = xy2loc(x, y + deg * size).lat;
    const BOTTOM = xy2loc(x, y - deg * size).lat;
    const LEFT = xy2loc(x - 2 * size, y).lon;
    const RIGHT = xy2loc(x + 2 * size, y).lon;
    const CL = xy2loc(x - 1 * size, y).lon;
    const CR = xy2loc(x + 1 * size, y).lon;

    return [
      { lat, lon: LEFT },
      { lat: TOP, lon: CL },
      { lat: TOP, lon: CR },
      { lat, lon: RIGHT },
      { lat: BOTTOM, lon: CR },
      { lat: BOTTOM, lon: CL },
    ];
  }
}
