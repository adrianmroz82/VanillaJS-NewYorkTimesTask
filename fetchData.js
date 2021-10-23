import { renderHtml } from "./renderHtml.js";

const yourApiKey = "TqbXjcy6d60sNQ7GjZPsIguZVU91BrN5";
const baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const subject = "arts";

export const fetchData = () => {
  const url = `${baseUrl}?q=${subject}&api-key=${yourApiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((res) => {
      let data = res.response.docs;
      console.log(data);
      renderHtml(data);
    });
};
fetchData();
