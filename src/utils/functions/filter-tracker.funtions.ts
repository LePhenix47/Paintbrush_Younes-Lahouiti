import { tracker } from "../variables/trackers.variables";
import { joinArrayOnChar, spliceArray } from "./array-sets.functions";
import { log } from "./console.functions";
import {
  matchRegExp,
  replaceText,
  sliceString,
  splitString,
} from "./string.functions";

export function removeDuplicateFilters(filterToVerify: string) {}

function getValuesInsideParentheses(string: string) {
  const insideParenthesesREGEX: RegExp = /\((.*?)\)/g;

  const matchingCharStrings: string[] = matchRegExp(
    string,
    insideParenthesesREGEX
  );

  let valueInsideParentheses: string = joinArrayOnChar(
    matchingCharStrings,
    " "
  );

  valueInsideParentheses = sliceString(valueInsideParentheses, 1, -1);

  return valueInsideParentheses;
}

/**
 * Replaces the values inside parentheses in a string with the specified replacement.
 *
 * @param {string} string - The string to modify.
 * @param {string} replacement - The replacement value for the values inside parentheses.
 *
 * @returns {string} - The modified string with replaced values inside parentheses.
 */
export function replaceInParentheses(
  string: string,
  replacement: string
): string {
  return string.replace(/\([^()]+\)/g, `(${replacement})`);
}

export function addNewFilterFromTracker(filterToAdd: string) {
  tracker.filters.push(filterToAdd);

  const { filters } = tracker;
  log({ filters });
}

export function changeFilterValueOrUnit(
  filter: string,
  value: string,
  unit: string
) {
  const filterInputted: string = `${filter}(${value}${unit})`;

  log("Filter to change:", filter, value, unit);

  let indexOfFilter: number = tracker.filters.findIndex(
    (chosenFilter: string, index: number) => {
      return chosenFilter.includes(filter);
    }
  );

  const hasNotFoundFilter: boolean = indexOfFilter < 0;
  if (hasNotFoundFilter) {
    return;
  }

  const {
    newArray,
  }: {
    removedItems: any[];
    newArray: any[];
  } = spliceArray(tracker.filters, indexOfFilter, 1, filterInputted);

  tracker.filters = newArray;
}

export function removeFilterFromTracker(filterToRemove: string) {
  tracker.filters = tracker.filters.filter((chosenFilter) => {
    return !chosenFilter.includes(filterToRemove);
  });
}

export function changeTrackerFilterValue(oldValue: string, newValue: string) {}
