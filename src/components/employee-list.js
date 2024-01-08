import { html, css, LitElement } from "lit";
import { Pagination } from "./pagination-component.js";
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
      currentData: { type: Array },
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
    this.currentData = [];
    this.data = [];
    this.fetchData();
    this.currentPage = 1;
    this.postsPerPage = 5;
  }
  fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const json = await response.json();
      this.data = json;
      this.isLoading = false;
    } catch (e) {
      console.log(e);
    }
  };
  updated(changedProperties) {
    if (changedProperties.has("data")) {
      this.lastIndex = this.currentPage * this.postsPerPage;
      this.firstIndex = this.lastIndex - this.postsPerPage;
      this.currentData = this.data?.slice(this.firstIndex, this.lastIndex);
    }
  }
  navigateToViewEmployee(event, id) {
    event.preventDefault();
    Router.go(`/employee/${id}`);
  }

  deleteEmployee = async (event, id) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
    this.isOpen = false;
  };

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
  openModel(id) {
    this.userId = id;
    this.isOpen = true;
  }
  closeModal() {
    console.log("Close Modal");
    this.isOpen = false;
  }
  changeCurrentPage = (event) => {
    const eventData = event.detail;
    this.currentPage = eventData;
    this.lastIndex = this.currentPage * this.postsPerPage;
    this.firstIndex = this.lastIndex - this.postsPerPage;
    this.currentData = this.data?.slice(this.firstIndex, this.lastIndex);
  };
  render() {
    console.log("Render method called");
    return html`
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
                      <th style="width:16%">Name</th>
                      <th style="width:16%">User Name</th>
                      <th style="width:16%">Email</th>
                      <th style="width:16%">Phone</th>
                      <th style="width:16%">Website</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.currentData?.map(
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
      <div style="text-align:center">
        <pagination-component
          .empdata=${this.data}
          @child-event="${this.changeCurrentPage}"
        ></pagination-component>
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
