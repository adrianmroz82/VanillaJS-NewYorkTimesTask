import { renderHtml } from "./renderHtml.js";
import { createPagination } from "./pagination2.js";

const yourApiKey = "TqbXjcy6d60sNQ7GjZPsIguZVU91BrN5";
const baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const subject = "arts";

export const fetchData = (page) => {
  const url = `${baseUrl}?q=${subject}&page=${page}&api-key=${yourApiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((res) => {
      let data = res.response.docs;
      renderHtml(data);
      const footer = document.getElementById("footer");
      footer.innerHTML = res.copyright;
    });

  displayRange(page);
};

export const displayRange = (page) => {
  let from = 10 * (page - 1) + 1;
  let to = page * 10;

  const currentPage = document.querySelector(".current-page");
  currentPage.innerHTML = `Displaying news ${from} - ${to} of 100`;
};

createPagination(10, 5);
