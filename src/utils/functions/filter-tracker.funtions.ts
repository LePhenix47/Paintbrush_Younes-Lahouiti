import { tracker } from "../variables/trackers.variables";
import { joinArrayOnChar } from "./array-sets.functions";
import { log } from "./console.functions";
import { matchRegExp, replaceText, splitString } from "./string.functions";

export function removeDuplicateFilters(filterToVerify: string) {}

function getValuesInsideParentheses(string: string) {
  const parenthesesREGEX: RegExp = /\((.*?)\)/g;

  const matchingStrings: string[] = matchRegExp(string, parenthesesREGEX);

  return joinArrayOnChar(matchingStrings, " ");
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
  parameterToChange: string
) {
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

  log(getValuesInsideParentheses(filterToChange));
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
