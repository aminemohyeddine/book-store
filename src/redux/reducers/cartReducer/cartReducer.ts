export const cartReducer = (state = { cart: [] }, action: any) => {
  switch (action.type) {
    case "addBookToCart":
      const targetBook = action.payload.books.find(
        (book: any) => book._id === action.payload.id
      );
      const bookInCart = state.cart?.find(
        (book: any) => book._id === action.payload.id
      );
      console.log(state.cart);

      return {
        ...state,
        cart:
          bookInCart === undefined
            ? [...state.cart, targetBook]
            : [...state.cart],
      };
    //addCartFromLocalStorage
    case "addCartFromLocalStorage":
      return {
        ...state,
        cart: action.cartItems,
      };
    case "DeleteBookFromCart":
      return {
        ...state,
        cart: state.cart.filter((item: any) => item._id !== action.payload.id),
      };
    case "deleteAllBooksFromCart":
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
};
