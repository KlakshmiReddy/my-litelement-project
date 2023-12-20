import { html, css, LitElement } from "lit";
import { Router } from "@vaadin/router";
import { Authenticator1 } from "./authenticator1";

export class LoginPage extends Authenticator1 {
  static styles = css`
    .add-employee-container {
      max-width: 1000px;
      height: 500px;
      margin: auto auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .add-employee-form div input {
      height: 20px;
      width: 200px;
      padding: 5px 10px;
    }
    .add-employee-btn {
      padding: 10px 20px;
      background: lightblue;
      border-width: 0px;
      font-weight: bold;
      width: 100%;
    }
  `;
  static properties = {
    employeeData: {
      type: Object,
    },
  };

  constructor() {
    super();
    this.employeeData = {
      email: "",
      password: "",
    };
  }
  handleFormData(event) {
    const { name, value } = event.target;
    this.employeeData = {
      ...this.employeeData,
      [name]: value,
    };
  }
  handleSubmit(event) {
    event.preventDefault();
    if (this.employeeData.email && this.employeeData.password) {
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

  render() {
    return html`
      <div class="add-employee-container">
        <form class="add-employee-form">
          <div style="margin-bottom:20px;">
            <input
              type="text"
              name="email"
              .value="${this.employeeData.email}"
              @input="${(event) => this.handleFormData(event)}"
              placeholder="Enter Employee Userid"
            />
          </div>
          <div style="margin-bottom:20px;">
            <input
              type="password"
              name="password"
              .value="${this.employeeData.password}"
              @input="${(event) => this.handleFormData(event)}"
              placeholder="Enter Password"
            />
          </div>
          <div style="margin-bottom:20px;text-align:center;">
            <button
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
