import { tracker } from "../variables/trackers.variables";
import { joinArrayOnChar } from "./array-sets.functions";
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

  tracker.filters += filterToAdd + " ";
}

export function changeFilterValueOrUnit(
  filter: string,
  value: string,
  unit: string
) {
  log("Filter to change:", filter, value, unit);
  const chosenFilters: string[] = splitString(tracker.filters, " ");

  let filterToChange: string = chosenFilters.find((chosenFilter) => {
    return chosenFilter.includes(filter);
  });

  const hasNotFoundFilter = !filterToChange;
  if (hasNotFoundFilter) {
    log(`%cFilter ${filter} NOT found!`, "background: red");
    return;
  }

  log(`%cFilter ${filter} found!`, "background: green", filterToChange);

  log(replaceInParentheses("test(123)", "456"));
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
