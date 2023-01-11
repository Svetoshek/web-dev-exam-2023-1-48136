function downloadData() {
  let xhr = new XMLHttpRequest();
  let url = new URL(
    "http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes?api_key=b2d98250-2702-48dc-ab6e-2ec86574c9f5"
  );

  xhr.open("GET", url);
  xhr.responseType = "json";
  xhr.send();
  xhr.onload = function () {
    let data = xhr.response;
    renderName(data["name"]);
    setPaginationInfo(data["id"]);
    renderPagination(data["id"]);
  };
}
function renderName(name) {
  let = recList = document.querySelector("tbody");
  recList.innerHTML = "";
  name.forEach(function (name) {
    let createTr = document.createEvent("tr");
    let createTd = document.createElement("td");
    createTr.classList.add("tbody");
    createTd.classList.add("tr");
    createTr.append(createContent(name));
    createTr.append(createContent(descriprtion));
    createTr.append(createContent(mainObject));
    recList.append(createTr);
  });
}

function createContent(name) {
  let createTr = document.createEvent("tr");
  let createTd = document.createElement("td");
  createTr.classList.add("tbody");
  createTd.classList.add("tr");
  createTd.innerHTML = name.text;
  return createTd;
}

function createDescription(descriprtion) {
  let createTr = document.createEvent("tr");
  let createTd = document.createElement("td");
  createTr.classList.add("tbody");
  createTd.classList.add("tr");
  createTd.innerHTML = descriprtion.text;
  return createTd;
}

function createDescription(mainObject) {
  let createTr = document.createEvent("tr");
  let createTd = document.createElement("td");
  createTr.classList.add("tbody");
  createTd.classList.add("tr");
  createTd.innerHTML = mainObject.text;
  return createTd;
}

function setPaginationInfo(pagination) {
  let fromPage = document.querySelector(".from-page");
  let toPage = document.querySelector(".to-page");
  let allPage = document.querySelector(".all-page");
  if (pagination.total_count != 0) {
    fromPage.innerHTML =
      1 + (pagination.current_page - 1) * pagination.per_page;
    toPage.innerHTML = Math.min(
      pagination.current_page * pagination.per_page,
      pagination.total_count
    );
  } else {
    fromPage.innerHTML = 0;
    toPage.innerHTML = 0;
  }
  allPage.innerHTML = pagination.total_count;
}

function perPageSelector(event) {
  downloadData(1, event.target.value);
}

function createPageBtn(page, classes = []) {
  let button = document.createElement("button");
  classes.push("btn");
  button.classList.add(...classes);
  button.innerHTML = page;
  button.dataset.page = page;
  return button;
}

function renderPagination(pagination) {
  let paginationElement = document.querySelector(".pagination");
  paginationElement.innerHTML = "";
  let button = createPageBtn(1, ["first-page-btn"]);
  button.innerHTML = "Первая страница";
  paginationElement.append(button);

  if (pagination.current_page == 1) button.classList.add("hidden");

  let start, end;
  start = Math.max(pagination.current_page - 2, 1);
  end = Math.min(pagination.current_page + 2, pagination.total_pages);

  let createDiv = document.createElement("div");
  createDiv.classList.add("page-btn");
  paginationElement.append(createDiv);

  for (let i = start; i <= end; i++) {
    button = createPageBtn(i, pagination.current_page == i ? ["active"] : []);
    createDiv.append(button);
  }

  button = createPageBtn(pagination.total_pages, ["last-page-btn"]);
  button.innerHTML = "Последняя страница";
  paginationElement.append(button);

  if (pagination.current_page == pagination.total_pages)
    button.classList.add("hidden");
}

function pageBtnHandler(event) {
  if (event.target.tagName != "BUTTON") return;

  let page = event.target.dataset.page;
  downloadData(page, document.querySelector(".per-page").value);
}
window.onload = function () {
  downloadData();
  let perPage = document.querySelector(".per-page");
  let searchButton = document.querySelector(".search-btn");
  let paginationElement = document.querySelector(".pagination");
  perPage.addEventListener("change", perPageSelector);
  paginationElement.addEventListener("click", pageBtnHandler);
};
