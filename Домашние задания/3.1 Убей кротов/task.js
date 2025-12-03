// Счётчики попаданий и промахов
const deadCounter = document.getElementById('dead');
const lostCounter = document.getElementById('lost');

// Функция, возвращающая лунку по номеру
function getHole(index) {
  return document.getElementById(`hole${index}`);
}

// Сброс игры
function resetGame() {
  deadCounter.textContent = 0;
  lostCounter.textContent = 0;
}

// Вешаем обработчик клика на каждую лунку
for (let i = 1; i <= 9; i++) {
  const hole = getHole(i);

  hole.onclick = function () {
    // Проверяем, есть ли крот в лунке
    if (hole.className.includes('hole_has-mole')) {
      deadCounter.textContent = Number(deadCounter.textContent) + 1;
    } else {
      lostCounter.textContent = Number(lostCounter.textContent) + 1;
    }

    // Проверка на победу
    if (Number(deadCounter.textContent) === 10) {
      alert('Победа!');
      resetGame();
    }

    // Проверка на поражение
    if (Number(lostCounter.textContent) === 5) {
      alert('Вы проиграли!');
      resetGame();
    }
  };
}
