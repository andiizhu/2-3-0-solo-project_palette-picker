import { makePalette } from "./dom-helpers";
import { setLocalStorageKey, getLocalStorageKey } from "./local-storage-helper";

export const handlePaletteSubmit = (event) => {
  event.preventDefault();
  // event.target is equal to form because when the submit event occurs, the form is created.
  const form = event.target;
  console.log(event.target);

  // following the same format as the palettes.json file
  const title = form.paletteTitle.value;
  const colors = [form.color1.value, form.color2.value, form.color3.value];
  const temperature = form.temperature.value;

  makePalette({ title, colors, temperature });

  // 1. get the existing palettes in localStorage and store it in-memory
  const palette = getLocalStorageKey("palette");
  // 2. add the new palette to the in-memory array
  palette.push({ title, colors, temperature });
  // 3. update the storage with the new in-memory array
  setLocalStorageKey("palette", palette);

  form.reset();
};

export const handleCopy = (event) => {
  if (event.target.matches(".copy-color")) {
    const text = event.target.dataset.color;
    navigator.clipboard.writeText(text);
    event.target.textContent = "Copied hex!";
    setTimeout(() => {
      event.target.textContent = `Copy ${text}`;
    }, 1000);
  }
};

const copyHandler = (button) => {
  const hex = button.textContent.slice(5);

  navigator.clipboard.writeText(hex);
  button.textContent = "Copied hex!";
  setTimeout(() => {
    button.textContent = `Copy ${text}`;
  }, 1000);
};

export const handleDelete = (event) => {
  if (event.target.matches(".delete-button")) {
    event.target.parentElement.remove();
    const eventTitle = event.target.parentElement.firstChild.textContent;
    let localStorage = getLocalStorageKey("palette");
    for (let i = 0; i <= localStorage.length; i++) {
      if (localStorage[i]["title"] === eventTitle) {
        localStorage.splice([i], 1);
      }
      setLocalStorageKey("palette", localStorage);
    }
  }
};
