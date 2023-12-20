import { html, css, LitElement } from "lit";
import { Router } from "@vaadin/router";
import EmployeeList from "./employee-list.js";
import { Authenticated } from "./authentication.js";
export default class AddEmployee extends Authenticated {
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
      description: { type: String },
      errors: { type: Object },
      employeeData: { type: Object },
      instance: { type: Object },
      state: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.state = false;
    this.description = "";
    this.employeeData = {
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
    };
    this.errors = {};
    this.instance = new EmployeeList();
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
  handleTextarea(event) {
    const textarea = event.target;
    const maxLength = 5;
    if (textarea.value.length > maxLength) {
      textarea.value = textarea.value.slice(0, maxLength);
    }
    this.description = textarea.value;
  }

  handleSubmit(event) {
    event.preventDefault();
    const isValid = this.validateForm();
    this.requestUpdate();
    if (isValid) {
      console.log(this.employeeData);
      this.instance.addData(this.employeeData);
      window.history.back();
    }
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
            <label class="label-item">
              <span id="fname">Name</span>
              <span style="color:red">*</span>
            </label>
            <input
              type="text"
              name="name"
              id="input-field1"
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
            <label class="label-item">
              <span id="username">User Name</span>
              <span style="color:red">*</span></label
            >
            <input
              type="text"
              name="username"
              id="input-field2"
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
            <label class="label-item">
              <span id="email">Email</span>
              <span style="color:red">*</span></label
            >
            <input
              type="text"
              name="email"
              id="input-field3"
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
            <label class="label-item" id="phone">Phone Number</label>
            <input
              type="text"
              id="input-field4"
              name="phone"
              .value="${this.employeeData.phone}"
              @input="${(event) => this.handleFormData(event)}"
              placeholder="Enter Phone Number"
            />
          </div>
          <div style="margin-bottom:20px">
            <label class="label-item" id="website">Website</label>
            <input
              type="text"
              name="website"
              id="input-field5"
              .value="${this.employeeData.website}"
              @input="${(event) => this.handleFormData(event)}"
              placeholder="Enter Website"
            />
          </div>
          <div style="margin-bottom:20px;">
            <button
              class="add-employee-btn"
              id="add-btn"
              @click="${(event) => this.handleSubmit(event)}"
            >
              Add Employee
            </button>
            <button
              class="add-employee-btn"
              id="go-back"
              style="margin-left:10px;"
              @click="${(event) => this.navigateToEmployeeList(event)}"
            >
              Go Back
            </button>
          </div>
        </form>
      </div>
    `;
  }
}
customElements.define("add-employee", AddEmployee);
