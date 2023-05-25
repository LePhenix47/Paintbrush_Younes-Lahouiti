/**
 * The tracker object representing the current state of the drawing tool.
 */
export type trackerType = {
  tool: string;
  fill: string;
  stroke: string;
  strokeWidth: number;
  size: number;
  angle: number;
  shadow: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  hasEditableShape: boolean;
  shape: string;
  sides: number;
  innerRadius: number;
  globalCompositeOperation: GlobalCompositeOperation;
};

/**
 * The X and Y coordinates of the cursor in the page
 */
export type pointerInfosType = {
  x: number;
  y: number;
  isDrawing: boolean;
};

/**
 * The hue rotation infos for the input type color effect
 */
export type checkboxHueRotationType = {
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

/**
 * The range inputs infos for the value going back and forth effect
 */
export type rangeInputsInfosTrackerType = {
  size: {
    id: number;
    direction: string;
  };
  rotation: {
    id: number;
    direction: string;
  };
};
