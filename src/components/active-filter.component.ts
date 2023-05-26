const activeFilterTemplateElement = document.createElement("template");

const activeFilterTemplateStyle = /* css */ `

`;
const activeFilterTemplateContent = /*html */ `
 <div class="miscellaneous__active-filter">
    <label class="miscellaneous__active-filter-label" for="blur">Blur:
        <input type="number" class="miscellaneous__active-filter-input" name="filters"
            id="blur" />
    </label>

    <button type="button" class="miscellaneous__active-filter-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25"
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
    ${activeFilterTemplateStyle}
  </style>
  
  ${activeFilterTemplateContent}
`;

class UserComponent extends HTMLElement {
  constructor() {
    super();
    //We create the cotnainer that holds the web component
    const shadowRoot = this.attachShadow({ mode: "open" });

    //We clone the template
    const clonedTemplate = activeFilterTemplateElement.content.cloneNode(true);
    //We add it as a child of our web component
    shadowRoot.appendChild(clonedTemplate);
  }

  static get observedAttributes() {
    //We indicate the list of attributes that the custom element wants to observe for changes.
    return ["filter"];
  }

  connectedCallback() {}

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

customElements.define("user-component", UserComponent);
