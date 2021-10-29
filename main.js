import { createPagination } from "./pagination.js";

const yourApiKey = "TqbXjcy6d60sNQ7GjZPsIguZVU91BrN5";
const baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const subject = "arts";
export const url = `${baseUrl}?q=${subject}&api-key=${yourApiKey}`;

export const displayRange = (page) => {
  let firstItem = 10 * (page - 1) + 1;
  let lastItem = page * 10;

  const currentPage = document.querySelector(".current-page");
  currentPage.innerHTML = `Displaying news ${firstItem} - ${lastItem} of 100`;
};

export const renderFooter = (res) => {
  const footer = document.getElementById("footer");
  footer.innerHTML = res.copyright;
};

const res = await fetch(url);
const results = await res.json();
renderFooter(results);

createPagination(1);
