import { html, css, LitElement } from "lit";

export class LifeCycleMethods extends LitElement {
  static styles = css``;

  static get properties() {
    return {
      count: { type: Number },
    };
  }

  constructor() {
    super();
    this.count = 0;
    console.log("constructor called");
  }
  connectedCallback() {
    super.connectedCallback();
    console.log("connectedCallback called");
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    console.log("disconnectedCallback called");
  }
  attributeChangedCallback(name, oldVal, newVal) {
    super.attributeChangedCallback(name, oldVal, newVal);
    console.log("attributeChangedCallback called");
  }
  firstUpdated() {
    super.firstUpdated();
    console.log("firstUpdated called");
  }
  updated(changedProperties) {
    super.updated(changedProperties);
    console.log("updated called");
  }

  render() {
    console.log("render called");
    return html`
      <div>
        <p>Count : ${this.count}</p>
        <button @click="${this.increment}">Increment</button>
      </div>
    `;
  }
  increment() {
    this.count++;
  }
}
customElements.define("life-cycle-methods", LifeCycleMethods);
