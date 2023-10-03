const accesskey = "";

const formElem = document.querySelector("form");
const inputElem = document.querySelector(".js-search-input");
const searchResults = document.querySelector(".search-results");
const showMoreBtn = document.querySelector(".show-more");

let inputData = "";
let page = 1;

// Get images using fetch API
const searchImage = async () => {
  inputData = inputElem.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    // append the generated elements to the parent div
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showMoreBtn.style.display = "block";
  }
};

// Display the images when he form is submitted
formElem.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImage();
  formElem.reset();
});

// Show more images when the show more button is clicked
showMoreBtn.addEventListener("click", () => {
  searchImage();
});
