import { log } from "./utils/functions/console.functions";
import { mouseInfos } from "./utils/variables/trackers.variables";

export function handleWindowResize() {}

export function setMouseCoordinates(event: MouseEvent) {
  mouseInfos.x = event.x;
  mouseInfos.y = event.y;
}

export function setDrawingToTrue(event: MouseEvent) {
  const userIsHoldingMouseLeftClick: boolean = event.button === 0;
  if (userIsHoldingMouseLeftClick) {
    mouseInfos.isDrawing = true;
  }
  log(mouseInfos);
}

export function setDrawingToFalse(event: MouseEvent) {
  const userReleasedMouseLeftClick: boolean = event.button === 0;
  if (userReleasedMouseLeftClick) {
    mouseInfos.isDrawing = false;
  }
  log(mouseInfos);
}
