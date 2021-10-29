import { renderHtml } from "./renderHtml.js";
import { displayRange, url } from "./main.js";

export const fetchData = async (page) => {
  const res = await fetch(`${url}&page=${page}`);
  const results = await res.json();

  const data = results.response.docs;
  renderHtml(data);
  displayRange(page);
};
