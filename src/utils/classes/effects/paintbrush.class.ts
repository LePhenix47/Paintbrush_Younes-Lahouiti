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

    const isErasing: boolean = this.tool === "eraser";
    if (isErasing) {
      this.erase();
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

  private drawCircle() {
    this.context.fillStyle = this.fill;

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.context.fill();

    this.context.strokeStyle = this.stroke;
    const hasNotStroke = this.strokeWidth === 0;

    if (hasNotStroke) {
      return;
    }

    this.context.lineWidth = this.strokeWidth;
    this.context.stroke();
  }

  private drawSquare() {
    this.context.save();

    this.context.translate(this.x, this.y);
    this.context.rotate((this.angle * Math.PI) / 180);

    this.context.fillStyle = this.fill;
    this.context.fillRect(-this.size, -this.size, this.size * 2, this.size * 2);
    this.context.fill();

    this.context.strokeStyle = this.stroke;
    const hasNotStroke = this.strokeWidth === 0;

    if (hasNotStroke) {
      this.context.restore();
      return;
    }

    this.context.strokeRect(
      -this.size,
      -this.size,
      this.size * 2,
      this.size * 2
    );
    this.context.lineWidth = this.strokeWidth;
    this.context.stroke();

    this.context.restore();
  }

  private erase() {
    this.context.save();

    this.context.translate(this.x, this.y);
    this.context.rotate((this.angle * Math.PI) / 180);

    this.context.fillStyle = this.fill;
    this.context.clearRect(
      -this.size,
      -this.size,
      this.size * 2,
      this.size * 2
    );
    this.context.fill();
    this.context.restore();
  }

  private drawStar() {
    this.context.save();

    this.context.translate(this.x, this.y);
    this.context.rotate((this.angle * Math.PI) / 180);

    //
    this.context.moveTo(0, 0);

    this.context.restore();
  }

  private drawPolygon() {
    this.context.save();
    this.context.fillStyle = this.fill;

    this.context.translate(this.x, this.y);
    this.context.rotate((this.angle * Math.PI) / 180);

    this.context.beginPath();
    this.context.moveTo(this.size, 0);

    for (let i = 1; i < this.sides; i++) {
      const angle: number = (Math.PI * 2) / this.sides;

      const x: number = this.size * Math.cos(angle);
      const y: number = this.size * Math.sin(angle);
      this.context.lineTo(x, y);
    }

    this.context.fill();

    this.context.closePath();
    this.context.restore();
  }
}
