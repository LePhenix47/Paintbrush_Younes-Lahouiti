import { joinArrayOnChar } from "../utils/functions/array-sets.functions";
import { log } from "../utils/functions/console.functions";
import {
  getAttribute,
  modifyAttribute,
  selectQuery,
} from "../utils/functions/dom.functions";
import {
  formatText,
  replaceText,
  splitString,
} from "../utils/functions/string.functions";
import { tracker } from "../utils/variables/trackers.variables";
import {
  cssReset,
  darkThemeVariables,
  jsClasses,
  lightThemeVariables,
} from "../utils/variables/web-component.variables";

const activeFilterTemplateElement = document.createElement("template");

const activeFilterTemplateStyle = /* css */ `
.miscellaneous__active-filter{
     display: inline-flex;
    justify-content: center;
    align-items: center;

    gap: 10px;
}


.miscellaneous__active-filter-label {
    align-items: center;
    display: inline-flex;
    gap: 15px;
    justify-content: space-between
}

.miscellaneous__active-filter-input {
    max-width: 50px;

    text-align: center;
}

.miscellaneous__active-filter-button{ 
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
`;
const activeFilterTemplateContent = /*html */ `
 <div class="miscellaneous__active-filter">
    <label class="miscellaneous__active-filter-label" for="filter">
    <span>Blur:</span>        
        <input type="number" class="miscellaneous__active-filter-input" name="filters"
            id="filter" value="0" min="0" />
    </label>

    <label class="miscellaneous__active-filter-label" for="filter-unit">
        <select name="unit" id="filter-unit">
            <option value="%">Percentage (%)</option>
            <option value="px">Pixels (px)</option>
        </select>
    </label>

    <button type="button" class="miscellaneous__active-filter-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"
            class="no-pointer-events" fill="var(--out-of-range-color)">
            <path
                d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm3.21 11.79a1 1 0 0 1 0 1.42 1 1 0 0 1-1.42 0L12 13.41l-1.79 1.8a1 1 0 0 1-1.42 0 1 1 0 0 1 0-1.42l1.8-1.79-1.8-1.79a1 1 0 0 1 1.42-1.42l1.79 1.8 1.79-1.8a1 1 0 0 1 1.42 1.42L13.41 12Z">
            </path>
        </svg>
    </button>
</div>
`;

activeFilterTemplateElement.innerHTML = /*html */ `
  <style>
    ${lightThemeVariables}
    ${darkThemeVariables}
    ${cssReset}
    ${jsClasses}
    
    ${activeFilterTemplateStyle}
  </style>
  
  ${activeFilterTemplateContent}
`;

class ActiveFilter extends HTMLElement {
  constructor() {
    super();
    //We create the cotnainer that holds the web component
    const shadowRoot = this.attachShadow({ mode: "open" });

    //We clone the template
    const clonedTemplate = activeFilterTemplateElement.content.cloneNode(true);
    //We add it as a child of our web component
    shadowRoot.appendChild(clonedTemplate);

    //We bind the this keyword to have access to the attribute values of our web component
    this.setAttributeToWebComponent =
      this.setAttributeToWebComponent.bind(this);
  }

  get filter() {
    return getAttribute("filter", this);
  }

  set filter(newValue: string) {
    modifyAttribute(this, "filter", newValue);
  }

  get value() {
    return getAttribute("value", this);
  }

  set value(newValue: string) {
    modifyAttribute(this, "value", newValue);
  }

  get unit() {
    return getAttribute("unit", this);
  }

  set unit(newValue: string) {
    modifyAttribute(this, "unit", newValue);
  }

  static get observedAttributes() {
    //We indicate the list of attributes that the custom element wants to observe for changes.
    return ["filter", "value", "unit"];
  }

  setAttributeToWebComponent(event) {
    log(event.target.value, this);
  }

  connectedCallback() {
    const numberInput: HTMLInputElement = selectQuery(
      "input[type=number]",
      this.shadowRoot
    );

    const selectElement: HTMLSelectElement = selectQuery(
      "select",
      this.shadowRoot
    );

    numberInput.addEventListener("input", this.setAttributeToWebComponent);
    selectElement.addEventListener("input", this.setAttributeToWebComponent);

    const deleteButton: HTMLButtonElement = selectQuery(
      "button",
      this.shadowRoot
    );

    log(numberInput, selectElement, deleteButton);

    tracker.filters += `${this.filter}(${this.value}${this.unit}) `;

    log("Added!");
    log(tracker.filters);
  }

  disconnectedCallback() {
    const numberInput: HTMLInputElement = selectQuery(
      "input[type=number]",
      this.shadowRoot
    );

    const selectElement: HTMLSelectElement = selectQuery(
      "select",
      this.shadowRoot
    );

    numberInput.removeEventListener("input", this.setAttributeToWebComponent);
    selectElement.removeEventListener("input", this.setAttributeToWebComponent);

    const deleteButton: HTMLButtonElement = selectQuery(
      "button",
      this.shadowRoot
    );

    const filter = `${this.filter}(${this.value}${this.unit})`;

    removeFilterFromTracker(this.filter);
    log("Removed!");
    log(tracker.filters);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    const webComponent: ShadowRoot = this.shadowRoot;

    switch (name) {
      case "filter": {
        const span: HTMLSpanElement = selectQuery(
          "label>span",
          this.shadowRoot
        );

        const formattedFilterType: string = formatText(
          this.filter,
          "titlecase"
        );
        span.textContent = formattedFilterType;
        //…
        break;
      }

      case "value": {
        //…
        break;
      }

      case "unit": {
        // const isPercentage =
        //…
        break;
      }

      default:
        break;
    }
  }
}

function changeFilterValueOrUnit() {}

function removeFilterFromTracker(filterToRemove: string) {
  const chosenFilters: string[] = splitString(tracker.filters, " ");

  let remainingFilters: string[] = chosenFilters.filter((filter) => {
    return !filter.includes(filterToRemove);
  });

  tracker.filters = joinArrayOnChar(remainingFilters, " ");
}

function addNewFilterFromTracker(filterToAdd: string) {
  tracker.filters += filterToAdd;
}

function changeTrackerFilterValue(oldValue: string, newValue: string) {
  addNewFilterFromTracker(newValue);
}

customElements.define("active-filter", ActiveFilter);
