/**
 * CSS reset for web components.
 */
export const cssReset: string = /* css */ `
@media (prefers-reduced-motion: reduce) {

    *,
    :before,
    ::after {
        -webkit-animation: none !important;
        animation: none !important;

        transition: none !important;
    }
}

//Reset
*,
::before,
::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}


*::selection {
    -webkit-text-stroke: transparent;

    color: var(--selection-color);

    background-color: var(--selection-bg-color);
}

html {
    scroll-behavior: smooth;
    scroll-padding-top: 0%;
    scroll-snap-type: y proximity;

    color-scheme: dark light;
}

@import url(https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700&display=swap);

body {
    min-height: 100vh;

    font-family: Roboto, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;

    background-color: var(--bg-primary);
    color: var(--color-primary);


    overflow-x: hidden;

    transition:
        background-color 650ms ease-in-out,
        color 350ms ease-in-out;

}

:is(ul, ol) {
    list-style-type: none;
}

/*
//⚠ We make the border transparent so that if the user has a high contrast text mode enable the border will still appear for them
//Good for accessibility
*/
button {
    border-color: transparent;
    background-color: transparent;

    font-family: inherit;
    color: inherit;


    &:hover {
        cursor: pointer;

        &:disabled {
            cursor: not-allowed;
        }
    }

}


input {
    font-family: inherit;


    border-color: transparent;
    outline-color: transparent;

    &:hover {
        cursor: pointer;
    }

    &:focus {
        border-color: transparent;
        outline: transparent;
    }

    &:disabled {
        cursor: not-allowed;
    }
}


textarea {
    font-family: inherit;
    border-color: transparent;

    &:focus {
        border-color: transparent;
        outline: transparent;
    }
}

a {
    text-decoration: none;
    color: inherit;

    &:visited {
        color: currentColor;
    }
}

label {
    &:hover {
        cursor: pointer;
    }
}

fieldset {
    border-color: transparent;
}

legend {
    position: static;
}

dialog {
    position: fixed;
    border: transparent;
    margin: 0;
    padding: 0;
    z-index: 0;
    @include absolute-center;
}

select {
    border: transparent;
    font-family: inherit;

    &:hover {
        cursor: pointer;
    }
}

option {
    font-family: inherit;
}


:is(p, h1, h2, h3, h4,
    h5, h6, span):empty {
    display: none !important;
}`;

/**
 * CSS variables for web components.
 */
export const lightThemeVariables: string = /* css */ `
:host {
    --bg-primary: hwb(0 100% 0%);
    --bg-secondary: #f0efef;
    --bg-tertiary: #676767;
    --bg-radio-button: #48c848;
    --bg-canvas: #fff;
    --color-primary: #000;
    --color-secondary: gray;
    --semi-transparent-bg: hsla(0, 0%, 100%, .7);
    --border-color: #dbdbdb;
    --scrollbar-track-bg-color: #fff;
    --scrollbar-thumb-bg-color: #545454;
    --scrollbar-thumb-bg-color--hover: #757575;
    --scrollbar-thumb-bg-color--active: #b0b0b0;
    --selection-bg-color: hwb(240 0% 0%);
    --selection-color: #fff;
    --out-of-range-bg: #fdd;
    --out-of-range-color: #ff441b;
    --fill-color: #000;
    --stroke-color: transparent
}

::backdrop {
    --backdrop-bg-color: hsla(0, 0%, 100%, .5);
    --scrollbar-track-bg-color: #fff;
    --scrollbar-thumb-bg-color: #545454;
    --scrollbar-thumb-bg-color--hover: #757575;
    --scrollbar-thumb-bg-color--active: #b0b0b0
}`;

/**
 * Dark theme CSS variables for web components.
 */
export const darkThemeVariables: string = /* css */ `

@media(prefers-color-scheme:dark) {
    :host {
        --bg-primary: #000;
        --bg-secondary: #232323;
        --bg-tertiary: #7a7a7a;
        --bg-radio-button: green;
        --color-primary: #fff;
        --semi-transparent-bg: rgba(0, 0, 0, .7);
        --bg-canvas: #505050;
        --scrollbar-track-bg-color: #000;
        --scrollbar-thumb-bg-color: #ababab;
        --scrollbar-thumb-bg-color--hover: #8a8a8a;
        --scrollbar-thumb-bg-color--active: #4f4f4f;
        --selection-bg: #838383;
        --selection-color: #fff;
        --selection-bg-color: orange;
        --selection-color: #000;
        --out-of-range-bg: #290000;
        --out-of-range-color: #eb3941
    }

    ::backdrop {
        --backdrop-bg-color: rgba(0, 0, 0, .5);
        --scrollbar-track-bg-color: #000;
        --scrollbar-thumb-bg-color: #ababab;
        --scrollbar-thumb-bg-color--hover: #8a8a8a;
        --scrollbar-thumb-bg-color--active: #4f4f4f
    }
}
`;
