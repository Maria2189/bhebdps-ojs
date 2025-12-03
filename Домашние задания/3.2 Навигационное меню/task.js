"use strict";

const menuLinks = document.querySelectorAll('.menu__link');

menuLinks.forEach((link) => {
  link.onclick = function (event) {
    // li, внутри которого находится ссылка
    const menuItem = link.closest('.menu__item');
    // вложенное меню (если есть)
    const subMenu = menuItem.querySelector('.menu_sub');

    // Если у пункта НЕТ вложенного меню — даём ссылке работать как обычно
    if (!subMenu) {
      return true;
    }

    // У пункта ЕСТЬ вложенное меню — не переходим по ссылке
    event.preventDefault();

    // Находим "родное" главное меню для этого пункта
    const menuMain = menuItem.closest('.menu_main');

    // Уже открытое вложенное меню внутри ЭТОГО меню
    const activeSubMenu = menuMain.querySelector('.menu_sub.menu_active');

    // Если открыто другое подменю — закрываем его
    if (activeSubMenu && activeSubMenu !== subMenu) {
      activeSubMenu.classList.remove('menu_active');
    }

    // Переключаем текущее подменю
    subMenu.classList.toggle('menu_active');

    // Для вложенных меню обязательно возвращаем false
    return false;
  };
});
