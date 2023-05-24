import { log } from "./utils/functions/console.functions";
import { selectQuery } from "./utils/functions/dom.functions";
import { mouseInfos } from "./utils/variables/trackers.variables";

export function clearOldCanvasPaint() {}

export function setMouseCoordinates(event: MouseEvent) {
  mouseInfos.x = event.x;
  mouseInfos.y = event.y;
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
  log(mouseInfos);
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
  log(mouseInfos);
}
