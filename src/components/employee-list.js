import { html, css, LitElement } from "lit";
import "./header-ele.js";
import { Router } from "@vaadin/router";
import ModalElement from "./modal-element.js";
const fetchData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const json = await response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};

export default class EmployeeList extends LitElement {
  static styles = css`
    .search-field {
      margin: 20px 0px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .search-field input {
      min-height: 30px;
      width: 300px;
      padding: 0px 10px;
      border-radius: 4px;
      border-width: 1px;
      margin-right: 10px;
      font-size: 18px;
    }
    .search-field button {
      min-height: 30px;
      border-radius: 4px;
      border: 0px;
      background: lightblue;
    }
    table {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }

    td,
    th {
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    }

    tr:nth-child(even) {
      background-color: #dddddd;
    }
    .emp-table {
    }
    .add-employee-btn {
      padding: 5px 20px;
      background: lightblue;
      border-radius: 4px;
      border-width: 1px;
      font-weight: bold;
    }
  `;

  static properties = {
    name: { type: String },
    data: { type: Array },
    colors: { type: Array },
    inputValue: { type: String },
    filteredData: { type: Array },
    modalClosed: { type: Boolean },
  };

  constructor() {
    super();
    this.name = "Header";
    this.inputValue = "";
    this.modalClosed = false;
    fetchData().then((res) => {
      this.data = res;
    });
    console.log("Inside the constructor");
  }

  updateGlobalState(property) {
    console.log("Employeedata enter into employeelist", property);
  }
  navigateToViewEmployee(event, id) {
    event.preventDefault();
    Router.go(`/employee/${id}`);
  }

  deleteEmployee(event, id) {
    event.preventDefault();
    const filteredEmployees = this.data.filter((item) => item.id !== id);
    this.data = filteredEmployees;
    const child = this.shadowRoot.querySelector("modal-element");
    const element = child.getElementsByClassName("close");
    element.addEventListener("click", this.closeModal);
   
  }

  _handleInput(event) {
    this.inputValue = event.target.value;
    console.log(this.inputValue);
  }
  _filterData(event) {
    this.filteredData = this.data.filter((item) =>
      item.name.toLowerCase().includes(this.inputValue.toLowerCase())
    );
    this.data = [...this.filteredData];
  }
  _viewAllData() {
    fetchData().then((res) => {
      this.data = res;
    });
  }
  render() {
    return html`
      <header-element></header-element>
      <div class="employee-container">
        <div class="search-field">
          <input
            type="text"
            name="inputValue"
            .value=${this.inputValue}
            placeholder="Search here...."
            @input="${(event) => this._handleInput(event)}"
          />
          <button @click="${this._filterData}" class="add-employee-btn">
            Search
          </button>
          <button
            @click="${this._viewAllData}"
            style="margin-left:10px"
            class="add-employee-btn"
          >
            view all
          </button>
        </div>
        <div class="emp-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${this.data.map(
                (user) => html` <tr>
                  <td>${user.name}</td>
                  <td>${user.username}</td>
                  <td>${user.email}</td>
                  <td>${user.phone}</td>
                  <td>${user.website}</td>
                  <td style="display:flex">
                    <button
                      style="margin-right:10px"
                      @click="${(event) =>
                        this.navigateToViewEmployee(event, user.id)}"
                    >
                      VIEW
                    </button>
                    <modal-element
                      .user="${user.name}"
                      .modalClosed="${this.modalClosed}"
                      .deteteUser="${(event) =>
                        this.deleteEmployee(event, user.id)}"
                    ></modal-element>
                  </td>
                </tr>`
              )}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
}
customElements.define("employee-list", EmployeeList);
