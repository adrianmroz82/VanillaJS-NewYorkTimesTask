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
      console.log(data);
      renderHtml(data);
      // createPagination(10, 5);
    });
};
// fetchData();
createPagination(10, 5);
