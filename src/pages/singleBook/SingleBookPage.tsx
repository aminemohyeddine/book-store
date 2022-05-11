import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  useMediaQuery,
  Center,
  Divider,
  Spinner,
  Image,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { BookI } from "../../constants/interfaces";
import { StarIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getBook } from "../../redux/actions/booksActions.ts/booksActions";
import ImageComponent from "../../tags/Image";
import "./singleBookPage.css";
import {
  addBookToCart,
  DeleteBookFromCart,
} from "../../redux/actions/cartActions/cartActions";

import { RootState } from "../../redux/store";

interface Props {}

const SingleBook: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { bookId } = useParams();
  const starsLimit = 5;

  const [imageIndex, setImageIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const stateData: any = useSelector((state: RootState) => state.Books);
  const books: BookI[] = stateData.booksData;

  const state: any = useSelector((state: RootState) => state.Books);
  const book: BookI = state.singleBook[0];

  const cookies = new Cookies();
  const loginStatus = cookies.get("login");
  const [isLargerThan868] = useMediaQuery("(min-width: 955px)");

  useEffect(() => {
    if (books.length === 0) {
    } else {
      dispatch(getBook(bookId));
      setLoading(false);
    }
  }, [books, bookId, dispatch]);

  return (
    <>
      {loginStatus !== "success" ? (
        <Box
          bg="#ffffff"
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="90vh"
          w="100%"
        >
          login first
        </Box>
      ) : (
        <>
          {loading ? (
            <Box
              color="white"
              bg="#ffffff"
              display="flex"
              alignItems="center"
              justifyContent="center"
              h="90vh"
              w="100%"
            >
              <Spinner
                color="#329693"
                size="xl"
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
              />
            </Box>
          ) : (
            <Box
              pl={isLargerThan868 ? "200px" : "0px"}
              pt={isLargerThan868 ? "100px" : "20px"}
              pb="30px"
              bg="#ffffff"
              display="flex"
              width="100%"
              minHeight="90vh"
              flexDirection={isLargerThan868 ? "row" : "column"}
            >
              <Box
                mr="30px"
                w={isLargerThan868 ? "300px" : "100%"}
                display={isLargerThan868 ? "" : "flex"}
                flexDirection={isLargerThan868 ? "row" : "column"}
                alignItems={isLargerThan868 ? "" : "center"}
              >
                <Box height="300px" width="300px" position="relative">
                  <img
                    alt="image2"
                    height="300px"
                    width="300px"
                    src={book.image}
                  />
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems={!isLargerThan868 ? "center" : ""}
                justifyContent={!isLargerThan868 ? "center" : ""}
              >
                <Text
                  mt="10px"
                  cursor="pointer"
                  fontSize={isLargerThan868 ? "32px" : "20px"}
                  fontFamily="GT Super Bold, serif"
                  letterSpacing="1.5px"
                  fontWeight="bold"
                >
                  {book.name}
                </Text>
                <Box mt="20px" display="flex">
                  <Text
                    _hover={{ color: "#2e9894" }}
                    cursor="pointer"
                    fontSize="1xl"
                  >
                    {book.category} (category)
                  </Text>
                  <Center mt="8px" mr="10px" ml="10px" height="14px">
                    <Divider bg="#2e9894" orientation="vertical" />
                  </Center>
                  <Text
                    _hover={{ color: "#2e9894" }}
                    cursor="pointer"
                    fontSize="1xl"
                    // color=""
                  >
                    {book.author} (Author)
                  </Text>
                </Box>
                <Box display="flex" mt="7px">
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
                <Text
                  minWidth={isLargerThan868 ? "500px" : "300px"}
                  mt="20px"
                  w="70%"
                  fontSize="1xl"
                >
                  {book.description.substring(0, 500)}
                </Text>
                <Box display="flex" mt="20px" w="70%" fontSize="1xl">
                  <Text>Language</Text>
                  {book.language === "English" ? (
                    <Image
                      ml="20px"
                      cursor="pointer"
                      height="30px"
                      width="20px"
                      src={
                        "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
                      }
                      alt="Dan Abramov"
                    />
                  ) : (
                    <Text>{book.language}</Text>
                  )}
                </Box>

                <Text mt="20px" w="70%" fontSize="1xl">
                  {book.pagesNumber} page
                </Text>
                <Box
                  display="flex"
                  w="700px"
                  // pl="120px"
                  mt="50px"
                  alignItems="center"
                  // bg="green"
                >
                  <Text
                    bg="pink"
                    borderRadius="50px"
                    p="5px"
                    fontSize="2xl"
                    mr="100px"
                  >
                    {book.price} {book.currency}
                  </Text>
                  <button
                    onClick={() => {
                      dispatch(addBookToCart(book._id, books));
                    }}
                    className="cta"
                  >
                    <span>Add To Cart</span>
                    <svg viewBox="0 0 13 10" height="10px" width="15px">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </button>
                  <button className="cta">
                    <span>Buy Book Now</span>
                    <svg viewBox="0 0 13 10" height="10px" width="15px">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </button>
                </Box>
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default SingleBook;
