import { generateCoords } from "./js/app";
import { getWeather } from "./js/app";
import { postData } from "./js/app";
import { getCountdown } from "./js/getCountdown";
import { getTripLength } from "./js/getTripLength";
import { Loader } from "@googlemaps/js-api-loader";
import "../client/styles/style.scss";

// Loading weather icons
function importAll(r) {
  return r.keys().map(r);
}
// importAll(require.context("./media/icons", false, /\.(png)$/));

export {
  generateCoords,
  getWeather,
  postData,
  getCountdown,
  getTripLength,
  Loader,
};
