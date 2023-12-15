import { html, css, LitElement } from "lit";
import { Router } from "@vaadin/router";
import EmployeeList from "./employee-list.js";
export default class AddEmployee extends LitElement {
  static styles = css`
    .label-item {
      display: block;
      width: 180px;
    }
    .add-employee-container {
      max-width: 1000px;
      height: 500px;
      margin: auto auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .add-employee-form div {
      display: flex;
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
    }
    .error-msg {
      position: absolute;
      font-size: 12px;
      color: red;
      top: 35px;
      left: 185px;
    }
  `;

  static get properties() {
    return {
      name: { type: String },
      errors: { type: Object },
      employeeData: { type: Object },
      state: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.state = false;
    this.employeeData = {
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
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
    if (isValid) {
      console.log(this.employeeData);
      // Router.go("/employee");
    }
    this.render();
  }
  navigateToEmployeeList(event) {
    event.preventDefault();
    console.log("Go back");
    window.history.back();
  }

  validateForm() {
    const { name, username, email } = this.employeeData;
    switch (true) {
      case !name:
        this.errors.name = "Name is required";
      case !username:
        this.errors.username = "Username is required";
      case !email:
        this.errors.email = "Email is required";
        break;
      default:
        break;
    }
    if (!this.errors.name && !this.errors.username && !this.errors.email) {
      return true;
    }
  }
  render() {
    return html`
      <div class="add-employee-container">
        <form class="add-employee-form">
          <div style="margin-bottom:20px;position:relative">
            <label class="label-item"
              >Name <span style="color:red">*</span></label
            >
            <input
              type="text"
              name="name"
              id="empname"
              required
              .value="${this.employeeData.name}"
              @input="${(event) => this.handleFormData(event)}"
              placeholder="Enter Employee name"
            />
            ${this.errors.name
              ? html`<span class="error-msg">${this.errors.name}</span>`
              : ""}
          </div>

          <div style="margin-bottom:20px;position:relative">
            <label class="label-item"
              >User Name <span style="color:red">*</span></label
            >
            <input
              type="text"
              name="username"
              required
              .value="${this.employeeData.username}"
              @input="${(event) => this.handleFormData(event)}"
              placeholder="Enter User name"
            />
            ${this.errors.username
              ? html`<span class="error-msg"> ${this.errors.username}</span>`
              : ""}
          </div>
          <div style="margin-bottom:20px;position:relative">
            <label class="label-item"
              >Email <span style="color:red">*</span></label
            >
            <input
              type="text"
              name="email"
              required
              .value="${this.employeeData.email}"
              @input="${(event) => this.handleFormData(event)}"
              placeholder="Enter Email"
            />
            ${this.errors.email
              ? html`<span class="error-msg">${this.errors.email}</span>`
              : ""}
          </div>
          <div style="margin-bottom:20px">
            <label class="label-item">Phone Number : </label>
            <input
              type="text"
              name="phone"
              .value="${this.employeeData.phone}"
              @input="${(event) => this.handleFormData(event)}"
              placeholder="Enter Phone Number"
            />
          </div>
          <div style="margin-bottom:20px">
            <label class="label-item">Website : </label>
            <input
              type="text"
              name="website"
              .value="${this.employeeData.website}"
              @input="${(event) => this.handleFormData(event)}"
              placeholder="Enter Website"
            />
          </div>
          <div style="margin-bottom:20px; text-align:center;">
            <button
              class="add-employee-btn"
              @click="${(event) => this.handleSubmit(event)}"
            >
              Add Employee
            </button>
            <button
              class="add-employee-btn"
              style="margin-left:10px;"
              @click="${(event) => this.navigateToEmployeeList(event)}"
            >
              Go Back
            </button>
          </div>
          <div style="margin-bottom:20px"></div>
        </form>
      </div>
    `;
  }
}
customElements.define("add-employee", AddEmployee);
