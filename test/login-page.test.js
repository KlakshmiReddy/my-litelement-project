import { html, fixture, expect } from "@open-wc/testing";
import "../src/components/login-page.js";

describe("LoginPage", () => {
  it("email input", async () => {
    const el = await fixture(html`<login-page></login-page>`);
    const emailInput = el.shadowRoot.querySelector("#input-field1");
    emailInput.value = "lakshmireddy@gmail.com";
    expect(emailInput.value).to.equal("lakshmireddy@gmail.com");
  });
  it("password input", async () => {
    const el = await fixture(html`<login-page></login-page>`);
    const passwordInput = el.shadowRoot.querySelector("#input-field2");
    passwordInput.value = "Banana";
    expect(passwordInput.value).to.equal("Banana");
  });
  it("login-btn onclick", async () => {
    const el = await fixture(html`<login-page></login-page>`);
    let eventTriggered = false;
    function handleSubmit() {
      eventTriggered = true;
    }
    const buttonItem = el.shadowRoot.querySelector("#login-btn");
    buttonItem.addEventListener("click", handleSubmit);
    buttonItem.click();
    expect(eventTriggered).to.be.true;
    buttonItem.removeEventListener("click", handleSubmit);
  });
});
