import { html, css, LitElement } from "lit";

export class Pagination extends LitElement {
  static styles = css`
        .pagination{
            display:flex,
            list-style:none;
            padding:0;
        }
        .pagination li{
            margin-right:5px;
            cursor:pointer;
        }
        .pagination li.active{
            font-weitht:bold;
        }
    `;
  static get properties() {
    return {
      empdata: { type: Array },
      currentPage: { type: Number },
      totalPosts: { type: Number },
      pageNumbers: { type: Array },
    };
  }
  constructor() {
    super();
    this.currentPage = 1;
    this.postsPerPage = 5;
  }
  updated(changedProperties) {
    if (changedProperties.has("empdata")) {
      this.totalPosts = this.empdata.length;
      this.pageNumbers = this.getPageNumbers();
    }
  }
  getPageNumbers() {
    const val = [];
    for (let i = 1; i <= Math.ceil(this.totalPosts / this.postsPerPage); i++) {
      val.push(i);
    }
    return val;
  }
  handleEvent = (each) => {
    const eventData = each;
    console.log(eventData);
    this.dispatchEvent(
      new CustomEvent("child-event", {
        bubbles: true,
        composed: true,
        detail: eventData,
      })
    );
  };

  render() {
    return html`
      <ul class="pagination">
        <button><</button>
        ${this.pageNumbers?.map(
          (each) =>
            html`
              <button @click="${() => this.handleEvent(each)}">${each}</button>
            `
        )}
        <button>></button>
      </ul>
    `;
  }
}
customElements.define("pagination-component", Pagination);
