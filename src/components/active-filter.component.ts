import { log } from "../utils/functions/console.functions";
import {
  getAttribute,
  modifyAttribute,
  selectQuery,
} from "../utils/functions/dom.functions";
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
    max-width: 50px
}

.miscellaneous__active-filter-button{ 
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
`;
const activeFilterTemplateContent = /*html */ `
 <div class="miscellaneous__active-filter">
    <label class="miscellaneous__active-filter-label" for="filter">Blur:
        <input type="number" class="miscellaneous__active-filter-input" name="filters"
            id="filter" min="0" />
    </label>

    <label for="filter-unit">
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
  }

  get filter() {
    return getAttribute("filter", this);
  }

  set filter(newValue: string) {
    modifyAttribute(this, "filter", newValue);
  }

  static get observedAttributes() {
    //We indicate the list of attributes that the custom element wants to observe for changes.
    return ["filter"];
  }

  connectedCallback() {
    const selectMultiple: HTMLSelectElement = selectQuery(
      "select",
      this.shadowRoot
    );
  }

  disconnectedCallback() {}

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    switch (name) {
      case "": {
        //…
        break;
      }
      default:
        break;
    }
  }
}

customElements.define("active-filter", ActiveFilter);
