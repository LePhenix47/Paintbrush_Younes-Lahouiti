import { joinArrayOnChar } from "../utils/functions/array-sets.functions";
import { log } from "../utils/functions/console.functions";
import {
  addClass,
  getAttribute,
  modifyAttribute,
  selectQuery,
} from "../utils/functions/dom.functions";
import {
  addNewFilterFromTracker,
  changeFilterValueOrUnit,
  removeFilterFromTracker,
} from "../utils/functions/filter-tracker.funtions";
import {
  formatText,
  replaceText,
  splitString,
} from "../utils/functions/string.functions";
import { canvasState, tracker } from "../utils/variables/trackers.variables";
import {
  cssReset,
  darkThemeVariables,
  jsClasses,
  lightThemeVariables,
} from "../utils/variables/web-component.variables";

const shapeFilterTemplateElement = document.createElement("template");

const shapeFilterTemplateStyle = /* css */ `
.miscellaneous__shape-filter{
     display: inline-flex;
    justify-content: center;
    align-items: center;

    gap: 10px;
}


.miscellaneous__shape-filter-label {
    align-items: center;
    display: inline-flex;
    gap: 15px;
    justify-content: space-between
}

.miscellaneous__shape-filter-input {
    max-width: 50px;

    text-align: center;
}

.miscellaneous__shape-filter-button{ 
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
`;
const shapeFilterTemplateContent = /*html */ `
 <div class="miscellaneous__shape-filter">
    <label class="miscellaneous__shape-filter-label" for="filter">
    <span>Blur:</span>        
        <input type="number" class="miscellaneous__shape-filter-input" name="value"
            id="filter" value="0" min="0" />
    </label>

    <label class="miscellaneous__shape-filter-label" for="filter-unit">
        <select name="unit" id="filter-unit">
            <option value="">---</option>
            <option value="%">Percentage (%)</option>
            <option value="px">Pixels (px)</option>
        </select>
    </label>

    <button type="button" class="miscellaneous__shape-filter-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"
            class="no-pointer-events" fill="var(--out-of-range-color)">
            <path
                d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm3.21 11.79a1 1 0 0 1 0 1.42 1 1 0 0 1-1.42 0L12 13.41l-1.79 1.8a1 1 0 0 1-1.42 0 1 1 0 0 1 0-1.42l1.8-1.79-1.8-1.79a1 1 0 0 1 1.42-1.42l1.79 1.8 1.79-1.8a1 1 0 0 1 1.42 1.42L13.41 12Z">
            </path>
        </svg>
    </button>
</div>
`;

shapeFilterTemplateElement.innerHTML = /*html */ `
  <style>
    ${lightThemeVariables}
    ${darkThemeVariables}
    ${cssReset}
    ${jsClasses}
    
    ${shapeFilterTemplateStyle}
  </style>
  
  ${shapeFilterTemplateContent}
`;

class ShapeFilter extends HTMLElement {
  constructor() {
    super();
    //We create the cotnainer that holds the web component
    const shadowRoot = this.attachShadow({ mode: "open" });

    //We clone the template
    const clonedTemplate = shapeFilterTemplateElement.content.cloneNode(true);
    //We add it as a child of our web component
    shadowRoot.appendChild(clonedTemplate);

    //We bind the this keyword to have access to the attribute values of our web component
    this.setValueToWebComponent = this.setValueToWebComponent.bind(this);
    this.setUnitToWebComponent = this.setUnitToWebComponent.bind(this);
    this.removeWebComponent = this.removeWebComponent.bind(this);
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

  setValueToWebComponent(event: Event) {
    //@ts-ignore
    const input: HTMLInputElement = event.currentTarget;

    this.value = input.value;
  }

  setUnitToWebComponent(event: Event) {
    //@ts-ignore
    const select: HTMLSelectElement = event.currentTarget;

    this.unit = select.value;
  }

  removeWebComponent(event: Event) {
    //@ts-ignore
    this.remove();
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

    numberInput.addEventListener("input", this.setValueToWebComponent);
    selectElement.addEventListener("input", this.setUnitToWebComponent);

    const deleteButton: HTMLButtonElement = selectQuery(
      "button",
      this.shadowRoot
    );

    deleteButton.addEventListener("click", this.removeWebComponent);

    log(numberInput, selectElement, deleteButton);

    const filter = `${this.filter}(${this.value}${this.unit})`;
    addNewFilterFromTracker(filter);

    log("Added!");
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

    numberInput.removeEventListener("input", this.setValueToWebComponent);
    selectElement.removeEventListener("input", this.setUnitToWebComponent);

    const deleteButton: HTMLButtonElement = selectQuery(
      "button",
      this.shadowRoot
    );
    deleteButton.removeEventListener("click", this.removeWebComponent);

    removeFilterFromTracker(this.filter);

    log("Removed!");
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

        const select: HTMLSelectElement = selectQuery(
          "select",
          this.shadowRoot
        );

        const canOnlyHavePercentage: boolean =
          newValue === "invert" ||
          newValue === "opacity" ||
          newValue === "saturate" ||
          newValue === "sepia";

        if (canOnlyHavePercentage) {
          const pixelOption: HTMLOptionElement = selectQuery(
            "option[value=px]",
            select
          );

          pixelOption.remove();
        }

        const canOnlyHavePixels: boolean = newValue === "blur";
        if (canOnlyHavePixels) {
          const percentageOption: HTMLOptionElement = selectQuery(
            `option[value="%"]`,
            select
          );

          percentageOption.remove();
        }
        //…
        break;
      }

      case "value": {
        log("Value change");

        //We avoid making unnecessary code execution
        const initialComponentMount: boolean = oldValue === null;
        if (initialComponentMount) {
          return;
        }

        changeFilterValueOrUnit(this.filter, newValue, this.unit);

        log(tracker.filters);
        break;
      }

      case "unit": {
        log("Unit change");

        //We avoid making unnecessary code execution
        const initialComponentMount: boolean = oldValue === null;
        if (initialComponentMount) {
          return;
        }

        //We check if the unit is valid
        const unitIsInvalid: boolean = newValue !== "px" && newValue !== "%";
        if (unitIsInvalid) {
          throw new Error(
            `Error: unexpected unit passed for shape filter, not a percentage or a px value: ${newValue}`
          );
        }

        changeFilterValueOrUnit(this.filter, this.value, newValue);

        log(tracker.filters);
        break;
      }

      default:
        break;
    }
  }
}

customElements.define("shape-filter", ShapeFilter);
