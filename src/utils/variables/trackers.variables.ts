import {
  checkboxHueRotationType,
  pointerInfosType,
  rangeInputsInfosTrackerType,
  trackerType,
} from "./trackers-types.variables";

//For the canvas
/**
 * The tracker object representing the current state of the drawing tool.
 * @type {Object}
 *
 * @property {string} tool - The current drawing tool.
 * @property {string} fill - The fill color.
 * @property {string} stroke - The stroke color.
 * @property {number} strokeWidth - The stroke width.
 * @property {number} size - The size of the drawing tool.
 * @property {number} angle - The rotation angle.
 * @property {string} shadow - The shadow color.
 * @property {number} shadowBlur - The blur level of the shadow.
 * @property {number} shadowOffsetX - The horizontal offset of the shadow.
 * @property {number} shadowOffsetY - The vertical offset of the shadow.
 * @property {boolean} hasEditableShape - Indicates if a shape is editable.
 * @property {string} shape - The shape of the drawing tool.
 * @property {number} sides - The number of sides for polygon and star shape.
 * @property {number} innerRadius - The inner radius of star shape.
 * @property {GlobalCompositeOperation} globalCompositeOperation - The global composite operation.
 * @property {string[]} filters - The filters for a particular context.
 */
export const tracker: trackerType = {
  tool: "pen",
  fill: "#000000",
  stroke: "transparent",
  strokeWidth: 0,
  size: 25,
  angle: 0,
  shadow: "transparent",
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  hasEditableShape: false,
  shape: "square",
  sides: 5,
  innerRadius: 45,
  globalCompositeOperation: "source-over",
  filters: [],
};

/**
 * The object storing the mouse coordinates.
 * @type {Object}
 * @property {number} x - The x-coordinate of the mouse.
 * @property {number} y - The y-coordinate of the mouse.
 *  @property {boolean} isDrawing - Indicates if the user is currently drawing by clicing the mouse and moving it.
 */
export const pointerInfos: pointerInfosType = {
  x: NaN,
  y: NaN,
  isDrawing: false,
};

//For specific functions
/**
 * An object representing the checkbox hue rotation settings.
 * @type {CheckboxHueRotation}
 */
export const checkboxHueRotation: checkboxHueRotationType = {
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
 * An object representing the range inputs information for the tracker.
 * @type {RangeInputsInfosTracker}
 */
export const rangeInputsInfosTracker: rangeInputsInfosTrackerType = {
  size: {
    id: 0,
    direction: "forwards",
  },
  rotation: {
    id: 0,
    direction: "forwards",
  },
};
