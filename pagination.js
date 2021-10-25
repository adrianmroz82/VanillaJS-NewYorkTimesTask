import { fetchData } from "./fetchData.js";
let pagesCount = 10;

function createPagination(pages, page) {
  let list = "<ul>";

  let active;
  let pageDown = page - 1;
  let pageUp = page + 1;
  if (page > 1) {
    list += `
    <li class="page-item">
    <a id="previous" class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
      <span class="sr-only"></span>
    </a>
  </li>`;
  }

  if (page > 2) {
    list += '<li class="no page-item"><a id="first-page">1</a></li>';
    if (page > 3) {
      list += '<li class="out-of-range"><a id="dots-after-first">...</a></li>';
    }
  }
  if (page === 1) {
    pageUp += 2;
  } else if (page === 2) {
    pageUp += 1;
  }
  if (page === pages) {
    pageDown -= 2;
  } else if (page === pages - 1) {
    pageDown -= 1;
  }

  for (let p = pageDown; p <= pageUp; p++) {
    if (p === 0) {
      p += 1;
    }
    if (p > pages) {
      continue;
    }
    active = page == p ? "active" : "no";
    list += '<li class="page-item ' + active + `"><a id="page-${p}">` + p + "</a></li>";
  }

  if (page < pages - 1) {
    if (page < pages - 2) {
      list += '<li class="out-of-range"><a id="dots-before-last">...</a></li>';
    }
    list += '<li class="page-item no"><a id="last-page">' + pages + "</a></li>";
  }

  if (page < pages) {
    list += `<li class="page-item">
    <a id="next" class="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
      <span class="sr-only"></span>
    </a>
  </li>`;
  }
  list += "</ul>";
  document.querySelector(".pagination").innerHTML = list;

  addEvents(page);
  for (let p = pageDown; p <= pageUp; p++) {
    document.getElementById(`page-${p}`)?.addEventListener("click", () => {
      createPagination(pagesCount, p);
    });
  }

  fetchData(page, pages);
}

const addEvents = (page) => {
  document.getElementById("previous")?.addEventListener("click", () => {
    createPagination(pagesCount, page - 1);
  });
  document.getElementById("next")?.addEventListener("click", () => {
    createPagination(pagesCount, page + 1);
  });
  document.getElementById("first-page")?.addEventListener("click", () => {
    createPagination(pagesCount, 1);
  });
  document.getElementById("last-page")?.addEventListener("click", () => {
    createPagination(pagesCount, pagesCount);
  });
  document.getElementById("dots-before-last")?.addEventListener("click", () => {
    createPagination(pagesCount, page + 2);
  });
  document.getElementById("dots-after-first")?.addEventListener("click", () => {
    createPagination(pagesCount, page - 2);
  });
};

export { createPagination };
