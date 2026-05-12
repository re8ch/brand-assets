const THEME_VALUES = new Set([
  "color",
  "gray",
  "invert",
  "no-edge",
  "no-edge-gray",
  "no-edge-invert",
]);

const MOTION_VALUES = new Set([
  "loader",
  "enter",
  "exit",
  "idle",
  "pulse",
  "success",
  "error",
  "reveal",
]);

const SIZE_VALUES = new Set(["sm", "md", "lg", "xl"]);
const LOOPABLE_MOTIONS = new Set(["loader", "idle", "pulse"]);
const SCRIPT_URL = document.currentScript?.src || new URL("re8ch-logo-motion.js", document.baseURI).href;
const CSS_URL = new URL("./re8ch-logo-motion.css", SCRIPT_URL);

class Re8chLogoMotion extends HTMLElement {
  static get observedAttributes() {
    return ["theme", "motion", "size", "loop", "paused", "label"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._render();
  }

  connectedCallback() {
    this._normalizeAttributes();
    this._syncAccessibility();
  }

  attributeChangedCallback() {
    this._normalizeAttributes();
    this._syncAccessibility();
  }

  play(motion = "enter") {
    this.motion = motion;
    this.removeAttribute("paused");
    this.restart();
  }

  restart() {
    const mark = this.shadowRoot.querySelector(".mark");
    if (!mark) return;
    mark.getAnimations({ subtree: true }).forEach((animation) => {
      animation.cancel();
      animation.play();
    });
  }

  pause() {
    this.setAttribute("paused", "");
  }

  resume() {
    this.removeAttribute("paused");
  }

  get theme() {
    return this.getAttribute("theme") || "color";
  }

  set theme(value) {
    this.setAttribute("theme", THEME_VALUES.has(value) ? value : "color");
  }

  get motion() {
    return this.getAttribute("motion") || "idle";
  }

  set motion(value) {
    this.setAttribute("motion", MOTION_VALUES.has(value) ? value : "idle");
  }

  get size() {
    return this.getAttribute("size") || "md";
  }

  set size(value) {
    this.setAttribute("size", SIZE_VALUES.has(value) ? value : "md");
  }

  _normalizeAttributes() {
    const theme = this.getAttribute("theme");
    const motion = this.getAttribute("motion");
    const size = this.getAttribute("size");

    if (!theme || !THEME_VALUES.has(theme)) this.setAttribute("theme", "color");
    if (!motion || !MOTION_VALUES.has(motion)) this.setAttribute("motion", "idle");
    if (!size || !SIZE_VALUES.has(size)) this.setAttribute("size", "md");

    const currentMotion = this.getAttribute("motion");
    if (this.hasAttribute("loop") && !LOOPABLE_MOTIONS.has(currentMotion)) {
      this.removeAttribute("loop");
    }
  }

  _syncAccessibility() {
    const svg = this.shadowRoot.querySelector("svg");
    if (!svg) return;
    const label = this.getAttribute("label") || "RE8CH logo";
    svg.setAttribute("aria-label", label);
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${CSS_URL.href}">
      <div class="stage" part="stage">
        <svg class="logo" part="svg" viewBox="0 0 1130 924" role="img" aria-label="RE8CH logo" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="re8ch-transparent-hole" clip-rule="evenodd">
              <path d="M0 0 H1130 V924 H0 Z M518 670 L583 533 L650 647 L579 647 Z"/>
            </clipPath>
          </defs>
          <g class="mark" clip-path="url(#re8ch-transparent-hole)" part="mark">
            <path class="edge edge-outer" part="edge outer-edge" d="M135 722 L510 66 Q518 55 532 55 L632 55 Q650 55 659 75 L1029 722 Q1034 733 1027 745 L965 848 Q955 866 932 866 L222 866 Q207 866 198 849 L138 743 Q132 733 135 722 Z"/>
            <path class="piece red" part="red" d="M225 843 L156 727 L526 83 Q531 78 540 78 L632 78 Q639 78 644 88 L955 632 L813 632 L583 244 L252 795 Z"/>
            <path class="edge edge-base" part="edge base-edge" d="M246 845 L566 638 L973 638 Q983 639 989 648 L1023 716 Q1032 729 1023 743 L963 840 Q954 856 934 856 L222 856 Q239 847 246 845 Z"/>
            <path class="piece green" part="green" d="M253 844 L574 657 L966 657 L1009 727 L943 834 Q940 844 927 845 L253 845 Z"/>
            <path class="edge edge-yellow" part="edge yellow-edge" d="M251 808 L504 383 L590 531 L503 697 Z"/>
            <path class="piece yellow" part="yellow" d="M291 777 L505 413 L571 532 L494 666 Z"/>
            <path class="edge edge-blue" part="edge blue-edge" d="M497 386 L582 239 L824 657 L646 657 Z"/>
            <path class="piece blue" part="blue" d="M516 390 L582 275 L792 638 L657 638 Z"/>
            <path class="edge edge-hole" part="edge hole-edge" d="M503 682 L583 536 L654 656 L575 656 Z"/>
          </g>
        </svg>
      </div>
    `;
  }
}

if (!customElements.get("re8ch-logo-motion")) {
  customElements.define("re8ch-logo-motion", Re8chLogoMotion);
}

window.Re8chLogoMotion = Re8chLogoMotion;
