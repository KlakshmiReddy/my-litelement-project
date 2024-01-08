import { html, css, LitElement } from "lit";
export class HeaderEle extends LitElement {
  static styles = css`
    .header-container {
      width:100%
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
    .logout > a {
      text-decoration: none;
    }
  `;

  static get properties() {
    return {
      name: { type: String },
      user: { type: Object },
    };
  }

  constructor() {
    super();
    this.user = {};
    this.getUser();
    console.log(this.user);
  }
  getUser() {
    const data = localStorage.getItem("user");
    this.user = JSON.parse(data);
  }
  logoutFn() {
    localStorage.removeItem("token");
    window.location.reload();
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
        <div class="logout" style="display:flex;align-items:center">
          <p style="margin-right:20px">${this.user?.name}</p>
          <a href="#" @click="${this.logoutFn}"> Logout </a>
        </div>
      </div>
    `;
  }
}
customElements.define("header-element", HeaderEle);
