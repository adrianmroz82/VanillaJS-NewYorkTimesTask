const imgUrl = "https://static01.nyt.com/";
export const renderHtml = (res) => {
  const parentContainer = document.querySelector(".row");
  parentContainer.innerHTML = "";

  res.forEach((article, i) => {
    article.id = i + 1;
    const element = document.createElement("div");
    element.classList = "w-75";
    const date = new Date(article.pub_date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const correctDate = date.toLocaleDateString("en-US", options);

    const currImg = imgUrl + article.multimedia.find((x) => x.subtype === "thumbnail")?.url;

    element.innerHTML = `
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-2 mx-auto d-block">
          <img src='${currImg}' class="rounded-start" alt='${article.multimedia[1]?.type}'>  
        </div>
        <div class="col-md-6">
          <div class="card-body">
          <a target="_blank" class="title-link" href="${article.web_url}">
            <h5 class="card-title">${article.headline.main}</h5>
          </a>
            <p class="card-text">${article.abstract}</p>
            <p class="card-text">
              <small class="text-muted">Pulished on ${correctDate}</small>
            </p>
          </div>
        </div>
        <div class="here col-md-2 mx-auto d-block">
        <button id='${article.id}' class="btn px-3 mr-5 mt-1 btn btn-outline-info">test</button>
        </div>
      </div>
      <div id="article-${article.id}" class="test-x g-0">x</div> 
    </div>
   `;

    parentContainer.appendChild(element);
    const btn = document.getElementById(article.id);

    btn.addEventListener("click", () => {
      detailedInformation(article);
    });
  });
};

const detailedInformation = (article) => {
  console.log(article.id);
  clearDetails();

  const detailedElement = document.createElement("div");
  const testX = document.querySelector(`#article-${article.id}`);
  testX.appendChild(detailedElement);

  detailedElement.classList = "detailed";
  detailedElement.innerHTML = `
  <div class="card mt-1 bg-white text-black">
    <img class="card-img" src='${article.multimedia[0].url}' alt='${article.multimedia[0].type}'>
    <p class="card-text fs-2">Published on section ${article.section}</p> 
    <p class="card-text mb-0 pb-1 fs-4">${article.byline}</p> 
    <a class="mb-1 fs-5" href="#">Go back to top</a> 
  </div>`;

  setTimeout(() => {
    detailedElement.scrollIntoView(false);
  }, 200);
};

const clearDetails = () => {
  const detailedElements = document.querySelectorAll(".detailed");
  const arr = [].slice.call(detailedElements);
  arr.forEach((x) => {
    x.innerHTML = "";
    x.parentElement.removeChild(x);
  });
};

export { clearDetails };
