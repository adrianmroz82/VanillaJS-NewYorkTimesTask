export const renderHtml = (res) => {
  const parentContainer = document.querySelector(".row");
  parentContainer.innerHTML = "";

  res.forEach((article) => {
    const element = document.createElement("div");
    element.classList = "mb-5";
    const date = new Date(article.published_date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const correctDate = date.toLocaleDateString("en-US", options);

    element.innerHTML = `
    <div class="card pt-4 h-100" >
      <img  src='${article.multimedia[1].url}' alt='${article.multimedia[1].type}'>
      <div class="card-body mb-0">
        <p class="card-title fs-6">${article.title}</p>
        </div>
          <div class="card-footer">
              <small class="text-muted">Pulished on ${correctDate}</small>
          </div>
        </div>
      </div>
    </div>`;

    parentContainer.appendChild(element);

    const btn = document.createElement("button");
    btn.innerHTML = "See more";
    btn.classList = "btn px-3 mt-3 btn btn-outline-info";
    element.appendChild(btn);

    btn.addEventListener("click", () => {
      detailedInformation(article);
    });
  });
};

const detailedInformation = (article) => {
  clearDetails();
  const detailedElement = document.createElement("div");

  detailedElement.classList = "detailed";

  detailedElement.innerHTML = `
  <div class="card mt-5 bg-white text-black">
    <img class="card-img" src='${article.multimedia[0].url}' alt="Card image">
    <p class="card-text p-3 fs-4">${article.abstract}</p>
    <p class="card-text pb-2 fs-5">${article.byline}</p> 
    <a class="mb-4 fs-5" href="#">Go back to top</a> 
  </div>`;

  const parentElement = document.getElementById("parent-container");
  parentElement.appendChild(detailedElement);

  setTimeout(() => {
    detailedElement.scrollIntoView(false);
  }, 200);
};

const clearDetails = () => {
  const detailedElements = document.getElementsByClassName("detailed");
  const arr = [].slice.call(detailedElements);
  arr.forEach(x => {
    x.innerHTML = "";
    x.parentElement.removeChild(x);
  });
}

export { clearDetails };