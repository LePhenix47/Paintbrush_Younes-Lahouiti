import {
  handlePointerDown,
  handlePointerMove,
  handlePointerUp,
} from "./canvas-event-listeners";
import {
  changeTrackerTransparency,
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
import { PaintBrush } from "./utils/classes/effects/paintbrush.class";
import { PreviewPaintBrush } from "./utils/classes/effects/preview-paintbrush.class";
import { Interval } from "./utils/classes/services/interval.class";
import {
  clearOldPaint,
  get2DContext,
} from "./utils/functions/canvas.functions";
import {
  assert,
  dir,
  group,
  groupCollapsed,
  groupEnd,
  log,
  table,
} from "./utils/functions/console.functions";
import {
  selectByClass,
  selectQuery,
  selectQueryAll,
} from "./utils/functions/dom.functions";
import { pointerInfos, tracker } from "./utils/variables/trackers.variables";

/**
 * The canvas element for painting
 * @type {HTMLCanvasElement}
 */
const canvasPaint: HTMLCanvasElement = selectQuery("canvas.index__canvas");
const canvasPaintContext: CanvasRenderingContext2D = get2DContext(canvasPaint);

/**
 * The canvas element to preview the shape we're drawing
 * @type {HTMLCanvasElement}
 */
const canvasForPreview: HTMLCanvasElement = selectQuery(
  "canvas.shapes__canvas"
);
const canvasForPreviewContext: CanvasRenderingContext2D =
  get2DContext(canvasForPreview);

/**
 * The container element for tools.
 * @type {HTMLFieldSetElement}
 */
const toolsContainer: HTMLFieldSetElement = selectQuery("fieldset.tools");

/**
 * The container element for colors.
 * @type {HTMLFieldSetElement}
 */
const colorsContainer: HTMLFieldSetElement = selectQuery("fieldset.colors");

/**
 * The container element for controls.
 * @type {HTMLFieldSetElement}
 */
const controlsContainer: HTMLFieldSetElement = selectQuery("fieldset.controls");

/**
 * The container element for shapes.
 * @type {HTMLFieldSetElement}
 */
const shapesContainer: HTMLFieldSetElement = selectQuery("fieldset.shapes");

/**
 * The container element for miscellaneous options.
 * @type {HTMLFieldSetElement}
 */
const miscellaneousContainer: HTMLFieldSetElement = selectQuery(
  "fieldset.miscellaneous"
);

/**
 * Sets the event listeners for the tools container.
 * @returns {void}
 */
function setToolsContainerEvents(): void {
  const radioInputsArray: HTMLInputElement[] = selectByClass(
    "tools__input",
    toolsContainer
  );

  for (const radioInput of radioInputsArray) {
    /**
     * Event handler for the change event on the radio inputs in the tools container.
     * @param {Event} event - The event triggered by the radio input change.
     * @returns {void}
     */
    radioInput.addEventListener("change", setToolToTracker);
  }

  const clearCanvasButton: HTMLButtonElement = selectQuery(".tools__button");
  clearCanvasButton.addEventListener("click", () => {
    clearOldPaint(canvasPaintContext, canvasPaint.width, canvasPaint.height);
  });
}
setToolsContainerEvents();

/**
 * Sets the event listeners for the colors container.
 * @returns {void}
 */
function setColorsContainerEvents(): void {
  const rotateHueCheckboxesArray: HTMLInputElement[] = selectQueryAll(
    ".color__input--checkbox:not(input#fill-show, input#stroke-show)"
  );

  for (const rotateHueInput of rotateHueCheckboxesArray) {
    /**
     * Event handler for the change event on the rotate hue checkboxes in the colors container.
     * @param {Event} event - The event triggered by the checkbox change.
     * @returns {void}
     */
    rotateHueInput.addEventListener("change", setHueRotationAuto);
  }

  const strokeWidthInputElement: HTMLInputElement = selectQuery(
    ".colors__input--stroke-width"
  );

  /**
   * Event handler for the input event on the stroke width input in the colors container.
   * @param {Event} event - The event triggered by the input change.
   * @returns {void}
   */
  strokeWidthInputElement.addEventListener("input", setNumberInputValues);
}
setColorsContainerEvents();

/**
 * Sets the event listeners for the controls container.
 * @returns {void}
 */
function setControlsContainerEvents(): void {
  const inputCheckboxRangeArray: HTMLInputElement[] = selectByClass(
    "controls__input--checkbox"
  );
  for (const checkboxInputForRange of inputCheckboxRangeArray) {
    /**
     * Event handler for the change event on the input checkboxes in the controls container.
     * @param {Event} event - The event triggered by the checkbox change.
     * @returns {void}
     */
    checkboxInputForRange.addEventListener("change", updateRangeInputValues);
  }

  const inputColorArray: HTMLInputElement[] = selectByClass("input--color");
  for (const colorInput of inputColorArray) {
    /**
     * Event handler for the input event on the color inputs in the controls container.
     * @param {Event} event - The event triggered by the input change.
     * @returns {void}
     */
    colorInput.addEventListener("input", setColorInputValues);
  }

  const inputCheckboxShowArray: HTMLInputElement[] =
    selectByClass("show-input");
  for (const checkboxInput of inputCheckboxShowArray) {
    checkboxInput.addEventListener("change", changeTrackerTransparency);
  }

  const inputRangeArray: HTMLInputElement[] = selectByClass(
    "controls__input--range"
  );

  for (const rangeInput of inputRangeArray) {
    /**
     * Event handler for the input event on the range inputs in the controls container.
     * @param {Event} event - The event triggered by the input change.
     * @returns {void}
     */
    rangeInput.addEventListener("input", setRangeInputValues);
  }

  const inputNumberArray: HTMLInputElement[] = selectByClass(
    "controls__input--number"
  );

  for (const numberInput of inputNumberArray) {
    /**
     * Event handler for the input event on the number inputs in the controls container.
     * @param {Event} event - The event triggered by the input change.
     * @returns {void}
     */
    numberInput.addEventListener("input", setNumberInputValues);
  }
}
setControlsContainerEvents();

/**
 * Sets the event listeners for the shapes container.
 * @returns {void}
 */
function setShapesContainerEvents(): void {
  const radioInputsArray: HTMLInputElement[] = selectByClass(
    "shapes__input--radio",
    shapesContainer
  );

  for (const radioInput of radioInputsArray) {
    /**
     * Event handler for the change event on the radio inputs in the shapes container.
     * @param {Event} event - The event triggered by the radio input change.
     * @returns {void}
     */
    radioInput.addEventListener("change", setShapeToTracker);
  }

  const numberInputsArray: HTMLInputElement[] = selectByClass(
    "shapes__input--number",
    shapesContainer
  );

  for (const numberInput of numberInputsArray) {
    /**
     * Event handler for the input event on the number inputs in the shapes container.
     * @param {Event} event - The event triggered by the input change.
     * @returns {void}
     */
    numberInput.addEventListener("input", setShapeNumberInputValues);
  }
}
setShapesContainerEvents();

/**
 * Sets the event listeners for the miscellaneous container.
 * @returns {void}
 */
function setMiscellaneousContainerEvents(): void {
  const select: HTMLSelectElement = selectQuery(".miscellaneous__select");

  /**
   * Event handler for the change event on the select element in the miscellaneous container.
   * @param {Event} event - The event triggered by the select change.
   * @returns {void}
   */
  select.addEventListener("change", setGlobalCompositeOperation);
}
setMiscellaneousContainerEvents();

/**
 * Sets the event listeners for the canvas to draw on.
 * @returns {void}
 */
function setCanvasEventListeners(): void {
  canvasPaint.addEventListener("pointermove", handlePointerMove);
  canvasPaint.addEventListener("pointerdown", handlePointerDown);
  canvasPaint.addEventListener("pointerup", handlePointerUp);

  canvasPaint.addEventListener("pointercancel", (e) => {
    log("Cancel");
  });

  window.addEventListener("resize", handleWindowResize);
}
setCanvasEventListeners();

let canvasAnimationFrameId: number = 0;

function handleWindowResize() {
  canvasPaint.width = canvasPaint.clientWidth;
  canvasPaint.height = canvasPaint.clientHeight;

  canvasForPreview.width = canvasForPreview.clientWidth;
  canvasForPreview.height = canvasForPreview.clientHeight;
}
handleWindowResize();

let mainPaintbrushEffectHandler: PaintBrush = new PaintBrush(
  canvasPaint,
  tracker,
  pointerInfos
);

let previewPaintbrushEffectHandler: PreviewPaintBrush = new PreviewPaintBrush(
  canvasForPreview,
  tracker
);
function animate() {
  //We simply draw on the canvas, so we don't need to clear the old paint
  drawPaintOnCanvas();

  showShapePreview();

  //We start our animation loop
  canvasAnimationFrameId = requestAnimationFrame(animate);
}
animate();

function drawPaintOnCanvas() {
  mainPaintbrushEffectHandler.drawOnCanvas();
  mainPaintbrushEffectHandler.updatePropertyValues(tracker, pointerInfos);
}

function showShapePreview() {
  previewPaintbrushEffectHandler.drawOnCanvas();

  previewPaintbrushEffectHandler.updatePropertyValues(tracker, {
    x: -10_000,
    y: -10_000,
    isDrawing: false,
  });
}

function cancelAnimation() {
  cancelAnimationFrame(canvasAnimationFrameId);
}
