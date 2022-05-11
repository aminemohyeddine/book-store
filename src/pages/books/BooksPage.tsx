import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BookI } from "../../constants/interfaces";
import { Box, Text, Spinner } from "@chakra-ui/react";
import Cookies from "universal-cookie";
import Book from "./Book";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/store";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./booksPage.css";

interface Props {}

const Books: React.FC<Props> = () => {
  const cookies = new Cookies();
  let loginStatus = cookies.get("login");

  const bookState: any = useSelector((state: RootState) => state.Books);
  const books: BookI[] = bookState.booksData;

  useEffect(() => {
    loginStatus = cookies.get("login");
  }, [loginStatus]); //eslint-disable-line

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1120, min: 464 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 870, min: 625 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 625, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      {books.length === 0 && loginStatus === "success" && (
        <Box
          color="white"
          bg="#bee2f8"
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
      )}
      {loginStatus === "success" && books.length > 0 && (
        <Box bg="#ffffff" p="50px" minHeight="90vh">
          <Box>
            <Text fontSize="3xl" mb="20px">
              New Books :{" "}
            </Text>
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={false}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              keyBoardControl={true}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {books?.map((book: any, key: any) => (
                <Box key={key}>
                  <Book book={book} key={key} />
                </Box>
              ))}
            </Carousel>
          </Box>
          <Box mt="40px">
            <Text fontSize="3xl" mb="20px">
              Top Selling :{" "}
            </Text>
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={false}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              keyBoardControl={true}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {books?.map((book: any, key: any) => (
                <Box key={key}>
                  <Book book={book} key={key} />
                </Box>
              ))}
            </Carousel>
          </Box>
        </Box>
      )}
      {loginStatus !== "success" && (
        <Box p="50px" minHeight="90vh" bg="#bee2f8">
          <Link to="/login">
            <Text
              _hover={{ color: "#2b9895" }}
              fontSize="3xl"
              w="100%"
              textAlign="center"
            >
              login first
            </Text>
          </Link>
        </Box>
      )}
    </>
  );
};

export default Books;
