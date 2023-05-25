import { clearOldPaint } from "./utils/functions/canvas.functions";
import { log } from "./utils/functions/console.functions";
import { selectQuery } from "./utils/functions/dom.functions";
import { pointerInfos } from "./utils/variables/trackers.variables";

export function handlePointerMove(event: PointerEvent) {
  event.preventDefault();
  const canvas: HTMLCanvasElement = selectQuery("canvas.index__canvas");
  const { x, y }: DOMRect = canvas.getBoundingClientRect();

  pointerInfos.x = event.clientX - x;
  pointerInfos.y = event.clientY - y;
}

export function handlePointerDown(event: PointerEvent) {
  log(event);
  event.preventDefault();

  const userIsHoldingLeftClick: boolean =
    event.pointerType === "mouse" && event.button === 0;

  const userIsTouchingScreen: boolean = event.pointerType === "touch";
  if (userIsHoldingLeftClick) {
    pointerInfos.isDrawing = true;
  } else if (userIsTouchingScreen) {
    pointerInfos.isDrawing = true;
  }
}

export function handlePointerUp(event: PointerEvent) {
  log(event);
  event.preventDefault();

  const userIsHoldingLeftClick: boolean =
    event.pointerType === "mouse" && event.button === 0;

  const userIsTouchingScreen: boolean = event.pointerType === "touch";
  if (userIsHoldingLeftClick) {
    pointerInfos.isDrawing = false;
  } else if (userIsTouchingScreen) {
    pointerInfos.isDrawing = false;
  }
}
