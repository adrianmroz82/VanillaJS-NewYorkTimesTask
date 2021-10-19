import { pagination } from "./pagination.js";

const url =
  "https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=TqbXjcy6d60sNQ7GjZPsIguZVU91BrN5";

export const fetchData = () => {
  fetch(url)
    .then((response) => response.json())
    .then((res) => {
      let data = res.results;
      data = data.concat(data);
      data = data.concat(data.slice(0, 10));
      pagination(data, 1);

      const footer = document.getElementById("footer");
      footer.innerHTML = res.copyright;
    });
};

fetchData();
