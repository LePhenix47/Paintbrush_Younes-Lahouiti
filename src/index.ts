import { Interval } from "./utils/classes/services/interval.class";
import { count, log } from "./utils/functions/console.functions";
import {
  getAncestor,
  getParent,
  modifyAttribute,
  selectByClass,
  selectQuery,
  selectQueryAll,
} from "./utils/functions/dom.functions";
import { formatText } from "./utils/functions/string.functions";

log("Hello world!");

const tracker = {
  tool: "brush",
  fill: "#000000",
  stroke: "transparent",
  strokeWidth: 0,
  size: 5,
  isDrawing: false,
  hasShadow: false,
  shadow: "#000000",
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  hasShape: false,
  shape: "none",
  sides: 3,
  innerRadius: 1,
};

const canvasPaint: HTMLCanvasElement = selectQuery("canvas.index__canvas");

function setAutoUpdateCheckboxEvents() {
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
function updateRangeInputValues(event: Event) {
  //@ts-ignore
  const checkboxInput: HTMLInputElement = event.currentTarget;

  const inputName: string = checkboxInput.name;

  log(checkboxInput);

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

function setRangeInputValues(event: Event) {
  //@ts-ignore
  const rangeInput: HTMLInputElement = event.currentTarget;
  const inputValue: string = rangeInput.value;

  const label: HTMLLabelElement = getParent(rangeInput);

  setSpanToInputValue(label, inputValue);
}

function setColorInputValues(event: Event) {
  //@ts-ignore
  const input: HTMLInputElement = event.currentTarget;

  const formattedInputValue: string = formatText(input.value, "uppercase");

  const colorType: string = input.id;
  tracker[colorType] = formattedInputValue;

  const label: HTMLLabelElement = getParent(input);
  setSpanToInputValue(label, formattedInputValue);

  log(tracker);
}

function setSpanToInputValue(container: HTMLElement, value: any) {
  const spanLabel: HTMLSpanElement = selectQuery("span", container);

  spanLabel.textContent = value;
}
