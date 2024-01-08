import { html, css, LitElement } from "lit";
import { Router } from "@vaadin/router";
import ModalElement from "./modal-element.js";
import { Authenticated } from "./authentication.js";

export default class EmployeeList1 extends Authenticated {
  static styles = css`
    .search-container {
      display: flex;
      align-items: center;
      flex-wrap:wrap;
    }
    .search-field {
      display: flex;
      justify-content: flex-end;
      width: 60%;
      margin: 20px 0px;
    }
    .action-btn {
      display: flex;
      justify-content: flex-end;
      width: 40%;
    }
    .search-field input {
      min-height: 30px;
      max-width: 300px;
      width: 100%;
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
    .primary-btn {
      background-color: #0b57d0;
      font-size: 14px;
      color: #fff;
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
      dataNotFound: { type: String },
    };
  }

  constructor() {
    super();
    this.inputValue = "";
    this.isOpen = false;
    this.isLoading = false;
    this.data = [];
    this.dataNotFound = "";
  }
  navigateToViewEmployee(event, id) {
    event.preventDefault();
    Router.go(`/employee/${id}`);
  }
  navigateToEditEmployee(event, id) {
    event.preventDefault();
    Router.go(`/editemployee/${id}`);
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
    this.dataNotFound = "";
    this.data = [];
  }
  _filterData = async () => {
    if (this.inputValue) {
      try {
        this.isLoading = true;
        const response = await fetch(
          `http://localhost:3000/users?name=${this.inputValue}`
        );
        const json = await response.json();
        if (json.length >= 1) {
          console.log("data undi", json);
          this.data = json;
        } else {
          console.log("data ledu");
          this.dataNotFound = "No data found";
        }
        this.isLoading = false;
      } catch (e) {
        console.log(e);
      }
    }
  };
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
      <div class="employee-container">
        <div class="search-container">
          <div class="search-field">
            <input
              type="text"
              name="inputValue"
              .value=${this.inputValue}
              placeholder="Search Employee here...."
              @input="${(event) => this._handleInput(event)}"
            />
            <button @click="${this._filterData}" class="add-employee-btn">
              Search
            </button>
          </div>
          <div class="action-btn">
            <a href="/add_employee" style="margin-right:10px">
              <button class="add-employee-btn">Add Employee</button>
            </a>
          </div>
        </div>
        <div>
          ${this.isLoading
            ? html`<p style="text-align:center">Loading.....</p>`
            : ""}
        </div>
        <div>
          ${this.data?.length >= 1
            ? html`
                <div class="emp-table">
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
                      ${this.data?.map(
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
                              style="margin-right:10px"
                              class="primary-btn"
                              @click="${(event) =>
                                this.navigateToEditEmployee(event, user.id)}"
                            >
                              Edit
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
              `
            : ""}
        </div>
        <div style="text-align:center;padding-top:50px">
          ${this.dataNotFound ? html`<h1>${this.dataNotFound}</h1>` : ""}
        </div>
        <div>
          ${this.isOpen
            ? html`<modal-element
                .deteteUser="${(event) =>
                  this.deleteEmployee(event, this.userId)}"
                .closeModal="${() => this.closeModal()}"
              >
              </modal-element>`
            : null}
        </div>
      </div>
    `;
  }
}
customElements.define("employee-list1", EmployeeList1);
