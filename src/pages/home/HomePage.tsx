import React from "react";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { BookI } from "../../constants/interfaces";
import Cookies from "universal-cookie";
import BookInList from "./components/BookInList";
import ImageComponent from "../../tags/Image";
import BooksPlans from "./components/BooksPlans";

var Background = require("../../assets/My project.png");

const Home = () => {
  const cookies = new Cookies();
  const [isLargerThan560] = useMediaQuery("(min-width: 560px)");

  const loginStatus = cookies.get("login");

  const booksState: any = useSelector((state: RootState) => state.Books);
  const booksList: BookI[] = booksState.booksData;

  return (
    <Box minHeight="90vh" width="100%" backgroundColor="black">
      <Box position="sticky" top="10vh" zIndex="10">
        <Carousel
          showThumbs={false}
          emulateTouch={true}
          autoPlay={true}
          infiniteLoop={true}
        >
          <ImageComponent
            alt="image2"
            style={{ zIndex: "0" }}
            width="100%"
            height="90vh"
            src="https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2022/04/07/Gateway_Audiobooks.jpg"
          />

          <ImageComponent
            alt="image1"
            style={{ zIndex: "0" }}
            width="100%"
            height="90vh"
            src="https://dispatch.barnesandnoble.com/content/dam/ccr/homepage/daily/2022/03/29/Gateway_Quote_A4_03-29.jpg"
          />
        </Carousel>
      </Box>
      <Box
        minHeight="90vh"
        zIndex="80"
        position="sticky"
        backgroundColor="#B2F5EA"
        style={{
          backgroundImage: `url("https://i.ibb.co/CPtHc5J/My-project.png")`,
        }}
        top="10vh"
      >
        {/* <Image src={Image} /> */}
        {loginStatus !== "success" ? (
          <Box
            height="90vh"
            w="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Link to="/login">
              <Text
                color="grey"
                w="100%"
                textAlign="center"
                _hover={{ color: "#369493" }}
                fontSize={isLargerThan560 ? "2xl" : "xl"}
              >
                Login to access to our books!
              </Text>
            </Link>
          </Box>
        ) : (
          <>
            <Text
              w="100%"
              textAlign="center"
              mt="20px"
              mb="40px"
              fontSize="2xl"
              cursor="pointer"
              paddingTop="40px"
              color="white"
              textShadow="1px 0 0 #329793, 0 -1px 0 #329793, 0 1px 0 #329793, -1px 0 0 #329793"
            >
              We Give You The Access To Undless Books
            </Text>
            <Box
              w="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box flexWrap="wrap" justifyContent="center" display="flex">
                {booksList.slice(0, 5)?.map((book, key) => (
                  <Box key={key}>
                    <BookInList book={book} />
                  </Box>
                ))}
              </Box>
            </Box>
          </>
        )}
      </Box>

      <BooksPlans />
    </Box>
  );
};

export default Home;
