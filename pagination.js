import { renderHtml, clearDetails } from "./renderHtml.js";

let data = [];
const itemsPerPage = 10;

export const pagination = (res, currentPage) => {
  data = res;

  const totalItems = res.length;

  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage - 1); i++) {
    if (currentPage > 3) {
      currentPage.innerHTML = "...";
    }
    pageNumbers.push(i);
  }

  pageNumbers.map((number) => {
    const pagination = document.querySelector(".pagination");
    const paginateElement = document.createElement("div");
    paginateElement.classList = "pagination-container";

    paginateElement.innerHTML = `
    <div>
      <ul class="pagination pagination-lg">
      <a class="page-link" id="btn-${number}" href="#">${number}</a>
      </ul>
    </div>
      `;

    pagination.appendChild(paginateElement);

    const btn = document.getElementById("btn-" + number);

    btn.addEventListener("click", (e) => {
      pageChanged(e.target.firstChild.data);
    });
  });

  pageChanged(currentPage);
};

const pageChanged = (pageNumber) => {
  renderHtml(
    data.slice(
      pageNumber * itemsPerPage,
      pageNumber * itemsPerPage + itemsPerPage
    )
  );
  clearDetails();
};
