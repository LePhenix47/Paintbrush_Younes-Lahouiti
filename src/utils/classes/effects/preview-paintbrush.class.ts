import { get2DContext } from "../../functions/canvas.functions";
import { trackerType } from "../../variables/trackers-types.variables";
import { PaintBrush } from "./paintbrush.class";

export class PreviewPaintBrush extends PaintBrush {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  tool: any;
  fill: any;
  stroke: any;
  strokeWidth: any;
  size: any;
  angle: any;
  hasEditableShape: any;
  shape: any;
  sides: any;
  innerRadius: any;
  x: any;
  y: any;
  isDrawing: any;
  middleX: number;
  middleY: number;

  constructor(
    canvas: HTMLCanvasElement,
    {
      tool,
      fill,
      stroke,
      strokeWidth,
      size,
      angle,
      shadow,
      shadowBlur,
      shadowOffsetX,
      shadowOffsetY,
      hasEditableShape,
      shape,
      sides,
      innerRadius,
      globalCompositeOperation,
    }: trackerType
  ) {
    super(
      canvas,
      {
        tool,
        fill,
        stroke,
        strokeWidth,
        size: 15,
        angle,
        shadow,
        shadowBlur,
        shadowOffsetX,
        shadowOffsetY,
        hasEditableShape,
        shape,
        sides,
        innerRadius,
        globalCompositeOperation,
      },
      { x: canvas.width / 2, y: canvas.width / 2, isDrawing: true }
    );

    this.canvas = canvas;
    this.context = get2DContext(this.canvas);
  }
}
