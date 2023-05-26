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
      filters,
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
        filters,
      },
      { x: canvas.width / 2, y: canvas.width / 2, isDrawing: true }
    );

    this.canvas = canvas;
    this.context = get2DContext(this.canvas);
  }

  /**
   * Updates the property values of the PaintBrush instance.
   * @param {trackerType} tracker - The tracker object containing tool settings.
   * @param {pointerInfosType} pointerInfos - The mouse information object.
   *
   * @returns {void}
   */
  updatePropertyValues({
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
    filters,
  }: trackerType): void {
    this.tool = tool;

    this.fill = fill;

    this.stroke = stroke;

    this.strokeWidth = strokeWidth;

    this.size = size;

    this.angle = angle;

    this.context.shadowColor = shadow;
    this.context.shadowBlur = shadowBlur;
    this.context.shadowOffsetX = shadowOffsetX;
    this.context.shadowOffsetY = shadowOffsetY;

    this.hasEditableShape = hasEditableShape;
    this.shape = shape;
    this.sides = sides;
    this.innerRadius = innerRadius;

    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2;

    this.isDrawing = true;
  }

  /**
   * Draws on the canvas based on the current settings.
   *
   * @returns {void}
   */
  drawOnCanvas(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    switch (this.shape) {
      case "circle": {
        this.drawCircle();
        break;
      }

      case "square": {
        this.drawSquare();
        break;
      }

      case "star": {
        this.drawStar();
        break;
      }

      case "polygon": {
        this.drawPolygon();
        break;
      }

      default: {
        break;
      }
    }
  }
}
