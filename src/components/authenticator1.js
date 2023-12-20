import { Router } from "@vaadin/router";
import { LitElement } from "lit";

export class Authenticator1 extends LitElement {
  firstUpdated() {
    super.firstUpdated();
    this.checkTokenAndRedirect();
    console.log("Abc");
  }
  async checkTokenAndRedirect() {
    const token = this.getToken();
    if (token) {
      Router.go("/employee");
    }
  }
  getToken() {
    const token = localStorage.getItem("token");
    console.log("Token", token);
    return token;
  }
}
customElements.define("auth-one", Authenticator1);
