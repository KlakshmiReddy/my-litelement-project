import { html, fixture, expect } from "@open-wc/testing";
import "../src/components/add-employee.js";

describe("AddEmployee", () => {
  it("name label", async () => {
    const el = await fixture(html` <add-employee></add-employee>`);
    const fname = el.shadowRoot.querySelector("#fname").innerText;
    expect(fname).to.equal("Name");
  });
  it("name input", async () => {
    const el = await fixture(html` <add-employee></add-employee>`);
    const fnameInput = el.shadowRoot.querySelector("#input-field1");
    fnameInput.value = "Ramesh";
    expect(fnameInput.value).to.equal("Ramesh");
  });
  it("username label", async () => {
    const el = await fixture(html` <add-employee></add-employee>`);
    const label = el.shadowRoot.querySelector("#username").innerText;
    expect(label).to.equal("User Name");
  });
  it("username input", async () => {
    const el = await fixture(html` <add-employee></add-employee>`);
    const inputItem = el.shadowRoot.querySelector("#input-field2");
    inputItem.value = "Banana";
    expect(inputItem.value).to.equal("Banana");
  });
  it("email label", async () => {
    const el = await fixture(html` <add-employee></add-employee>`);
    const label = el.shadowRoot.querySelector("#email").innerText;
    expect(label).to.equal("Email");
  });
  it("email input", async () => {
    const el = await fixture(html` <add-employee></add-employee>`);
    const inputItem = el.shadowRoot.querySelector("#input-field3");
    inputItem.value = "banana@gmail.com";
    expect(inputItem.value).to.equal("banana@gmail.com");
  });
  it("phone label", async () => {
    const el = await fixture(html` <add-employee></add-employee>`);
    const label = el.shadowRoot.querySelector("#phone").innerText;
    expect(label).to.equal("Phone Number");
  });
  it("phone input", async () => {
    const el = await fixture(html` <add-employee></add-employee>`);
    const inputItem = el.shadowRoot.querySelector("#input-field4");
    inputItem.value = "970323245";
    expect(inputItem.value).to.equal("970323245");
  });
  it("website label", async () => {
    const el = await fixture(html` <add-employee></add-employee>`);
    const label = el.shadowRoot.querySelector("#website").innerText;
    expect(label).to.equal("Website");
  });
  it("website input", async () => {
    const el = await fixture(html` <add-employee></add-employee>`);
    const inputItem = el.shadowRoot.querySelector("#input-field5");
    inputItem.value = "abc.in.com";
    expect(inputItem.value).to.equal("abc.in.com");
  });
  it("add-btn innerText", async () => {
    const el = await fixture(html` <add-employee></add-employee>`);
    const buttonItem = el.shadowRoot.querySelector("#add-btn").innerText;
    expect(buttonItem).to.equal("Add Employee");
  });
  it("add-btn onclick", async () => {
    const el = await fixture(html` <add-employee></add-employee>`);
    let eventTriggered = false;
    function handleSubmit() {
      eventTriggered = true;
    }
    const buttonItem = el.shadowRoot.querySelector("#add-btn");
    buttonItem.addEventListener("click", handleSubmit);
    buttonItem.click();
    expect(eventTriggered).to.be.true;
    buttonItem.removeEventListener("click", handleSubmit);
  });
  it("goback-btn innerText", async () => {
    const el = await fixture(html` <add-employee></add-employee>`);
    const buttonItem = el.shadowRoot.querySelector("#go-back").innerText;
    expect(buttonItem).to.equal("Go Back");
  });
  it("go-back-btn onclick", async () => {
    const el = await fixture(html` <add-employee></add-employee>`);
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
