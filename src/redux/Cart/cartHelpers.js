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
