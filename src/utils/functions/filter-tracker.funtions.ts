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

function separateNumberAndLetter(str) {
  const matches = str.match(/^(\d+)(\D+)$/);
  return matches ? [matches[1], matches[2]] : [];
}

export function addNewFilterFromTracker(filterToAdd: string) {
  tracker.filters = replaceText(tracker.filters, "none", "");

  let individualFilters: string[] = splitString(tracker.filters, " ");
  individualFilters.push(filterToAdd);

  individualFilters = individualFilters.map((filter) => {
    return filter.trim();
  });

  individualFilters = individualFilters.filter((filter) => {
    return !!filter;
  });

  individualFilters = [...new Set(individualFilters)];

  log({ individualFilters });

  tracker.filters = joinArrayOnChar(individualFilters, " ");
}

export function changeFilterValueOrUnit(
  filter: string,
  value: string,
  unit: string
) {
  const filterInputted: string = `${filter}(${value}${unit})`;

  log("Filter to change:", filter, value, unit);
  let chosenFilters: string[] = splitString(tracker.filters, " ");

  //@ts-ignore
  let indexOfFilter: number = chosenFilters.find(
    (chosenFilter: string, index: number) => {
      const isFilterWeWantToChange: boolean = chosenFilter.includes(filter);
      if (isFilterWeWantToChange) {
        log("Found, index:", index);
        return index;
      }
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
  } = spliceArray(chosenFilters, indexOfFilter, 1, filterInputted);

  const updatedFilters: string = joinArrayOnChar(newArray, " ");

  tracker.filters = updatedFilters;
}

export function removeFilterFromTracker(filterToRemove: string) {
  const chosenFilters: string[] = splitString(tracker.filters, " ");

  let remainingFilters: string[] = chosenFilters.filter((chosenFilter) => {
    return !chosenFilter.includes(filterToRemove);
  });

  tracker.filters = joinArrayOnChar(remainingFilters, " ");

  const hasNoFilters: boolean = tracker.filters === "";
  if (hasNoFilters) {
    tracker.filters = "none";
  }
}

export function changeTrackerFilterValue(oldValue: string, newValue: string) {}
