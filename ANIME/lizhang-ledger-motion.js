class LizhangLedgerMotion extends HTMLElement {
  static get observedAttributes() {
    return ['motion', 'label'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  render() {
    const motion = this.getAttribute('motion') || 'idle';
    const label = this.getAttribute('label') || '理账 Ledger animated icon';

    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host{display:inline-block;height:96px;width:96px}.lizhang-ledger-motion{display:block;height:100%;overflow:visible;width:100%}.lizhang-ledger-motion .book{transform-origin:48px 48px}.lizhang-ledger-motion[data-motion="idle"] .book{animation:lizhang-float 4.8s ease-in-out infinite}.lizhang-ledger-motion[data-motion="pulse"] .book{animation:lizhang-pulse 2.6s ease-in-out infinite}.lizhang-ledger-motion[data-motion="draw"] .check{stroke-dasharray:30;stroke-dashoffset:30;animation:lizhang-check 1.2s ease-out forwards}@keyframes lizhang-float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-2px) rotate(-1deg)}}@keyframes lizhang-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.035)}}@keyframes lizhang-check{to{stroke-dashoffset:0}}
      </style>
      <svg class="lizhang-ledger-motion" data-motion="${motion}" viewBox="0 0 96 96" role="img" aria-label="${label}">
        <g class="book">
          <path d="M18 20Q18 14 24 14H66Q78 14 78 26V80H31Q18 80 18 67Z" fill="#020202"/>
          <path d="M26 22H65Q70 22 70 27V63H34Q26 63 26 55Z" fill="#f8fafc"/>
          <path d="M25 21H65Q71 21 71 27V36H25Z" fill="#2563eb"/>
          <path d="M25 36H71V63H34Q25 63 25 54Z" fill="#ffffff"/>
          <path d="M28 70Q28 65 34 65H78V80H34Q28 80 28 74Z" fill="#00b559"/>
          <path d="M18 22Q18 15 25 15H33V80H31Q18 80 18 67Z" fill="#f81018"/>
          <path d="M33 65H78V72H35Q31 72 31 75Q31 78 35 78H78V80H31Q25 80 25 73Q25 65 33 65Z" fill="#020202"/>
          <path d="M43 45H58M43 53H55" stroke="#020202" stroke-width="5" stroke-linecap="round"/>
          <path class="check-shadow" d="M58 50L64 56L76 42" fill="none" stroke="#020202" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" opacity=".18"/>
          <path class="check" d="M58 50L64 56L76 42" fill="none" stroke="#ffd619" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
      </svg>
    `;
  }
}

if (!customElements.get('lizhang-ledger-motion')) {
  customElements.define('lizhang-ledger-motion', LizhangLedgerMotion);
}
