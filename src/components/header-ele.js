import { html, css, LitElement } from "lit";
import page from "page";
export class HeaderEle extends LitElement {
  static styles = css`
    .header-container {
      height: 50px;
      padding: 0px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: lightgreen;
    }
    .deloitte-img {
      width: 200px;
      height: 40px;
      object-fit: contain;
    }
    .logout-emp > a {
      text-decoration: none;
    }
  `;

  static properties = {
    name: { type: String },
  };

  constructor() {
    super();
    this.name = "Header";
  }

  render() {
    return html`
      <div class="header-container">
        <div>
          <a href="#">
            <img
              src="/src/assets/brand-Logo.png"
              alt="brand-logo"
              class="deloitte-img"
            />
          </a>
        </div>
        <div class="logout-emp">
          <a href="#"> Logout </a>
        </div>
      </div>
    `;
  }
}
customElements.define("header-element", HeaderEle);
