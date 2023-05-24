import {
  checkboxHueRotationType,
  mouseInfosType,
  rangeInputsInfosTrackerType,
  trackerType,
} from "./trackers-types.variables";

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
 * @property {boolean} isDrawing - Indicates if the user is currently drawing.
 * @property {string} shadow - The shadow color.
 * @property {number} shadowBlur - The blur level of the shadow.
 * @property {number} shadowOffsetX - The horizontal offset of the shadow.
 * @property {number} shadowOffsetY - The vertical offset of the shadow.
 * @property {boolean} hasEditableShape - Indicates if a shape is editable.
 * @property {string} shape - The shape of the drawing tool.
 * @property {number} sides - The number of sides for polygon and star shape.
 * @property {number} innerRadius - The inner radius of star shape.
 * @property {string} globalCompositeOperation - The global composite operation.
 */
export const tracker: trackerType = {
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

/**
 * The object storing the mouse coordinates.
 * @type {Object}
 * @property {number} x - The x-coordinate of the mouse.
 * @property {number} y - The y-coordinate of the mouse.
 */
export const mouseInfos: mouseInfosType = {
  x: NaN,
  y: NaN,
};

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
