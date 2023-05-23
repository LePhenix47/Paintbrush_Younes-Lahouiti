import { Interval } from "./utils/classes/services/interval.class";
import {
  hexColorToRgb,
  hslColorToHex,
  hslColorToHwb,
  rgbColorToHsl,
  transformColorModel,
} from "./utils/functions/color-conversion.functions";
import { assert, count, log, table } from "./utils/functions/console.functions";
import {
  getAncestor,
  getParent,
  modifyAttribute,
  selectByClass,
  selectQuery,
  selectQueryAll,
} from "./utils/functions/dom.functions";
import { formatText } from "./utils/functions/string.functions";

const tracker = {
  tool: "brush",
  fill: "#000000",
  stroke: "transparent",
  strokeWidth: 0,
  size: 5,
  isDrawing: false,
  shadow: "#000000",
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  hasShape: false,
  shape: "none",
  sides: 3,
  innerRadius: 1,
  globalCompositeOperation: "source-over",
};

const mouseInfos = {
  x: null,
  y: null,
};

log(transformColorModel("#ff0000", "Hex", "HSL"));

const canvasPaint: HTMLCanvasElement = selectQuery("canvas.index__canvas");

const toolsContainer: HTMLFieldSetElement = selectQuery(".tools");
const colorsContainer: HTMLFieldSetElement = selectQuery(".colors");
const controlsContainer: HTMLFieldSetElement = selectQuery(".controls");
const shapesContainer: HTMLFieldSetElement = selectQuery(".shapes");
const miscellaneousContainer: HTMLFieldSetElement =
  selectQuery(".miscellaneous");

function setToolsContainerEvents() {
  const radioInputsArray: HTMLInputElement[] = selectByClass(
    "tools__input",
    toolsContainer
  );

  for (const radioInput of radioInputsArray) {
    radioInput.addEventListener("change", setToolToTracker);
  }
}
setToolsContainerEvents();

function setColorsContainerEvents() {
  const rotateHueCheckboxesArray: HTMLInputElement[] = selectQueryAll(
    ".color__input--checkbox:not(input#fill-show, input#stroke-show)"
  );

  table(rotateHueCheckboxesArray);

  for (const rotateHueInput of rotateHueCheckboxesArray) {
    rotateHueInput.addEventListener("change", setHueRotationAuto);
  }
}
setColorsContainerEvents();

function setControlsContainerEvents() {}

function setShapesContainerEvents() {}

function setMiscellaneousContainerEvents() {}

const checkboxHueRotation = {
  fill: {
    id: 0,
    hue: 0,
  },
  stroke: {
    id: 0,
    hue: 0,
  },
};
function setHueRotationAuto(event: Event) {
  //@ts-ignore
  const checkboxInput: HTMLInputElement = event.currentTarget;

  const container: HTMLElement = getAncestor(
    checkboxInput,
    ".colors__container"
  );

  const colorsInput: HTMLInputElement = selectQuery(
    ".colors__input",
    container
  );

  const colorInputPart: string = colorsInput.id;

  const isChecked: boolean = checkboxInput.checked;
  if (isChecked) {
    checkboxHueRotation[colorInputPart].hue = 0;

    checkboxHueRotation[colorInputPart].id = Interval.set(
      500,
      convertAndRotateHue,
      colorsInput,
      checkboxHueRotation[colorInputPart]
    );
  } else {
    Interval.clear(checkboxHueRotation[colorInputPart].id);
  }

  log(colorsInput);
}

function convertAndRotateHue(
  input: HTMLInputElement,
  checkboxObject: {
    id: number;
    hue: number;
  }
) {
  const initialHexValue: string = input.value;

  const { red, green, blue } = hexColorToRgb(initialHexValue);
  let { hue, saturation, lightness } = rgbColorToHsl(red, green, blue);

  checkboxObject.hue = hue;
  checkboxObject.hue++;

  const newUpdatedHexColor: string = hslColorToHex(
    checkboxObject.hue,
    saturation,
    lightness
  );

  log(initialHexValue);
  log("test:", { red, green, blue }, newUpdatedHexColor);
}

function setToolToTracker(event: Event) {
  //@ts-ignore
  const radioInput: HTMLInputElement = event.currentTarget;

  tracker.tool = radioInput.id;
  log(tracker);
}

/**
 * Sets up event listeners for the checkboxes to automatically update input values.
 *
 * @returns {void}
 */
function setAutoUpdateCheckboxEvents(): void {
  const inputCheckboxRangeArray: HTMLInputElement[] = selectByClass(
    "controls__input--checkbox"
  );

  const inputColorArray: HTMLInputElement[] = selectByClass("input--color");

  const inputRangeArray: HTMLInputElement[] = selectByClass(
    "controls__input--range"
  );

  for (const checkboxInputForRange of inputCheckboxRangeArray) {
    checkboxInputForRange.addEventListener("change", updateRangeInputValues);
  }

  for (const rangeInput of inputRangeArray) {
    rangeInput.addEventListener("input", setRangeInputValues);
  }

  for (const colorInput of inputColorArray) {
    colorInput.addEventListener("input", setColorInputValues);
  }
}
setAutoUpdateCheckboxEvents();

const rangeInputsInfosTracker = {
  size: {
    id: 0,
    direction: "forwards",
  },
  rotation: {
    id: 0,
    direction: "forwards",
  },
};

/**
 * Updates the range input values based on the checkbox state.
 *
 * @param {Event} event - The event triggered by the checkbox change.
 *
 * @returns {void}
 */
function updateRangeInputValues(event: Event): void {
  //@ts-ignore
  const checkboxInput: HTMLInputElement = event.currentTarget;

  const inputName: string = checkboxInput.name;

  const isChecked: boolean = checkboxInput.checked;
  if (isChecked) {
    //@ts-ignore
    rangeInputsInfosTracker[inputName].id = Interval.set(
      10,
      animateInputRange,
      checkboxInput
    );
  } else {
    //@ts-ignore
    Interval.clear(rangeInputsInfosTracker[inputName].id);
  }
}

/**
 * Animates the input range value.
 *
 * @param {HTMLInputElement} checkboxInput - The checkbox input element.
 *
 * @returns {void}
 */
function animateInputRange(checkboxInput: HTMLInputElement): void {
  const inputName: string = checkboxInput.name;

  const container: HTMLElement = getAncestor(
    checkboxInput,
    ".controls__brush-container"
  );

  const rangeInput: HTMLInputElement = selectQuery(
    ".controls__input--range",
    container
  );

  const currentValue: number = Number(rangeInput.value);
  const maxValue: number = Number(rangeInput.max);
  const minValue: number = Number(rangeInput.min);

  let counter: number = 1;

  const overflows: boolean = currentValue >= maxValue;
  if (overflows) {
    rangeInputsInfosTracker[inputName].direction = "backwards";
  }

  const underflows: boolean = currentValue <= minValue;
  if (underflows) {
    rangeInputsInfosTracker[inputName].direction = "forwards";
  }

  const directionIsForwards: boolean =
    rangeInputsInfosTracker[inputName].direction === "forwards";
  if (directionIsForwards) {
    //@ts-ignore
    rangeInput.value = currentValue + counter;
  } else {
    //@ts-ignore
    rangeInput.value = currentValue - counter;
  }
  const valueWithUnit: string = `${rangeInput.value}`;

  setSpanToInputValue(container, valueWithUnit);
}

/**
 * Sets the range input values.
 *
 * @param {Event} event - The event triggered by the input change.
 *
 * @returns {void}
 */
function setRangeInputValues(event: Event): void {
  //@ts-ignore
  const rangeInput: HTMLInputElement = event.currentTarget;
  const inputValue: string = rangeInput.value;

  const label: HTMLLabelElement = getParent(rangeInput);

  setSpanToInputValue(label, inputValue);
}

/**
 * Sets the color input values.
 *
 * @param {Event} event - The event triggered by the input change.
 *
 * @returns {void}
 */
function setColorInputValues(event: Event): void {
  //@ts-ignore
  const input: HTMLInputElement = event.currentTarget;

  const formattedInputValue: string = formatText(input.value, "uppercase");

  const label: HTMLLabelElement = getParent(input);
  setSpanToInputValue(label, formattedInputValue);

  const container: HTMLElement = getParent(label);

  const colorCheckboxesDiv = selectQuery("div", container);
  log(colorCheckboxesDiv);

  const colorType: string = input.id;

  //Check here if color needs to be transparent
  const needsToBeTransparent: boolean =
    checkIfNeedsToBeTransparent(colorCheckboxesDiv);
  if (needsToBeTransparent) {
    tracker[colorType] = "transparent";
  } else {
    tracker[colorType] = formattedInputValue;
  }

  log(tracker);
}

function checkIfNeedsToBeTransparent(container: HTMLElement): boolean {
  const checkbox: HTMLInputElement = selectQuery(
    "input[type=checkbox]",
    container
  );
  return !checkbox.checked;
}

/**
 * Sets the span element to display the input value.
 *
 * @param {any} container - The container element.
 * @param {any} value - The value to be displayed.
 *
 * @returns {void}
 */
function setSpanToInputValue(container: HTMLElement, value: any): void {
  const spanLabel: HTMLSpanElement = selectQuery("span", container);

  spanLabel.textContent = value;
}
