import { html, css, LitElement } from "lit";
import { Router } from "@vaadin/router";
import { Authenticator1 } from "./authenticator1";

export class LoginPage extends Authenticator1 {
  static styles = css`
    .add-employee-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .add-employee-form div input {
      height: 20px;
      width: 200px;
      padding: 5px 10px;
      border: 1px solid #000;
    }
    .add-employee-btn {
      padding: 10px 20px;
      background: lightblue;
      border-width: 0px;
      font-weight: bold;
      width: 100%;
    }
    .error-msg {
      position: absolute;
      font-size: 12px;
      color: red;
      top: 35px;
      left: 4px;
    }
    .border-red {
      border: 1px solid red !important;
    }
    input:focus-visible {
      outline: none;
    }
  `;
  static properties = {
    employeeData: {
      type: Object,
    },
    errors: { type: Object },
  };

  constructor() {
    super();
    this.employeeData = {
      email: "",
      password: "",
    };
    this.errors = {};
  }
  handleFormData(event) {
    const { name, value } = event.target;
    this.employeeData = {
      ...this.employeeData,
      [name]: value,
    };
    this.errors = {
      ...this.errors,
      [name]: "",
    };
  }
  handleSubmit(event) {
    event.preventDefault();
    const isValid = this.validateForm();
    this.requestUpdate();
    console.log("Before Validate", this.errors.email);
    if (isValid) {
      // fetch("http://localhost:8080/springboot-jwt-login/login", {
      //   method: "post",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(this.employeeData),
      // })
      //   .then((res) => res.json())
      //   .then((res) => {
      //     console.log(res);
      //   });
      localStorage.setItem("token", "abc");
      history.replaceState(null, "", "/employee");
      Router.go("/employee");
    }
  }
  validateForm() {
    const { email, password } = this.employeeData;
    switch (true) {
      case !email:
        this.errors.email = "Email is required";
      case !password:
        this.errors.password = "Password is required";
        break;
      default:
        break;
    }
    if (!this.errors.email && !this.errors.password) {
      return true;
    }
  }

  render() {
    return html`
      <div class="add-employee-container">
        <form class="add-employee-form">
          <div style="margin-bottom:20px; position:relative">
            <input
              type="text"
              class=${this.errors.email ? "border-red" : ""}
              name="email"
              id="input-field1"
              .value="${this.employeeData.email}"
              @input="${(event) => this.handleFormData(event)}"
              placeholder="Enter Employee Email"
            />
            ${this.errors.email
              ? html`<span class="error-msg">${this.errors.email}</span>`
              : ""}
          </div>
          <div style="margin-bottom:20px;position:relative">
            <input
              type="password"
              name="password"
              id="input-field2"
              class=${this.errors.password ? "border-red" : ""}
              .value="${this.employeeData.password}"
              @input="${(event) => this.handleFormData(event)}"
              placeholder="Enter Password"
            />
            ${this.errors.password
              ? html`<span class="error-msg">${this.errors.password}</span>`
              : ""}
          </div>
          <div style="margin-top:30px;">
            <button
              id="login-btn"
              class="add-employee-btn"
              @click="${(event) => this.handleSubmit(event)}"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    `;
  }
}
customElements.define("login-page", LoginPage);
