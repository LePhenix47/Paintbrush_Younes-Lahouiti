import { tracker } from "./index";
import { Interval } from "./utils/classes/services/interval.class";
import { transformColorModel } from "./utils/functions/color-conversion.functions";
import { log } from "./utils/functions/console.functions";
import {
  getAncestor,
  selectQuery,
  getParent,
  getAttribute,
  getClassListValues,
  enableElement,
  disableElement,
} from "./utils/functions/dom.functions";
import {
  formatText,
  kebabToCamelCase,
  splitString,
} from "./utils/functions/string.functions";

type checkboxHueRotationType = {
  fill: {
    animationId: number;
    hue: number;
    saturation: number;
    lightness: number;
    type: string;
  };
  stroke: {
    animationId: number;
    hue: number;
    saturation: number;
    lightness: number;
    type: string;
  };
};
const checkboxHueRotation: checkboxHueRotationType = {
  fill: {
    animationId: 0,
    hue: 0,
    saturation: 0,
    lightness: 0,
    type: "fill",
  },
  stroke: {
    animationId: 0,
    hue: 0,
    saturation: 0,
    lightness: 0,
    type: "stroke",
  },
};

/**
 * Sets the hue rotation to auto based on the checkbox state.
 *
 * @param {Event} event - The event triggered by the checkbox change.
 *
 * @returns {void}
 */
export function setHueRotationAuto(event: Event): void {
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

  const colorInputValue: string = colorsInput.value;

  const inputId: string = colorsInput.id;

  log(container);

  const { hue, saturation, lightness } = transformColorModel(
    colorInputValue,
    "hex",
    "hsl"
  );

  //We cehck if the value must be transparent
  const mustBeTransparent: boolean = checkIfNeedsToBeTransparent(container);

  //If the color is desaturated or if it's a value between white and black
  const colorIsDesaturated: boolean =
    saturation === 0 || lightness === 0 || lightness === 100;

  const cannotRotateHue: boolean = mustBeTransparent || colorIsDesaturated;

  if (cannotRotateHue) {
    return;
  }

  checkboxHueRotation[inputId].type = inputId;

  checkboxHueRotation[inputId].hue = hue;
  checkboxHueRotation[inputId].saturation = saturation;
  checkboxHueRotation[inputId].lightness = lightness;

  const isChecked: boolean = checkboxInput.checked;
  if (isChecked) {
    checkboxHueRotation[inputId].animationId = Interval.set(
      50,
      convertAndRotateHue,
      colorsInput,
      checkboxHueRotation[inputId]
    );
  } else {
    Interval.clear(checkboxHueRotation[inputId].animationId);
  }
}

/**
 * Converts and rotates the hue value.
 *
 * @param {HTMLInputElement} input - The input element.
 * @param {Object} checkboxObject - The checkbox object.
 *
 * @returns {void}
 */
function convertAndRotateHue(
  input: HTMLInputElement,
  checkboxObject: {
    id: number;
    hue: number;
    saturation: number;
    lightness: number;
    type: string;
  }
): void {
  checkboxObject.hue += 2;
  checkboxObject.hue %= 360;

  let newHexValue: string = transformColorModel(checkboxObject, "hsl", "hex");
  newHexValue = formatText(newHexValue, "uppercase");

  const label: HTMLLabelElement = getParent(input);
  //@ts-ignore
  input.value = newHexValue;
  setSpanToInputValue(label, newHexValue);

  tracker[checkboxObject.type] = newHexValue;
  log(tracker);
}

export function setGlobalCompositeOperation(event: Event) {
  //@ts-ignore
  const selectInput: HTMLSelectElement = event.currentTarget;

  const selectValue: string = selectInput.value;
  tracker.globalCompositeOperation = selectValue;

  log(tracker);
}

/**
 * Sets the tool to the tracker.
 *
 * @param {Event} event - The event triggered by the radio input change.
 *
 * @returns {void}
 */
export function setToolToTracker(event: Event): void {
  //@ts-ignore
  const radioInput: HTMLInputElement = event.currentTarget;

  tracker.tool = radioInput.id;
  log(tracker);
}

export function setShapeToTracker(event: Event) {
  //@ts-ignore
  const radioInput: HTMLInputElement = event.currentTarget;

  const formattedInputId: string = splitString(radioInput.id, "-")[0];

  tracker.shape = formattedInputId;

  const isNotAShape: boolean =
    formattedInputId !== "polygon" && formattedInputId !== "star";
  if (isNotAShape) {
    tracker.hasEditableShape = false;
  } else {
    tracker.hasEditableShape = true;
  }

  const fieldsetContainer: HTMLFieldSetElement = getAncestor(
    radioInput,
    "fieldset"
  );

  const sidesNumberInput: HTMLInputElement = selectQuery(
    "input#shape-sides-amount",
    fieldsetContainer
  );

  const innerRadiusNumberInput: HTMLInputElement = selectQuery(
    "input#shape-star-inner-radius",
    fieldsetContainer
  );

  const canHaveSides: boolean = tracker.hasEditableShape === true;
  if (canHaveSides) {
    enableElement(sidesNumberInput);
  } else {
    disableElement(sidesNumberInput);
  }

  const canHaveAnInnerRadius: boolean = formattedInputId === "star";
  if (canHaveAnInnerRadius) {
    enableElement(innerRadiusNumberInput);
  } else {
    disableElement(innerRadiusNumberInput);
  }

  log(tracker);
}

/**
 * Sets the number input values to the tracker.
 *
 * @param {Event} event - The event triggered by the number input change.
 *
 * @returns {void}
 */
export function setNumberInputValues(event: Event): void {
  //@ts-ignore
  const input: HTMLInputElement = event.currentTarget;

  const inputValueIsInvalid: boolean = isNaN(input.valueAsNumber);
  if (inputValueIsInvalid) {
    return;
  }

  handleInputValueOverflow(input, 0, Number.POSITIVE_INFINITY);

  const label: HTMLLabelElement = getParent(input);
  const labelForAttribute: string = getAttribute("for", label);

  const formattedAttribute: string = kebabToCamelCase(labelForAttribute);

  tracker[formattedAttribute] = input.valueAsNumber;
  log(tracker);
}

/**
 * Sets the number of the input values inside the shapes part to the tracker.
 *
 * @param {Event} event - The event triggered by the number input change.
 *
 * @returns {void}
 */
export function setShapeNumberInputValues(event: Event): void {
  //@ts-ignore
  const input: HTMLInputElement = event.currentTarget;

  const inputValueIsInvalid: boolean = isNaN(input.valueAsNumber);
  if (inputValueIsInvalid) {
    return;
  }

  const min: number = Number(input.min);
  const max: number = Number(input.max);

  handleInputValueOverflow(input, min, max);

  const label: HTMLLabelElement = getParent(input);
  const labelForAttribute: string = getAttribute("for", label);

  const formattedAttribute: string = kebabToCamelCase(labelForAttribute);
  switch (formattedAttribute) {
    case "shapeSidesAmount": {
      tracker.sides = input.valueAsNumber;
      break;
    }
    case "shapeStarInnerRadius": {
      tracker.innerRadius = input.valueAsNumber;
      break;
    }
  }
  log(formattedAttribute);

  log(tracker);
}

/**
 * Handles input value overflow.
 *
 * @param {HTMLInputElement} input - The input element.
 * @param {number} [min=Number.NEGATIVE_INFINITY] - The minimum value.
 * @param {number} [max=Number.POSITIVE_INFINITY] - The maximum value.
 *
 * @returns {void}
 */
function handleInputValueOverflow(
  input: HTMLInputElement,
  min: number = Number.NEGATIVE_INFINITY,
  max: number = Number.POSITIVE_INFINITY
): void {
  const inputValue: number = input.valueAsNumber;

  const valueOverflows: boolean = inputValue > max;
  if (valueOverflows) {
    input.valueAsNumber = max;
  }

  const valueUnderflows: boolean = inputValue < min;
  if (valueUnderflows) {
    input.valueAsNumber = min;
  }
}

type rangeInputsInfosTrackerType = {
  size: {
    id: number;
    direction: string;
  };
  rotation: {
    id: number;
    direction: string;
  };
};
const rangeInputsInfosTracker: rangeInputsInfosTrackerType = {
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
export function updateRangeInputValues(event: Event): void {
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
export function animateInputRange(checkboxInput: HTMLInputElement): void {
  const inputName: string = checkboxInput.name;

  const container: HTMLElement = getAncestor(
    checkboxInput,
    ".controls__brush-container"
  );
  const rangeInput: HTMLInputElement = selectQuery(
    ".controls__input--range",
    container
  );

  const currentValue: number = rangeInput.valueAsNumber;
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
    rangeInput.valueAsNumber = currentValue + counter;
  } else {
    //@ts-ignore
    rangeInput.valueAsNumber = currentValue - counter;
  }
  const valueWithUnit: string = `${rangeInput.valueAsNumber}`;

  const rangeInputName: string = rangeInput.name;

  tracker[rangeInputName] = rangeInput.valueAsNumber;

  setSpanToInputValue(container, valueWithUnit);
}

/**
 * Sets the range input values.
 *
 * @param {Event} event - The event triggered by the input change.
 *
 * @returns {void}
 */
export function setRangeInputValues(event: Event): void {
  //@ts-ignore
  const rangeInput: HTMLInputElement = event.currentTarget;
  const inputValue: number = rangeInput.valueAsNumber;

  const label: HTMLLabelElement = getParent(rangeInput);

  const rangeInputName: string = rangeInput.name;

  tracker[rangeInputName] = inputValue;

  log(tracker);

  setSpanToInputValue(label, inputValue);
}

/**
 * Sets the color input values.
 *
 * @param {Event} event - The event triggered by the input change.
 *
 * @returns {void}
 */
export function setColorInputValues(event: Event): void {
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

/**
 * Checks if the color needs to be transparent based on the checkbox state.
 *
 * @param {HTMLElement} container - The container element.
 *
 * @returns {boolean} - Whether the color needs to be transparent or not.
 */
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
 * @param {HTMLElement} container - The container element.
 * @param {any} value - The value to be displayed.
 *
 * @returns {void}
 */
function setSpanToInputValue(container: HTMLElement, value: any): void {
  const spanLabel: HTMLSpanElement = selectQuery("span", container);

  spanLabel.textContent = value;
}