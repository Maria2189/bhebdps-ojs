//Задача № 1
function cachingDecoratorNew(func) {
  let cache = [];

  function wrapper(...args) {
    const hash = md5(args); // получаем хеш аргументов
    const cachedItem = cache.find((item) => item.hash === hash);

    if (cachedItem) {
      console.log("Из кеша: " + cachedItem.value);
      return "Из кеша: " + cachedItem.value;
    }

    const result = func(...args); // считаем результат

    cache.push({ hash: hash, value: result });

    if (cache.length > 5) {
      cache.shift(); // удаляем самый старый элемент
    }

    console.log("Вычисляем: " + result);
    return "Вычисляем: " + result;
  }

  return wrapper;
}

//Задача № 2
function debounceDecoratorNew(func, delay) {
  let timeoutId;
  let isFirstCall = true;

  function wrapper(...args) {
    wrapper.allCount++;

    const context = this;

    if (isFirstCall) {
      // Первый вызов — моментально
      func.apply(context, args);
      wrapper.count++;
      isFirstCall = false;
      return;
    }

    // Все последующие — только с задержкой, с дебаунсом
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(context, args);
      wrapper.count++;
      timeoutId = null;
    }, delay);
  }

  wrapper.count = 0;     // сколько раз реально вызвали func
  wrapper.allCount = 0;  // сколько раз вызывали wrapper

  return wrapper;
}