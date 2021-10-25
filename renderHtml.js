export const renderHtml = (res) => {
  const parentContainer = document.getElementById("news-cards");
  parentContainer.innerHTML = "";

  res.forEach((article, i) => {
    const { pub_date, multimedia, web_url, headline, abstract } = article;

    article.id = i + 1;

    const element = document.createElement("div");

    element.classList = "w-75";
    const date = new Date(pub_date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const correctDate = date.toLocaleDateString("en-US", options);
    const imgUrl = "https://static01.nyt.com/";
    const smallImg = imgUrl + multimedia.find((img) => img.subtype === "thumbnail")?.url;

    element.innerHTML = `
    <div class="card border-warning mb-3">
      <div class="row g-0">
        <div class="col-md-2 mx-auto d-block">
        <img id="image" class="mt-1" src='${smallImg}' onerror="this.src='assets/images/newyorktimeslogo.png'" alt='${article.multimedia[0].type}'/>
        </div>
        <div class="col-md-8">
          <div class="card-body">
          <a target="_blank" class="title-link" href="${web_url}">
            <h5 class="card-title">${headline.main}</h5>
          </a>
            <p class="card-text">${abstract}</p>
            <p class="card-text">
              <small class="text-muted">Pulished on ${correctDate}</small>
            </p>
          </div>
        </div>
        <div class="col-md-2">
        <button id='${article.id}' class="btn px-3 mt-1 mb-1 btn btn-warning">See more</button>
        </div>
      </div>
      <div id="article-${article.id}"></div> 
    </div>
   `;

    parentContainer.appendChild(element);
    const btn = document.getElementById(article.id);

    btn.addEventListener("click", () => {
      detailedInformation(article);
    });
  });
};

const detailedInformation = (article, byline) => {
  const imgUrl = "https://static01.nyt.com/";
  const largeImg = imgUrl + article.multimedia.find((x) => x.subtype === "jumbo")?.url;

  clearDetails();

  const detailedElement = document.createElement("div");
  const detailedSection = document.getElementById(`article-${article.id}`);
  detailedSection.appendChild(detailedElement);

  if (article.byline.original === null) {
    article.byline.original = "";
  }

  detailedElement.classList = "detailed";
  detailedElement.innerHTML = `
  <div class="card mt-1 bg-white text-black">
    <img class="card-img" src='${largeImg}' alt='${article.multimedia[0].type}'>
    <div class="card-text mb-2 fs-4">Published on section ${article.section_name}</div> 
    <div class="card-text mb-2 fs-4">${article.byline.original}</div> 
    <a class="mb-2 fs-5" href="#">Go back to top</a>
  </div>`;

  setTimeout(() => {
    detailedElement.scrollIntoView(false);
  }, 500);
};

const clearDetails = () => {
  const detailedElements = document.querySelectorAll(".detailed");
  const arr = [...detailedElements];

  arr.forEach((el) => {
    el.innerHTML = "";
    el.parentElement.removeChild(el);
  });
};

export { clearDetails };
