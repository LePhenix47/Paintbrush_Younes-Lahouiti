import {
  canvasState,
  checkboxHueRotation,
  rangeInputsInfosTracker,
  tracker,
} from "./utils/variables/trackers.variables";
import { Interval } from "./utils/classes/services/interval.class";
import { transformColorModel } from "./utils/functions/color-conversion.functions";
import { log } from "./utils/functions/console.functions";
import {
  getAncestor,
  selectQuery,
  getParent,
  getAttribute,
  enableElement,
  disableElement,
  selectQueryAll,
  getSelectOptions,
  appendChildToParent,
  modifyAttribute,
  getClassListValues,
  setStyleProperty,
} from "./utils/functions/dom.functions";
import {
  formatText,
  kebabToCamelCase,
  splitString,
} from "./utils/functions/string.functions";

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

  const { hue, saturation, lightness } = transformColorModel(
    colorInputValue,
    "hex",
    "hsl"
  );

  //We cehck if the value must be transparent
  const mustBeTransparent: boolean = checkIfNeedsToBeTransparent(container);
  log("Before", { mustBeTransparent });
  if (mustBeTransparent) {
    Interval.clear(checkboxHueRotation[inputId].animationId);
    return;
  }
  log("After IF condition", { mustBeTransparent });
  //If the color is desaturated or if it's a value between white and black
  const colorIsDesaturated: boolean =
    saturation === 0 || lightness === 0 || lightness === 100;

  if (colorIsDesaturated) {
    Interval.clear(checkboxHueRotation[inputId].animationId);
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
}

/**
 * Sets the background color of the canvas based on the event.
 *
 * @param {Event} event - The event triggering the change.
 */
export function setCanvasBackgorundColor(event: Event) {
  //@ts-ignore
  const input: HTMLInputElement = event.currentTarget;

  const labelContainer: HTMLLabelElement = getParent(input);

  const formattedValue: string = formatText(input.value, "uppercase");

  setSpanToInputValue(labelContainer, formattedValue);

  setStyleProperty("--bg-canvas", formattedValue);
}

/**
 * Inserts shape filters web components based on the event.
 *
 * @param {Event} event - The event triggering the change.
 */
export function insertShapeFilters(event: Event) {
  //@ts-ignore
  const select: HTMLSelectElement = event.currentTarget;

  const shapeSelectedOptions: string[] = getSelectOptions(select, true);

  const sectionContainer: HTMLElement = getAncestor(select, "section");
  log(sectionContainer);

  const shapeFiltersContainer: HTMLDivElement = selectQuery(
    ".miscellaneous__active-filter-container--shape",
    sectionContainer
  );

  addFilterWebComponent(
    shapeSelectedOptions,
    tracker.filters,
    shapeFiltersContainer
  );
}

/**
 * Inserts canvas filters web components based on the event.
 *
 * @param {Event} event - The event triggering the change.
 */
export function insertCanvasFilters(event: Event) {
  //@ts-ignore
  const select: HTMLSelectElement = event.currentTarget;

  const canvasSelectedOptions: string[] = getSelectOptions(select, true);

  const sectionContainer: HTMLElement = getAncestor(select, "section");

  log(sectionContainer);

  const canvasFiltersContainer: HTMLDivElement = selectQuery(
    ".miscellaneous__active-filter-container--canvas",
    sectionContainer
  );

  addFilterWebComponent(
    canvasSelectedOptions,
    canvasState.filters,
    canvasFiltersContainer
  );
}

/**
 * Adds a filter web component based on the selected options, filter array, and container.
 *
 * @param {string[]} selectedOptions - The selected options.
 * @param {string[]} filterArray - The filter array to modify.
 * @param {HTMLDivElement} container - The container element to append the filter web component to.
 */
function addFilterWebComponent(
  selectedOptions: string[],
  filterArray: string[],
  container: HTMLDivElement
) {
  const containerClasses: string[] = getClassListValues(container);
  const filterType: string = containerClasses.includes(
    "miscellaneous__active-filter-container--shape"
  )
    ? "shape-filter"
    : "canvas-filter";

  for (const optionValue of selectedOptions) {
    const isAlreadyAdded: boolean = !!filterArray.find((filter: string) => {
      return filter.includes(optionValue);
    });
    if (isAlreadyAdded) {
      continue;
    }

    const newFilterElement: HTMLElement = document.createElement(filterType);

    modifyAttribute(newFilterElement, "filter", optionValue);
    modifyAttribute(newFilterElement, "value", 0);
    modifyAttribute(newFilterElement, "unit", "%");

    appendChildToParent(newFilterElement, container);
  }
}

/**
 * Sets the global composite operation based on the event.
 *
 * @param {Event} event - The event triggering the change.
 */
export function setGlobalCompositeOperation(event: Event) {
  //@ts-ignore
  const selectInput: HTMLSelectElement = event.currentTarget;

  const selectValue: string = selectInput.value;
  //@ts-ignore
  tracker.globalCompositeOperation = selectValue;
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
  log("change", tracker.tool);
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

  const isShadowOffset: boolean = input.id.includes("shadow-offset");
  if (isShadowOffset) {
    handleInputValueOverflow(input);
  } else {
    handleInputValueOverflow(input, 0, Number.POSITIVE_INFINITY);
  }

  const label: HTMLLabelElement = getParent(input);
  const labelForAttribute: string = getAttribute("for", label);

  const formattedAttribute: string = kebabToCamelCase(labelForAttribute);

  tracker[formattedAttribute] = input.valueAsNumber;
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

  switch (inputName) {
    case "size": {
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
      break;
    }
    case "rotation": {
      const overflows: boolean = currentValue >= maxValue;

      rangeInput.valueAsNumber = currentValue + counter;

      if (overflows) {
        rangeInput.valueAsNumber = minValue;
      }

      break;
    }
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

  const colorType: string = input.id;

  //Check here if color needs to be transparent
  const needsToBeTransparent: boolean =
    checkIfNeedsToBeTransparent(colorCheckboxesDiv);

  if (needsToBeTransparent) {
    tracker[colorType] = "transparent";
  } else {
    tracker[colorType] = formattedInputValue;
  }
}

/**
 * Changes the transparency of the change tracker based on the event.
 *
 * @param {Event} event - The event triggering the change.
 */
export function changeTrackerTransparency(event: Event) {
  //@ts-ignore
  const input: HTMLInputElement = event.currentTarget;
  const showInputType = splitString(input.id, "-")[0];

  const checkboxInputContainer: HTMLDivElement = getAncestor(input, "div");

  const sectionContainer: HTMLElement = getParent(checkboxInputContainer);

  const isChecked: boolean = input.checked;
  if (isChecked) {
    const colorInput: HTMLInputElement = selectQuery(
      "input[type=color]",
      sectionContainer
    );

    const formattedColor: string = formatText(colorInput.value, "uppercase");
    tracker[showInputType] = formattedColor;
  } else {
    const hueRotateCheckbox: HTMLInputElement = selectQueryAll(
      "input[type=checkbox]",
      sectionContainer
    )[1];

    const wasRotatingHue: boolean = hueRotateCheckbox?.checked === true;
    if (wasRotatingHue) {
      hueRotateCheckbox.checked = false;
    }

    tracker[showInputType] = "transparent";
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
