const products = document.querySelectorAll('.product');
const cartProducts = document.querySelector('.cart__products');

products.forEach(product => {
  const decButton = product.querySelector('.product__quantity-control_dec');
  const incButton = product.querySelector('.product__quantity-control_inc');
  const quantityValue = product.querySelector('.product__quantity-value');
  const addButton = product.querySelector('.product__add');

  decButton.addEventListener('click', () => {
    let value = parseInt(quantityValue.textContent);
    if (value > 1) {
      quantityValue.textContent = value - 1;
    }
  });

  incButton.addEventListener('click', () => {
    let value = parseInt(quantityValue.textContent);
    quantityValue.textContent = value + 1;
  });

  addButton.addEventListener('click', () => {
    const productId = product.dataset.id;
    const productImageSrc = product.querySelector('.product__image').src;
    const countToAdd = parseInt(quantityValue.textContent);

    const existingCartProduct = cartProducts.querySelector(`.cart__product[data-id="${productId}"]`);

    if (existingCartProduct) {
      const cartCount = existingCartProduct.querySelector('.cart__product-count');
      cartCount.textContent = parseInt(cartCount.textContent) + countToAdd;
    } else {
      const cartProduct = document.createElement('div');
      cartProduct.classList.add('cart__product');
      cartProduct.dataset.id = productId;

      const img = document.createElement('img');
      img.classList.add('cart__product-image');
      img.src = productImageSrc;

      const count = document.createElement('div');
      count.classList.add('cart__product-count');
      count.textContent = countToAdd;

      cartProduct.appendChild(img);
      cartProduct.appendChild(count);
      cartProducts.appendChild(cartProduct);
    }
  });
});
