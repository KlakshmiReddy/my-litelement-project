import { html, css, LitElement } from "lit";

export default class ModalElement extends LitElement {
  static styles = css`
    .modal {
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.2);
    }
    .modal-content {
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 30%;
    }
    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }
    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
    .action-btn-group {
      display: flex;
      justify-content: flex-end;
    }
    .primary-btn {
      background-color: rgb(0 104 255 / 78%);
      font-size: 14px;
      color: rgb(255, 255, 255);
      padding: 5px 10px;
      border-width: 0px;
      cursor: pointer;
      border-radius: 3px;
    }
    .sec-btn {
      background-color: rgb(82 89 101 / 78%);
      font-size: 14px;
      color: rgb(255, 255, 255);
      padding: 5px 10px;
      border-width: 0px;
      cursor: pointer;
      border-radius: 3px;
    }
  `;

  static get properties() {
    return {
      deteteUser: { type: Function },
      closeModal: { type: Function },
    };
  }
  constructor() {
    super();
  }

  render() {
    return html`
      <div class="modal">
        <div class="modal-content">
          <span class="close" @click="${this.closeModal}"> &times; </span>
          <p style="margin-top:25px;">
            Are you sure you want to delete employee ${this.user} ?
          </p>
          <div class="action-btn-group">
            <button
              class="primary-btn"
              style="margin-right:10px;"
              @click="${this.deteteUser}"
            >
              OK
            </button>
            <button class="sec-btn" @click="${this.closeModal}">Cancel</button>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define("modal-element", ModalElement);
