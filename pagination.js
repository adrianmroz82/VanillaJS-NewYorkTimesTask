import { fetchData } from "./fetchData.js";
const pagesCount = 10;

export const createPagination = (page) => {
  let list = "";

  let pageDown = page - 1;
  let pageUp = page + 1;
  if (page > 1) {
    list += `
    <li class="page-item">
    <a id="previous" class="page-link event" href="#" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
      <span class="sr-only"></span>
    </a>
  </li>`;
  }

  if (page > 2) {
    list += '<li class="page-item"><a id="first-page" class="page-link event">1</a></li>';
    if (page > 3) {
      list += '<li class="page-item page-link">...</a></li>';
    }
  }
  pageUp += page === 1 ? 2 : page === 2 ? 1 : "";

  pageDown -= page === pagesCount ? 2 : page === pagesCount - 1 ? 1 : "";

  for (let i = pageDown; i <= pageUp; i++) {
    if (i === 0) {
      i += 1;
    }
    if (i > pagesCount) {
      continue;
    }
    list += `<li class="page-item${
      page == i && " active"
    }"><a id="page-${i}" class="page-link">${i}</a></li>`;
  }

  if (page < pagesCount - 1) {
    if (page < pagesCount - 2) {
      list += '<li class="page-item page-link">...</li>';
    }
    list += '<li class="page-item"><a id="last-page" class="page-link event">' + pagesCount + "</a></li>";
  }

  if (page < pagesCount) {
    list += `<li class="page-item">
    <a id="next" class="page-link event" href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
      <span class="sr-only"></span>
    </a>
  </li>`;
  }
  document.querySelector(".pagination").innerHTML = list;

  fetchData(page);
};
