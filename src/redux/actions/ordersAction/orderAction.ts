import { Dispatch } from "react";

export const addAddressDetailsCheckout = (addressDetails: any) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: "addCheckoutAddress",
      payload: { addressDetails },
    });
  };
};

export const addBooksCheckout = (Books: any) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: "addCheckoutBooks",
      payload: { Books },
    });
  };
};
