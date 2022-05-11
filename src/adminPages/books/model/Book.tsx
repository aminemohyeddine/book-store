import React from "react";
import { Box, Text, Image, Icon } from "@chakra-ui/react";
import { StarIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import ImageComponent from "../../../tags/Image";
import { BookI } from "../../../constants/interfaces";
import {
  deleteBook,
  bookStateHasChanged,
} from "../../../redux/actions/booksActions.ts/booksActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

import {
  DeleteBookFromCart,
  deleteAllBooksFromCart,
} from "../../../redux/actions/cartActions/cartActions";

var cartImage = require("../../../assets/istockphoto-1206806317-612x612.jpg");

interface Props {
  book: BookI;
}

const Book: React.FC<Props> = ({ book }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const booksState: any = useSelector((state: RootState) => state.Books);
  const allBooks: BookI[] = booksState.booksData;

  React.useEffect(() => {
    dispatch(bookStateHasChanged());
  }, []);

  const starsLimit = 5;

  return (
    <Box
      position="relative"
      mr="5px"
      w="200px"
      borderRadius="10px"
      bg="white"
      height="fit-content"
      pb="10px"
    >
      <Link to={`/admin/books/modify/${book._id}`}>
        <Image
          height="40vh"
          width="100%"
          src={book.image}
          alt="Dan Abramov"
          borderRadius="10px 10px 0px 0px"
        />
      </Link>
      <Box display="flex">
        <Box
          alignItems="center"
          justifyContent="center"
          h="5vh"
          display="flex"
          bg="red"
          w="50%"
          cursor="pointer"
          onClick={async () => {
            const response = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}books/deletebookbyid?id=${book._id}`
            );
            dispatch(deleteBook(book._id));
            //

            // toast({
            //   title: "Book added To Cart",
            //   description: "We've Added Your Book To Cart",
            //   status: "success",
            //   duration: 9000,
            //   isClosable: true,
            // });
          }}
        >
          <Text mr="8px" color="white" fontSize="xs">
            Delete Book
          </Text>
          <Icon color="white" fontSize="xs" as={DeleteIcon} />
        </Box>

        <Box
          alignItems="center"
          justifyContent="center"
          h="5vh"
          display="flex"
          bg="green"
          w="50%"
          cursor="pointer"
        >
          <Text mr="8px" color="white" fontSize="xs">
            ModifyBook
          </Text>

          <Icon color="white" fontSize="xs" as={EditIcon} />
        </Box>

        {/* <Box position="relative">
        <Icon
          as={DeleteIcon}
          top="-290px"
          right="20px"
          color="yellow"
          h="20px"
          w="20px"
          cursor="pointer"
          position="absolute"
          src={cartImage}
          alt="cart image"
          onClick={async () => {
            const response = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}books/deletebookbyid?id=${book._id}`
            );
            dispatch(deleteBook(book._id));
            //

            // toast({
            //   title: "Book added To Cart",
            //   description: "We've Added Your Book To Cart",
            //   status: "success",
            //   duration: 9000,
            //   isClosable: true,
            // });
          }}
        />
      </Box> */}
      </Box>
    </Box>
  );
};

export default Book;
