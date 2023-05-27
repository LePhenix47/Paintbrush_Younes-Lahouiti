import { canvasState, tracker } from "../variables/trackers.variables";
import { spliceArray } from "./array-sets.functions";
import { log } from "./console.functions";

/**
 * Adds a new filter to the tracker's filters array.
 *
 * @param {string} filterToAdd - The filter to add to the filters array.
 */
export function addNewCanvasFilterFromTracker(filterToAdd: string) {
  canvasState.filters.push(filterToAdd);
}

/**
 * Changes the value or unit of a filter in the tracker's filters array.
 *
 * @param {string} filter - The filter to change.
 * @param {string} value - The new value for the filter.
 * @param {string} unit - The new unit for the filter.
 */
export function changeCanvasFilterValueOrUnit(
  filter: string,
  value: string,
  unit: string
) {
  const filterInputted: string = `${filter}(${value}${unit})`;

  log("Filter to change:", filter, value, unit);

  /**
   * Find the index of the filter in the filters array.
   * @type {number}
   */
  let indexOfFilter: number = canvasState.filters.findIndex(
    (chosenFilter: string) => {
      return chosenFilter.includes(filter);
    }
  );

  /**
   * Check if the filter was not found in the array.
   * @type {boolean}
   */
  const hasNotFoundFilter: boolean = indexOfFilter < 0;
  if (hasNotFoundFilter) {
    return;
  }

  /**
   * Update the filters array by replacing the filter at the specified index with the new filter.
   * @type {{removedItems: any[], newArray: any[]}}
   */
  const {
    newArray,
  }: {
    removedItems: any[];
    newArray: any[];
  } = spliceArray(canvasState.filters, indexOfFilter, 1, filterInputted);

  canvasState.filters = newArray;
}

/**
 * Removes a filter from the tracker's filters array.
 *
 * @param {string} filterToRemove - The filter to remove from the filters array.
 */
export function removeCanvasFilterFromTracker(filterToRemove: string) {
  canvasState.filters = canvasState.filters.filter((chosenFilter) => {
    return !chosenFilter.includes(filterToRemove);
  });
}
