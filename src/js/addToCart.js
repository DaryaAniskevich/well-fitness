const addToCart = (cartItem) => {
  const positionsArray = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  if (positionsArray.some((item) => item.id === cartItem.id)) {
    positionsArray.map((item) => {
      if (item.id === cartItem.id) {
        item.count++;
      }
      return item;
    });
  } else {
    positionsArray.push(cartItem);
  }

  localStorage.removeItem("cart");
  localStorage.setItem("cart", JSON.stringify(positionsArray));
};
