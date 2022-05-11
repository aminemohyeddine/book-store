export const orderReducer = (state = { checkoutDetails: [] }, action: any) => {
  switch (action.type) {
    case "addCheckoutAddress":
      return {
        ...state,
        checkoutDetails: [{ adress: action.payload.addressDetails }],
      };

    case "addCheckoutBooks":
      return {
        ...state,
        checkoutDetails: [
          ...action.payload.checkoutDetails,
          { books: action.payload.books },
        ],
      };

    default:
      return state;
  }
};
