import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import ImageComponent from "../../tags/Image";
import { BookI } from "../../constants/interfaces";
import { addBookToCart } from "../../redux/actions/cartActions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useToast } from "@chakra-ui/react";

var cartImage = require("../../assets/istockphoto-1206806317-612x612.jpg");

interface Props {
  book: BookI;
}

const Book: React.FC<Props> = ({ book }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const booksState: any = useSelector((state: RootState) => state.Books);
  const allBooks: BookI[] = booksState.booksData;

  const starsLimit = 5;
  const link = "/book/" + book._id;
  return (
    <Box
      position="relative"
      mr="5px"
      w="241px"
      borderRadius="10px"
      bg="white"
      height="fit-content"
      pb="10px"
    >
      <Link to={link}>
        <Image
          height="35vh"
          width="100%"
          src={book.image}
          alt="Dan Abramov"
          borderRadius="10px 10px 0px 0px"
        />
      </Link>
      <Link to={link}>
        <Text
          pt={book.name.length < 25 ? "20px" : "0px"}
          height="70px"
          _hover={{ color: "#329793" }}
          pl="10px"
          pr="10px"
          cursor="pointer"
        >
          {book.name.substring(0, 50)}
          {book.name.length > 55 && <span>...</span>}
        </Text>
      </Link>
      <Text color="#565959" fontSize="15px" pl="10px" pr="10px">
        By : {book.author}
      </Text>
      <Box display="flex" pl="10px" pr="10px" mt="7px">
        {[...Array(starsLimit)].map((elementInArray, index) => (
          <Box key={index}>
            {index + 1 < book.rating ? (
              <>
                <StarIcon key={index} color="yellow" />
              </>
            ) : (
              <>
                <StarIcon key={index} color="#e8e8e8" />
              </>
            )}
          </Box>
        ))}
      </Box>
      <Box alignItems="center" display="flex" pl="10px" pr="10px">
        <Text fontWeight="bold">
          {book.price}
          {book.currency} {"   "}
        </Text>
        <Text
          fontWeight="bold"
          textDecoration="line-through"
          fontSize="12px"
          color="red"
          verticalAlign="middle"
        >
          {"   "} / {"   "}
          {book.price + 8}
          {book.currency}
        </Text>
        &nbsp; &nbsp;
        <ImageComponent
          style={{ cursor: "pointer" }}
          height="30px"
          width="20px"
          src={
            "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
          }
          alt="Dan Abramov"
        />
      </Box>
      <Text cursor="pointer" fontSize="12px" pl="10px" pr="10px">
        {book.category}
      </Text>
      <Box position="relative">
        <Image
          bottom="20px"
          right="20px"
          h="40px"
          w="40px"
          cursor="pointer"
          position="absolute"
          src={cartImage}
          alt="cart image"
          onClick={() => {
            dispatch(addBookToCart(book._id, allBooks));
            // toast({
            //   title: "Book added To Cart",
            //   description: "We've Added Your Book To Cart",
            //   status: "success",
            //   duration: 9000,
            //   isClosable: true,
            // });
          }}
        />
      </Box>
    </Box>
  );
};

export default Book;
