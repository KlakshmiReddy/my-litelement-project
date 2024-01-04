import { html, fixture, expect } from "@open-wc/testing";
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/components/employee-view.js");
chai.use()

describe("EmployeeView", () => {
  it("name label", async () => {
    const el = await fixture(html`<employee-view></employee-view>`);
    const fname = el.shadowRoot.querySelector("#name-label").innerText;
    expect(fname).to.equal("Name");
  });

  it("goback-btn innerText", async () => {
    const el = await fixture(html`<employee-view></employee-view>`);
    const buttonItem = el.shadowRoot.querySelector("#go-back").innerText;
    expect(buttonItem).to.equal("Go Back");
  });
  it("go-back-btn onclick", async () => {
    const el = await fixture(html` <employee-view></employee-view>`);
    let eventTriggered = false;
    function handleSubmit() {
      eventTriggered = true;
    }
    const buttonItem = el.shadowRoot.querySelector("#go-back");
    buttonItem.addEventListener("click", handleSubmit);
    buttonItem.click();
    expect(eventTriggered).to.be.true;
    buttonItem.removeEventListener("click", handleSubmit);
  });
});
