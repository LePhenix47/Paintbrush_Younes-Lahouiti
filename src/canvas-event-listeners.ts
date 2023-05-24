import { clearOldPaint } from "./utils/functions/canvas.functions";
import { log } from "./utils/functions/console.functions";
import { selectQuery } from "./utils/functions/dom.functions";
import { mouseInfos } from "./utils/variables/trackers.variables";

export function clearOldCanvasPaint(
  event: Event,
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
) {
  clearOldPaint(context, canvas.width, canvas.height);
}

export function setMouseCoordinates(event: MouseEvent) {
  const canvas: HTMLCanvasElement = selectQuery("canvas.index__canvas");
  const { x, y }: DOMRect = canvas.getBoundingClientRect();

  mouseInfos.x = event.x - x;
  mouseInfos.y = event.y - y;
}

export function setDrawingToTrue(event: MouseEvent) {
  /*
    Event buttons number meaning

    0: Left click
    
    1: Middle click (scroll wheel click)
    
    2: Right click
    */
  const userIsHoldingMouseLeftClick: boolean = event.button === 0;
  if (userIsHoldingMouseLeftClick) {
    mouseInfos.isDrawing = true;
  }
}

export function setDrawingToFalse(event: MouseEvent) {
  /*
    Event buttons number meaning

    0: Left click
    
    1: Middle click (scroll wheel click)
    
    2: Right click
    */
  const userReleasedMouseLeftClick: boolean = event.button === 0;
  if (userReleasedMouseLeftClick) {
    mouseInfos.isDrawing = false;
  }
}
