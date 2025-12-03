"use strict";

const rotator = document.querySelector('.rotator');

if (rotator) {
  const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
  if (cases.length > 0) {
    let index = 0;

    // Функция, которая делает нужный элемент активным
    function setActiveCase(newIndex) {
      // убираем активный класс у всех
      cases.forEach(item => item.classList.remove('rotator__case_active'));

      const element = cases[newIndex];
      element.classList.add('rotator__case_active');

      // меняем цвет текста по атрибуту data-color (если есть)
      const color = element.dataset.color;
      if (color) {
        element.style.color = color;
      } else {
        element.style.color = ''; // сброс, если атрибута нет
      }

      return element;
    }

    function rotate() {
      // делаем текущий элемент активным
      const currentElement = setActiveCase(index);

      // читаем скорость показа из data-speed или берём 1000 по умолчанию
      const speed = Number(currentElement.dataset.speed) || 1000;

      // вычисляем индекс следующего элемента
      index = (index + 1) % cases.length;

      // планируем следующий показ
      setTimeout(rotate, speed);
    }

    // Старт: делаем первый элемент активным и запускаем цикл
    const first = setActiveCase(index);
    const firstSpeed = Number(first.dataset.speed) || 1000;
    setTimeout(rotate, firstSpeed);
  }
}
