import { fetchData } from "./fetchData.js";
let pagesCount = 10;

export const createPagination = (pages, page) => {
  let list = "<ul class='pagination mb-2'>";

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
    list += '<li class="page-item"><a id="first-page" class="page-link">1</a></li>';
    if (page > 3) {
      list += '<li class="page-item"><a id="dots-after-first" class="page-link">...</a></li>';
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

  for (let i = pageDown; i <= pageUp; i++) {
    if (i === 0) {
      i += 1;
    }
    if (i > pages) {
      continue;
    }
    active = page == i ? "active" : "no";
    list += '<li class="page-item ' + active + `"><a id="page-${i}" class="page-link">` + i + "</a></li>";
  }

  if (page < pages - 1) {
    if (page < pages - 2) {
      list += '<li class="page-item""><a id="dots-before-last" class="page-link">...</a></li>';
    }
    list += '<li class="page-item no"><a id="last-page" class="page-link">' + pages + "</a></li>";
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
  for (let i = pageDown; i <= pageUp; i++) {
    document.getElementById(`page-${i}`)?.addEventListener("click", () => {
      createPagination(pagesCount, i);
    });
  }

  fetchData(page, pages);
};

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
