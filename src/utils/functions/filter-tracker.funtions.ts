import { tracker } from "../variables/trackers.variables";
import { joinArrayOnChar } from "./array-sets.functions";
import { splitString } from "./string.functions";

export function removeDuplicateFilters(filterToVerify: string) {}

export function addNewFilterFromTracker(filterToAdd: string) {
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
}

export function removeFilterFromTracker(filterToRemove: string) {
  const chosenFilters: string[] = splitString(tracker.filters, " ");

  let remainingFilters: string[] = chosenFilters.filter((chosenFilter) => {
    return !chosenFilter.includes(filterToRemove);
  });

  tracker.filters = joinArrayOnChar(remainingFilters, " ");
}

export function changeTrackerFilterValue(oldValue: string, newValue: string) {}
