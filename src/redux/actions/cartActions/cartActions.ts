import { Dispatch } from "react";

export const addBookToCart = (id: string, books: any) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: "addBookToCart",
      payload: { id, books },
    });
  };
};

export const DeleteBookFromCart = (id: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: "DeleteBookFromCart",
      payload: { id },
    });
  };
};

export const deleteAllBooksFromCart = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: "deleteAllBooksFromCart",
    });
  };
};

export const addCartFromLocalStorage = (cartItems: any) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: "addCartFromLocalStorage",
      cartItems,
    });
  };
};
