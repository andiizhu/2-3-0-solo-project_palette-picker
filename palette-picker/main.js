import "./style.css";
import { initPalette } from "./js/dom-helpers";
import {
  handleCopy,
  handleDelete,
  handlePaletteSubmit,
} from "./js/event-handlers";
import {
  setLocalStorageKey,
  getLocalStorageKey,
} from "./js/local-storage-helper";

const ul = document.querySelector("#palette-list");
ul.addEventListener("click", handleCopy);

ul.addEventListener("click", handleDelete);

const main = () => {
  initPalette();
  document
    .querySelector("form")
    .addEventListener("submit", handlePaletteSubmit);
};

main();

if (getLocalStorageKey("palette").length === 0) {
  setLocalStorageKey("palette", initPalette);
}
