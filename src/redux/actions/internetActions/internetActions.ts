import { BooksConst } from "../../constants/booksConstants";
import { BookI } from "../../../constants/interfaces";
import { Dispatch } from "react";

export const userConnected = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: "userConnected",
    });
  };
};

export const userNotConnected = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: "userNotConnected",
    });
  };
};
