import { LitElement, html, css } from "lit";
import { Router } from "@vaadin/router";
import EmployeeList from "./src/components/employee-list.js";
import EmployeeList1 from "./src/components/search-employee.js";
import EmployeeView from "./src/components/employee-view.js";
import AddEmployee from "./src/components/add-employee.js";
import ModalElement from "./src/components/modal-element.js";
import { LifeCycleMethods } from "./src/lifecycle_methods/life-cycle-methods.js";
import "./src/components/header-ele.js";
class LitRealWorldIndex extends LitElement {
  static get properties() {
    return {
      userId: { type: String },
      headerAccess: { type: String },
      routeParams: { type: Object },
    };
  }
  constructor() {
    super();
    this.userId = "";
    this.routeParams = {};
    this.headerAccess = "";
  }
  firstUpdated() {
    super.firstUpdated();
    const router = new Router(this.shadowRoot.querySelector("#outlet"));
    router.setRoutes([
      {
        path: "/",
        component: "login-page",
        action: async () => {
          this.headerAccess = false;
          await import("./src/components/login-page.js");
        },
      },
      {
        path: "/login",
        component: "login-page",
        action: async () => {
          this.headerAccess = false;
          await import("./src/components/login-page.js");
        },
      },
      {
        path: "/employee",
        component: "employee-list",
        action: async () => {
          this.headerAccess = true;
          await import("./src/components/employee-list.js");
        },
      },
      {
        path: `/employee/:userId`,
        component: "employee-view",
        action: async () => {
          this.headerAccess = true;
          await import("./src/components/employee-view.js");
        },
      },
      {
        path: "/search",
        component: "employee-list1",
        action: async () => {
          this.headerAccess = true;
          await import("./src/components/search-employee.js");
        },
      },
      {
        path: "/editemployee/:userId",
        component: "edit-employee",
        action: async () => {
          this.headerAccess = true;
          await import("./src/components/edit-employee.js");
        },
      },
      {
        path: "/add_employee",
        component: "add-employee",
        action: async () => {
          this.headerAccess = true;
          await import("./src/components/add-employee.js");
        },
      },
      { path: "/practice", component: "life-cycle-methods" },
    ]);
  }

  render() {
    return html`
      <main>
        ${this.headerAccess ? html`<header-element></header-element>` : html``}
        <div id="outlet"></div>
      </main>
    `;
  }
}
customElements.define("lit-real-world", LitRealWorldIndex);

// import page from "page";
// import { render } from "lit";
// import EmployeeList from "./src/components/employee-list.js";
// import HeaderEle from "./src/components/header-ele.js";

// window.addEventListener("load", () => {
//   initRouter();
// });
// function initRouter() {
//   console.log("Main page Loading.....");
//   const router = new Router(document.querySelector("main"));
//   router.setRoutes([
//     { path: "/employee", component: "employee-list" },
//     { path: "/employee/:id", component: "employee-view" },
//     { path: "/add_employee", component: "add-employee" },
//     { path: "(.*)", redirect: "/" },
//   ]);
// }

// import page from "page";
// import { render } from "lit";
// page("/", () => {
//   const container = document.getElementById("root");
//   render(new EmployeeList(), container);
// });
// page("/add_employee", () => {
//   const container = document.getElementById("root");
//   render(new AddEmployee(), container);
// });
// page();
