import { fetchData } from "./fetchData.js";
const pagesCount = 10;

export const createPagination = (page) => {
  let list = "";

  let active;
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
  page === 1 ? (pageUp += 2) : page === 2 ? (pageUp += 1) : page;

  page === pagesCount ? (pageDown -= 2) : page === pagesCount - 1 ? (pageDown -= 1) : page;

  for (let i = pageDown; i <= pageUp; i++) {
    if (i === 0) {
      i += 1;
    }
    if (i > pagesCount) {
      continue;
    }
    active = page == i ? "active" : "";
    list += '<li class="page-item ' + active + `"><a id="page-${i}" class="page-link">` + i + "</a></li>";
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

  addEvents(page);
  for (let i = pageDown; i <= pageUp; i++) {
    document.getElementById(`page-${i}`)?.addEventListener("click", () => {
      createPagination(i);
    });
  }
  fetchData(page);
};

const addEvents = (page) => {
  document.querySelectorAll(".event").forEach((el) => {
    el.addEventListener("click", () => {
      el.id === "previous"
        ? createPagination(page - 1)
        : el.id === "next"
        ? createPagination(page + 1)
        : el.id === "first-page"
        ? createPagination(1)
        : el.id === "last-page"
        ? createPagination(pagesCount)
        : "";
    });
  });
};
