import palette from "../../palettes.json";
import { setLocalStorageKey, getLocalStorageKey } from "./local-storage-helper";

// guard clause to not reset the localStorageKey - if there is no palette array in localStorage
if (!getLocalStorageKey("palette")) {
  // initiate storageKey with key name of "palette" and data from `palettes.json`
  setLocalStorageKey("palette", palette);
}

// create callback(runner?) to iterate through each color option in palette
export const createColorContainter = (colorsInPalette) => {
  const colorContainer = document.createElement("div");

  const textExample = document.createElement("p");
  // in-line CSS on innerHTML in order to have have separate colors.
  textExample.innerHTML = `<span style="color:white">Text </span> Example`;
  textExample.classList.add("color-text-example");
  // give background color equal to color palette
  textExample.style.background = colorsInPalette;

  const textExampleDiv = document.createElement("div");
  textExampleDiv.classList.add("text-example-div");
  textExampleDiv.append(textExample);

  const copyColor = document.createElement("div");
  // text body for copyColor - the <br> is used for new line
  copyColor.innerHTML = `Copy <br>${colorsInPalette}`;
  copyColor.classList.add("copy-color");
  // set color as data attribute in order to allow copy event later
  copyColor.dataset.color = colorsInPalette;

  colorContainer.classList.add("color-container");
  // appending the two elements into colorContainer
  colorContainer.append(textExampleDiv, copyColor);
  // returns and outputs completed container.
  return colorContainer;
};

// take in information about palette, create the palette, add to palette-list
// the parameter/argument is taking in the information from the `palettes.json` file.
export const makePalette = (palette) => {
  // destructuring to separate the properties/values of the palette project and be able to use it.
  const { title, colors, temperature } = palette;

  /* wireframe for palette picker.
    1. Palette Container 2. Palette Heading 3. Color Container{TextExample(x3) && CopyColor(x3)) 4. Delete Button 5. temperature */
  const li = document.createElement("li");
  const heading = document.createElement("h3");
  const deleteButton = document.createElement("button");
  const temperatureP = document.createElement("p");

  heading.textContent = title;
  li.append(heading);

  // for each element inside of color Array, create a color container and add it to li
  colors.forEach((color) => li.append(createColorContainter(color)));

  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-button");

  temperatureP.textContent = temperature;
  temperatureP.classList.add("temperature");

  temperatureP.textContent = palette["temperature"];
  if (temperatureP.textContent === "warm")
    temperatureP.style.backgroundColor = "#3D1514";
  else if (temperatureP.textContent === "cool")
    temperatureP.style.backgroundColor = "#151E41";
  else temperatureP.style.backgroundColor = "#555555";

  li.append(deleteButton, temperatureP);

  document.querySelector("#palette-list").append(li);
};

// function to invoke `makePalette` function to run on the .JSON data.
export const initPalette = () => {
  // for each element inside of the local storage "palette" array, invoke `makePalette
  getLocalStorageKey("palette").forEach(makePalette);
};
