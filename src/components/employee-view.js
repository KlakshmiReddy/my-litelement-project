import { html, css, LitElement } from "lit";
import { Router } from "@vaadin/router";

export default class EmployeeView extends LitElement {
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
    .add-employee-btn {
      padding: 10px 20px;
      background: lightblue;
      border-width: 0px;
      font-weight: bold;
    }
  `;

  static get properties() {
    return {
      routeParams: { type: Object },
      id: { type: Number },
      employeeData: { type: Array },
      isLoading: { type: Boolean },
    };
  }
  constructor() {
    super();
    this.isLoading = true;
    this.routeParams = {};
    console.log(window.location.href);
  }

  firstUpdated() {
    console.log("Inside the firstupdated employee-view Loading.....");
    this.routeParams = this.location.params;
    this.id = this.routeParams.userId;
    try {
      fetch(`https://jsonplaceholder.typicode.com/users/${this.id}`)
        .then((res) => res.json())
        .then((data) => {
          this.employeeData = [data];
          console.log("data", this.employeeData);
        });
      this.isLoading = false;
    } catch (e) {
      console.log(e);
    }
  }

  navigateToEmployeeList(event) {
    event.preventDefault();
    window.history.back();
  }

  render() {
    const content = this.isLoading
      ? html`<p>Loading....</p>`
      : html`${this.employeeData?.map((user) => {
          return html`
            <form class="add-employee-form">
              <div style="margin-bottom:10px">
                <label class="label-item">Name : </label>
                <p>${user.name}</p>
              </div>
              <div style="margin-bottom:10px">
                <label class="label-item">User Name : </label>
                <p>${user.username}</p>
              </div>
              <div style="margin-bottom:10px">
                <label class="label-item">Email : </label>
                <p>${user.email}</p>
              </div>
              <div style="margin-bottom:10px">
                <label class="label-item">Phone Number : </label>
                <p>${user.phone}</p>
              </div>
              <div style="margin-bottom:10px">
                <label class="label-item">Website : </label>
                <p>${user.website}</p>
              </div>
              <div style="margin-bottom:10px; text-align:center;">
                <button
                  class="add-employee-btn"
                  @click="${(event) => this.navigateToEmployeeList(event)}"
                >
                  Back
                </button>
              </div>
            </form>
          `;
        })}`;
    return html`<div class="add-employee-container">${content}</div> `;
  }
}
customElements.define("employee-view", EmployeeView);
