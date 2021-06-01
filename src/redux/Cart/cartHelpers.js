export const existingCartItem = ({ previousCartItems, nextCartItem }) => {
  return previousCartItems.find(
    (cartItem) => cartItem.documentId === nextCartItem.documentId
  );
};

export const checkIfItemsExistsInCart = ({
  previousCartItems = [],
  nextCartItem,
}) => {
  const incrementQuantityByOne = 1;
  const cartItemExists = existingCartItem({ previousCartItems, nextCartItem });
  if (cartItemExists) {
    return previousCartItems.map((cartItem) =>
      cartItem.documentId === nextCartItem.documentId
        ? { ...cartItem, quantity: cartItem.quantity + incrementQuantityByOne }
        : cartItem
    );
  }
  return [
    ...previousCartItems,
    { ...nextCartItem, quantity: incrementQuantityByOne },
  ];
};

export const handleRemoveCartItem = ({
  previousCartItems,
  cartItemToRemove,
}) => {
  return previousCartItems.filter(
    (item) => item.documentId !== cartItemToRemove.documentId
  );
};

export const handleDecreaseItemQuantity = ({
  previousCartItems,
  cartItemToDecrease,
}) => {
  const existingCartItem = previousCartItems.find(
    (item) => item.documentId === cartItemToDecrease.documentId
  );
  if (existingCartItem.quantity === 1) {
    return previousCartItems.filter(
      (item) => item.documentId !== existingCartItem.documentId
    );
  }
  return previousCartItems.map((cartItem) =>
    cartItem.documentId === existingCartItem.documentId
      ? {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        }
      : cartItem
  );
};
