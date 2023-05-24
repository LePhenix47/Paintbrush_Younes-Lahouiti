import { get2DContext } from "../../functions/canvas.functions";
import { log } from "../../functions/console.functions";
import {
  mouseInfosType,
  trackerType,
} from "../../variables/trackers-types.variables";

export class PaintBrush {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;

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
  globalCompositeOperation: string;

  x: number;
  y: number;
  isDrawing: boolean;

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
    }: trackerType,
    { x, y, isDrawing }: mouseInfosType
  ) {
    this.canvas = canvas;
    this.context = get2DContext(this.canvas);

    this.updatePropertyValues(
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
      },
      { x, y, isDrawing }
    );

    log(this);
  }

  updatePropertyValues(
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
    }: trackerType,
    { x, y, isDrawing }: mouseInfosType
  ) {
    this.tool = tool;

    this.fill = fill;

    this.stroke = stroke;

    this.strokeWidth = strokeWidth;

    this.size = size;

    this.angle = angle;

    this.shadow = shadow;
    this.shadowBlur = shadowBlur;
    this.shadowOffsetX = shadowOffsetX;
    this.shadowOffsetY = shadowOffsetY;

    this.hasEditableShape = hasEditableShape;
    this.shape = shape;
    this.sides = sides;
    this.innerRadius = innerRadius;

    this.globalCompositeOperation = globalCompositeOperation;

    this.x = x;
    this.y = y;

    this.isDrawing = isDrawing;
  }

  drawOnCanvas() {
    const isNotDawing: boolean = !this.isDrawing;
    if (isNotDawing) {
      return;
    }

    switch (this.shape) {
      case "circle": {
        this.drawCircle();
        break;
      }

      case "square": {
        this.drawSquare();
        break;
      }

      default: {
        break;
      }
    }
  }

  private drawCircle() {
    this.context.fillStyle = this.fill;

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);

    this.context.fill();
  }

  private drawSquare() {
    this.context.fillStyle = this.fill;

    this.context.fillRect(
      this.x - this.size,
      this.y - this.size,
      this.size * 2,
      this.size * 2
    );

    this.context.fill();
  }

  private drawStar() {
    this.context.save();

    this.context.restore();
  }

  private drawPolygon() {
    this.context.save();

    this.context.restore();
  }
}
