const getPrice = product => {
  return product.sale_price ? product.sale_price : product.price;
};

const getTotalPrice = items => {
  return items.map(item => item.totalPrice).reduce((prev, curr) => prev + curr);
};

const findItemIndex = (items, product) => {
  return items.findIndex(item => item.id === product.id);
};

export const increaseItemQuantity = (items, product) => {
  const newItems = [...items];

  const itemIndex = findItemIndex(newItems, product);

  if (itemIndex > -1) {
    newItems[itemIndex].quantity += 1;
    newItems[itemIndex].totalPrice += getPrice(product);
  } else {
    newItems.push({
      ...product,
      quantity: 1,
      totalPrice: getPrice(product),
    });
  }

  const totalPrice = getTotalPrice(newItems);

  return { items: newItems, totalPrice };
};

export const decreaseItemQuantity = (items, product) => {
  const newItems = [...items];

  const itemIndex = findItemIndex(newItems, product);

  if (itemIndex > -1) {
    if (newItems[itemIndex].quantity > 1) {
      newItems[itemIndex].quantity -= 1;
      newItems[itemIndex].totalPrice -= getPrice(product);

      return { items: newItems, totalPrice: getTotalPrice(newItems) };
    } else {
      const itemsFiltered = newItems.filter(item => item.id !== product.id);
      const totalPrice =
        itemsFiltered.length > 0 ? getTotalPrice(itemsFiltered) : 0;

      return { items: itemsFiltered, totalPrice };
    }
  }

  return {
    items,
    totalPrice: newItems.length > 0 ? getTotalPrice(newItems) : 0,
  };
};

export const removeItemFromCart = (items, product) => {
  const newItems = items.filter(item => item.id !== product.id);

  return {
    items: newItems,
    totalPrice: newItems.length > 0 ? getTotalPrice(newItems) : 0,
  };
};

export const getFinalState = result => {
  return {
    items: result.items,
    totalItems: result.items.length,
    totalPrice: result.totalPrice,
  };
};
