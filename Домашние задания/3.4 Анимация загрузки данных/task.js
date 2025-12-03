"use strict";

const itemsContainer = document.getElementById("items");
const loader = document.getElementById("loader");
const URL = "https://students.netoservices.ru/nestjs-backend/slow-get-courses";

// создаём один элемент курса
function createItem(code, value) {
  const item = document.createElement("div");
  item.className = "item";

  const codeDiv = document.createElement("div");
  codeDiv.className = "item__code";
  codeDiv.textContent = code;

  const valueDiv = document.createElement("div");
  valueDiv.className = "item__value";
  valueDiv.textContent = value;

  const currencyDiv = document.createElement("div");
  currencyDiv.className = "item__currency";
  currencyDiv.textContent = "руб.";

  item.append(codeDiv, valueDiv, currencyDiv);
  return item;
}

// отрисовка списка курсов
function renderCourses(coursesObj) {
  itemsContainer.innerHTML = "";

  // coursesObj — объект с валютами (например, data.response.Valute)
  for (const key in coursesObj) {
    if (!Object.prototype.hasOwnProperty.call(coursesObj, key)) {
      continue;
    }
    const currency = coursesObj[key];

    const code = currency.CharCode || key;
    const value = currency.Value || currency.value;

    if (!code || value === undefined) {
      continue;
    }

    const itemElement = createItem(code, value);
    itemsContainer.appendChild(itemElement);
  }
}

// пробуем аккуратно достать объект с курсами из ответа
function extractCourses(data) {
  if (!data) return null;

  const response = data.response || data;

  // самый типичный вариант для этого задания:
  // { response: { Valute: { USD: {...}, EUR: {...}, ... } } }
  if (response.Valute && typeof response.Valute === "object") {
    return response.Valute;
  }

  // запасной вариант: если сам response похож на объект с валютами
  const keys = Object.keys(response || {});
  if (keys.length > 0) {
    const sample = response[keys[0]];
    if (
      sample &&
      typeof sample === "object" &&
      ("Value" in sample || "value" in sample)
    ) {
      return response;
    }
  }

  return null;
}

function hideLoader() {
  loader.classList.remove("loader_active");
}

function showLoader() {
  loader.classList.add("loader_active");
}

// основная функция загрузки
function loadCourses() {
  showLoader();

  const xhr = new XMLHttpRequest();
  xhr.open("GET", URL);
  xhr.addEventListener("load", () => {
    try {
      if (xhr.status !== 200) {
        console.error("Ошибка загрузки:", xhr.status);
        hideLoader();
        return;
      }

      const data = JSON.parse(xhr.responseText);
      const courses = extractCourses(data);

      if (!courses) {
        console.error("Не удалось определить формат данных", data);
        hideLoader();
        return;
      }

      renderCourses(courses);
    } catch (e) {
      console.error("Ошибка обработки ответа:", e);
    } finally {
      // по факту загрузки скрываем анимацию
      hideLoader();
    }
  });

  xhr.addEventListener("error", () => {
    console.error("Сетевая ошибка при запросе курсов");
    hideLoader();
  });

  xhr.send();
}

// запуск при открытии страницы
loadCourses();
