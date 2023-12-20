import { html, css, LitElement } from "lit";
import "./header-ele.js";
import { Router } from "@vaadin/router";
import ModalElement from "./modal-element.js";
import { Authenticated } from "./authentication.js";

export default class EmployeeList extends Authenticated {
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
      font-size: 14px;
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
    .add-employee-btn {
      padding: 5px 20px;
      background: lightblue;
      border-radius: 4px;
      border-width: 1px;
      font-weight: bold;
    }
    .danger-btn {
      background-color: rgb(219 76 76 / 96%);
      font-size: 14px;
      color: rgb(255, 255, 255);
      padding: 4px 10px;
      border-width: 0px;
      cursor: pointer;
      border-radius: 3px;
    }
    .add-employee-btn {
      padding: 5px 20px;
      background: lightblue;
      border-radius: 4px;
      border-width: 1px;
      font-weight: bold;
    }
  `;

  static get properties() {
    return {
      name: { type: String },
      data: { type: Array },
      inputValue: { type: String },
      filteredData: { type: Array },
      isOpen: { type: Boolean },
      isLoading: { type: Boolean },
      userId: { type: Number },
    };
  }

  constructor() {
    super();
    this.name = "Header";
    this.inputValue = "";
    this.isOpen = false;
    this.isLoading = true;
    this.fetchData().then((res) => {
      this.data = res;
    });
    console.log("Inside the constructor");
  }
  fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const json = await response.json();
      await new Promise((r) => setTimeout(() => r(), 1000));
      this.isLoading = false;
      return json;
    } catch (e) {
      console.log(e);
    }
  };
  navigateToViewEmployee(event, id) {
    event.preventDefault();
    Router.go(`/employee/${id}`);
  }
  addData(item) {
    console.log("From child", item);
    this.data.push({ id: this.data.length + 1, ...item });
    this.data = [...this.data];
    console.log("From child", this.data);
  }

  deleteEmployee(event, id) {
    event.preventDefault();
    const filteredEmployees = this.data.filter((item) => item.id !== id);
    this.data = filteredEmployees;
    this.isOpen = false;
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
    this.fetchData().then((res) => {
      this.data = res;
    });
  }
  openModel(id) {
    this.userId = id;
    this.isOpen = true;
  }
  closeModal() {
    console.log("Close Modal");
    this.isOpen = false;
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
        ${this.isLoading
          ? html`<p style="text-align:center">Loading.....</p>`
          : html`
              <div class="emp-table">
                <div
                  style="display:flex;justify-content:flex-end;margin-right:10px;margin-bottom:10px"
                >
                  <a href="/add_employee">
                    <button class="add-employee-btn">Add Employee</button>
                  </a>
                </div>
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
                          <button
                            class="danger-btn"
                            @click="${(event) => this.openModel(user.id)}"
                          >
                            delete
                          </button>
                        </td>
                      </tr>`
                    )}
                  </tbody>
                </table>
              </div>
            `}
      </div>
      ${this.isOpen
        ? html`<modal-element
            .deteteUser="${(event) => this.deleteEmployee(event, this.userId)}"
            .closeModal="${() => this.closeModal()}"
          >
          </modal-element>`
        : null}
    `;
  }
}
customElements.define("employee-list", EmployeeList);
