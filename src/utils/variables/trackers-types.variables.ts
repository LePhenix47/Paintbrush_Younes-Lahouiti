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
  isDrawing: boolean;
  shadow: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  hasEditableShape: boolean;
  shape: string;
  sides: number;
  innerRadius: number;
  globalCompositeOperation: string;
};

export type mouseInfosType = {
  x: number;
  y: number;
};

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
