import { joinArrayOnChar } from "../../functions/array-sets.functions";
import { get2DContext } from "../../functions/canvas.functions";
import { log } from "../../functions/console.functions";
import {
  pointerInfosType,
  trackerType,
} from "../../variables/trackers-types.variables";

/**
 * Represents a paint brush for drawing shapes on a canvas.
 */
export class PaintBrush {
  /**
   * The HTML canvas element.
   */
  canvas: HTMLCanvasElement;

  /**
   * The 2D rendering context of the canvas.
   */
  context: CanvasRenderingContext2D;

  /**
   * The current selected drawing tool.
   */
  tool: string;

  /**
   * The fill color for shapes.
   */
  fill: string;

  /**
   * The stroke color for shapes.
   */
  stroke: string;

  /**
   * The stroke width for shapes.
   */
  strokeWidth: number;

  /**
   * The size of shapes.
   */
  size: number;

  /**
   * The rotation angle of shapes in degrees.
   */
  angle: number;

  /**
   * The shadow color for shapes.
   */
  shadow: string;

  /**
   * The blur level for the shadow of shapes.
   */
  shadowBlur: number;

  /**
   * The horizontal offset for the shadow of shapes.
   */
  shadowOffsetX: number;

  /**
   * The vertical offset for the shadow of shapes.
   */
  shadowOffsetY: number;

  /**
   * Indicates whether the shape is editable.
   */
  hasEditableShape: boolean;

  /**
   * The type of shape to draw.
   */
  shape: string;

  /**
   * The number of sides for polygons.
   */
  sides: number;

  /**
   * The inner radius for stars.
   * It refers to the distance between the center of the star and the inner points of its arms.
   *
   * It determines the "spikiness" or elongation of the star.
   */
  innerRadius: number;

  /**
   * The global composite operation for drawing.
   */
  globalCompositeOperation: GlobalCompositeOperation;

  /**
   * The x-coordinate of the current mouse position.
   */
  x: number;

  /**
   * The y-coordinate of the current mouse position.
   */
  y: number;

  /**
   * Indicates whether the user is currently drawing.
   */
  isDrawing: boolean;

  /**
   * Creates a new instance of the PaintBrush class.
   *
   * @param {HTMLCanvasElement} canvas - The HTML canvas element.
   * @param {trackerType} tracker - The tracker object containing tool settings.
   * @param {pointerInfosType} pointerInfos - The mouse information object.
   *
   */
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
    }: trackerType,
    { x, y, isDrawing }: pointerInfosType
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
        filters,
      },
      { x, y, isDrawing }
    );
  }

  /**
   * Updates the property values of the PaintBrush instance.
   * @param {trackerType} tracker - The tracker object containing tool settings.
   * @param {pointerInfosType} pointerInfos - The mouse information object.
   *
   * @returns {void}
   */
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
      filters,
    }: trackerType,
    { x, y, isDrawing }: pointerInfosType
  ): void {
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

    this.context.globalCompositeOperation = globalCompositeOperation;

    const stringifiedFilters: string = joinArrayOnChar(filters, " ");
    const hasNoFilters: boolean = !stringifiedFilters.length;
    if (hasNoFilters) {
      this.context.filter = "none";
    } else {
      log(stringifiedFilters);
      this.context.filter = stringifiedFilters;
    }

    this.x = x;
    this.y = y;

    this.isDrawing = isDrawing;
  }

  /**
   * Draws on the canvas based on the current settings.
   *
   * @returns {void}
   */
  drawOnCanvas(): void {
    const isNotDawing: boolean = !this.isDrawing;
    if (isNotDawing) {
      return;
    }

    const isErasing: boolean = this.tool === "eraser";
    if (isErasing) {
      this.erase();
      return;
    }

    const wantsToDrawWithBrush: boolean = this.tool === "pen";
    if (wantsToDrawWithBrush) {
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

  /**
   * Draws a circle on the canvas.
   *
   * @returns {void}
   */
  drawCircle(): void {
    this.context.fillStyle = this.fill;
    this.context.strokeStyle = this.stroke;
    this.context.lineWidth = this.strokeWidth;

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.context.fill();

    const hasStroke: boolean = this.strokeWidth > 0;
    if (hasStroke) {
      this.context.stroke();
    }
  }

  /**
   * Draws a square on the canvas.
   *
   * @returns {void}
   */
  drawSquare(): void {
    this.context.save();

    this.context.translate(this.x, this.y);
    this.context.rotate((this.angle * Math.PI) / 180);

    this.context.fillStyle = this.fill;
    this.context.fillRect(-this.size, -this.size, this.size * 2, this.size * 2);
    this.context.fill();

    this.context.strokeStyle = this.stroke;
    this.context.lineWidth = this.strokeWidth;

    const hasStroke: boolean = this.strokeWidth > 0;
    if (hasStroke) {
      this.context.strokeRect(
        -this.size,
        -this.size,
        this.size * 2,
        this.size * 2
      );
    }

    this.context.restore();
  }

  /**
   * Erases specified parts of the canvas.
   *
   * @returns {void}
   */
  erase(): void {
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
  /**
   * Draws a polygon on the canvas given the amount of sides in the polygon
   *
   * @returns {void}
   */
  drawPolygon(): void {
    this.context.save();
    this.context.fillStyle = this.fill;
    this.context.strokeStyle = this.stroke;
    this.context.lineWidth = this.strokeWidth;

    this.context.translate(this.x, this.y);
    this.context.rotate((this.angle * Math.PI) / 180);

    this.context.beginPath();
    this.context.moveTo(this.size, 0);

    for (let i = 1; i < this.sides; i++) {
      const angle: number = (i * Math.PI * 2) / this.sides;

      const x: number = this.size * Math.cos(angle);
      const y: number = this.size * Math.sin(angle);
      this.context.lineTo(x, y);
    }

    this.context.closePath();

    this.context.fill();

    const hasStroke: boolean = this.strokeWidth > 0;
    if (hasStroke) {
      this.context.stroke();
    }

    this.context.restore();
  }

  /**
   * Draws a star on the canvas given a radius and inner radius
   *
   * @returns {void}
   */
  drawStar(): void {
    this.context.save();
    this.context.fillStyle = this.fill;
    this.context.strokeStyle = this.stroke;
    this.context.lineWidth = this.strokeWidth;

    this.context.translate(this.x, this.y);
    this.context.rotate((this.angle * Math.PI) / 180);

    this.context.beginPath();
    this.context.moveTo(this.size, 0);

    for (let i = 1; i < this.sides * 2; i++) {
      const radius: number = i % 2 === 0 ? this.size : this.innerRadius;
      const angle: number = (i * Math.PI) / this.sides;

      const x: number = radius * Math.cos(angle);
      const y: number = radius * Math.sin(angle);

      this.context.lineTo(x, y);
    }

    this.context.closePath();

    this.context.fill();

    const hasStroke: boolean = this.strokeWidth > 0;
    if (hasStroke) {
      this.context.stroke();
    }

    this.context.restore();
  }
}
