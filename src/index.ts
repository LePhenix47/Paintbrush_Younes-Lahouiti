import {
  setColorInputValues,
  setGlobalCompositeOperation,
  setHueRotationAuto,
  setNumberInputValues,
  setRangeInputValues,
  setShapeNumberInputValues,
  setShapeToTracker,
  setToolToTracker,
  updateRangeInputValues,
} from "./tracker-event-listeners";
import { assert, log, table } from "./utils/functions/console.functions";
import {
  selectByClass,
  selectQuery,
  selectQueryAll,
} from "./utils/functions/dom.functions";

export const tracker = {
  tool: "brush",
  fill: "#000000",
  stroke: "transparent",
  strokeWidth: 0,
  size: 5,
  angle: 0,
  isDrawing: false,
  shadow: "#000000",
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  hasEditableShape: false,
  shape: "line",
  sides: 3,
  innerRadius: 1,
  globalCompositeOperation: "source-over",
};

export const mouseInfos = {
  x: null,
  y: null,
};

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

  for (const rotateHueInput of rotateHueCheckboxesArray) {
    rotateHueInput.addEventListener("change", setHueRotationAuto);
  }

  const strokeWidthInputElement: HTMLInputElement = selectQuery(
    ".colors__input--stroke-width"
  );

  strokeWidthInputElement.addEventListener("input", setNumberInputValues);
}
setColorsContainerEvents();

function setControlsContainerEvents() {
  const inputCheckboxRangeArray: HTMLInputElement[] = selectByClass(
    "controls__input--checkbox"
  );
  for (const checkboxInputForRange of inputCheckboxRangeArray) {
    checkboxInputForRange.addEventListener("change", updateRangeInputValues);
  }

  const inputColorArray: HTMLInputElement[] = selectByClass("input--color");
  for (const colorInput of inputColorArray) {
    colorInput.addEventListener("input", setColorInputValues);
  }

  const inputRangeArray: HTMLInputElement[] = selectByClass(
    "controls__input--range"
  );

  for (const rangeInput of inputRangeArray) {
    rangeInput.addEventListener("input", setRangeInputValues);
  }

  const inputNumberArray: HTMLInputElement[] = selectByClass(
    "controls__input--number"
  );

  for (const numberInput of inputNumberArray) {
    numberInput.addEventListener("input", setNumberInputValues);
  }
}
setControlsContainerEvents();

function setShapesContainerEvents() {
  const radioInputsArray: HTMLInputElement[] = selectByClass(
    "shapes__input--radio",
    shapesContainer
  );

  for (const radioInput of radioInputsArray) {
    radioInput.addEventListener("change", setShapeToTracker);
  }

  const numberInputsArray: HTMLInputElement[] = selectByClass(
    "shapes__input--number",
    shapesContainer
  );

  for (const numberInput of numberInputsArray) {
    numberInput.addEventListener("input", setShapeNumberInputValues);
  }
}
setShapesContainerEvents();

function setMiscellaneousContainerEvents() {
  const select: HTMLSelectElement = selectQuery(".miscellaneous__select");

  select.addEventListener("change", setGlobalCompositeOperation);
}
setMiscellaneousContainerEvents();
