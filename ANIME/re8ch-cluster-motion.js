const CLUSTER_THEMES = new Set(["color", "gray", "invert", "no-edge"]);
const CLUSTER_MOTIONS = new Set(["idle", "enter", "pulse", "success", "error", "reveal"]);
const CLUSTER_SIZES = new Set(["sm", "md", "lg", "xl"]);
const CLUSTER_LOOPABLE_MOTIONS = new Set(["idle", "pulse"]);
const CLUSTER_SCRIPT_URL = document.currentScript?.src || new URL("re8ch-cluster-motion.js", document.baseURI).href;
const CLUSTER_CSS_URL = new URL("./re8ch-cluster-motion.css", CLUSTER_SCRIPT_URL);

class Re8chClusterMotion extends HTMLElement {
  static get observedAttributes() {
    return ["theme", "motion", "size", "loop", "paused", "label"];
  }

  constructor() {
    super();
    this._normalizing = false;
    this.attachShadow({ mode: "open" });
    this._render();
  }

  connectedCallback() {
    this._normalizeAttributes();
    this._syncAccessibility();
  }

  attributeChangedCallback() {
    if (this._normalizing) return;
    this._normalizeAttributes();
    this._syncAccessibility();
  }

  play(motion = "enter") {
    this.motion = motion;
    this.removeAttribute("paused");
    this.restart();
  }

  pause() {
    this.setAttribute("paused", "");
  }

  resume() {
    this.removeAttribute("paused");
  }

  restart() {
    const mark = this.shadowRoot?.querySelector(".mark");
    if (!mark) return;
    mark.getAnimations({ subtree: true }).forEach((animation) => {
      animation.cancel();
      animation.play();
    });
  }

  get theme() {
    return this.getAttribute("theme") || "color";
  }

  set theme(value) {
    this.setAttribute("theme", CLUSTER_THEMES.has(value) ? value : "color");
  }

  get motion() {
    return this.getAttribute("motion") || "idle";
  }

  set motion(value) {
    this.setAttribute("motion", CLUSTER_MOTIONS.has(value) ? value : "idle");
  }

  get size() {
    return this.getAttribute("size") || "md";
  }

  set size(value) {
    this.setAttribute("size", CLUSTER_SIZES.has(value) ? value : "md");
  }

  _normalizeAttributes() {
    this._normalizing = true;
    try {
      if (!CLUSTER_THEMES.has(this.getAttribute("theme"))) this.setAttribute("theme", "color");
      if (!CLUSTER_MOTIONS.has(this.getAttribute("motion"))) this.setAttribute("motion", "idle");
      if (!CLUSTER_SIZES.has(this.getAttribute("size"))) this.setAttribute("size", "md");
      if (this.hasAttribute("loop") && !CLUSTER_LOOPABLE_MOTIONS.has(this.getAttribute("motion"))) {
        this.removeAttribute("loop");
      }
    } finally {
      this._normalizing = false;
    }
  }

  _syncAccessibility() {
    const svg = this.shadowRoot?.querySelector("svg");
    if (svg) svg.setAttribute("aria-label", this.getAttribute("label") || "RE8CH Cluster icon");
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="${CLUSTER_CSS_URL.href}">
      <div class="stage" part="stage">
        <svg class="icon" part="svg" viewBox="0 0 96 96" role="img" aria-label="RE8CH Cluster icon" xmlns="http://www.w3.org/2000/svg">
          <g class="mark" part="mark">
            <g class="faces" stroke-linejoin="round" stroke-width="4.5">
              <path class="face face-top" part="face top" d="M48 9 78 26.5 48 44 18 26.5 48 9Z"/>
              <path class="face face-right" part="face right" d="M48 44 78 26.5 78 62.5 48 80 48 44Z"/>
              <path class="face face-left" part="face left" d="M18 26.5 48 44 48 80 18 62.5 18 26.5Z"/>
              <path class="face face-core" part="face core" d="M31.5 35 48 44.5 64.5 35 48 25.2 31.5 35Z"/>
            </g>
            <g class="links" part="links" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4.5">
              <path class="link link-vertical" d="M48 44v36"/>
              <path class="link link-branches" d="M18 26.5 48 44 78 26.5"/>
            </g>
            <g class="nodes" part="nodes">
              <circle cx="48" cy="9" r="2.8"/>
              <circle cx="18" cy="26.5" r="2.8"/>
              <circle cx="78" cy="26.5" r="2.8"/>
              <circle cx="48" cy="80" r="2.8"/>
            </g>
          </g>
        </svg>
      </div>`;
  }
}

if (!customElements.get("re8ch-cluster-motion")) {
  customElements.define("re8ch-cluster-motion", Re8chClusterMotion);
}

window.Re8chClusterMotion = Re8chClusterMotion;
