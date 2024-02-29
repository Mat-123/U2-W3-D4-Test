const URL_PEXELS = "https://api.pexels.com/v1/search?query=";

const MY_API_KEY = "tC8jYs1h7BdijPVtnUs6nXFe5pP7p0O1wOWKnGOw0Bvlmqm2eZ3WVTa2";

const hideColumn = function (context) {
  let rightColToDelete = context.closest(".col-md-4");
  rightColToDelete.remove();
};

const newImageInCard = function (pics) {
  let removeCards = document.querySelector(".album .container .row");
  removeCards.innerHTML = "";
  pics.forEach((pic) => {
    let columnsDivs = `
    <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
        <a href="./pexels-details.html?photoId=${pic.id}">
            <img src=${pic.src.small}} style="width: 100%" />
        </a>
            <div class="card-body">
            <a href="./pexels-details.html?photoId=${pic.id}">
                <h5 class="card-title">Lorem Ipsum</h5>
            </a>
                <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
                </p>
                <div
                class="d-flex justify-content-between align-items-center"
                >
                <div class="btn-group">
                    <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onclick="fillImageInModal(this)"
                    >
                        View
                    </button>
                    <button
                    type="button"
                    class="btn btn-sm btn-outline-secondary"
                    onclick="hideColumn(this)"
                    >
                    Hide
                    </button>
                </div>
                <small class="text-muted">${pic.id}</small>
                </div>
            </div>
        </div>
    </div>
    `;
    removeCards.innerHTML += columnsDivs;
  });
};

const getImage = function (query) {
  fetch(URL_PEXELS + query, {
    headers: {
      authorization: MY_API_KEY,
    },
  })
    .then((result) => {
      if (result.ok) {
        return result.json();
      } else {
        throw new Error("Images not availables.");
      }
    })
    .then((imgData) => {
      newImageInCard(imgData.photos);
    })
    .catch((error) => {
      console.log(error);
    });
};

window.onload = function () {
  let primaryButton = document.querySelector(".btn-primary");
  primaryButton.addEventListener("click", () => {
    getImage("cats");
  });

  let secondaryButton = document.querySelector(".btn-secondary");
  secondaryButton.addEventListener("click", () => {
    getImage("surfing");
  });

  let customInputField = document.querySelector(".input-group .form-control");
  let customSearchButton = document.querySelector(".input-group .btn-outline-secondary");
  customSearchButton.addEventListener("click", () => {
    getImage(customInputField.value);
  });
};
