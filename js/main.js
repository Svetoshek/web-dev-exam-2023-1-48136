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
    createContent(data);
    createDescription(data);
    createMainObject(data);
    renderRoute(data);
  };
}

function renderRoute(date) {
  let = recList = document.querySelector(".list");
  (recList.innerHTML = ""),
    date.forEach((data) => {
      let createTr = document.createElement("tr");
      createTr.classList.add("tr");
      createTr.append(createContent(data["name"]));
      createTr.append(createDescription(data["description"]));
      createTr.append(createMainObject(data["mainObject"]));
      recList.append(createTr);
    });
}

function createContent(name) {
  let createTd = document.createElement("td");
  createTd.classList.add("td");
  createTd.innerHTML = name;
  return createTd;
}

function createDescription(description) {
  let createTd = document.createElement("td");
  createTd.classList.add("td");
  createTd.innerHTML = description;
  return createTd;
}

function createMainObject(mainObject) {
  let createTd = document.createElement("td");
  createTd.classList.add("td");
  createTd.innerHTML = mainObject;
  return createTd;
}

window.onload = function () {
  downloadData();
  let perPage = document.querySelector(".per-page");
  let searchButton = document.querySelector(".search-btn");
  let paginationElement = document.querySelector(".pagination");
};
