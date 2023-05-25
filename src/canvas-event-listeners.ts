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

export function handlePointerMove(event: PointerEvent) {
  event.preventDefault();
  const canvas: HTMLCanvasElement = selectQuery("canvas.index__canvas");
  const { x, y }: DOMRect = canvas.getBoundingClientRect();

  if (
    event.pointerType === "mouse" ||
    event.pointerType === "pen" ||
    event.pointerType === "touch"
  ) {
    mouseInfos.x = event.clientX - x;
    mouseInfos.y = event.clientY - y;
  }
}

export function handlePointerDown(event: PointerEvent) {
  log(event);
  event.preventDefault();
  if (event.pointerType === "mouse" && event.button === 0) {
    mouseInfos.isDrawing = true;
    //@ts-ignore
  } else if (event.pointerType === "touch") {
    mouseInfos.isDrawing = true;
  }
}

export function handlePointerUp(event: PointerEvent) {
  log(event);
  event.preventDefault();
  if (event.pointerType === "mouse" && event.button === 0) {
    mouseInfos.isDrawing = false;
  } else if (event.pointerType === "touch") {
    mouseInfos.isDrawing = false;
  }
}

/*

function setCanvasEventListeners(): void {

  window.addEventListener("resize", handleWindowResize);
}



setCanvasEventListeners();

*/
