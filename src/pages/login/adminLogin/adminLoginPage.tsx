import React from "react";
import {
  FormControl,
  FormErrorMessage,
  Box,
  Button,
  Input,
  useToast,
  Text,
  useMediaQuery,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { changeTrackLogIn } from "../../../redux/actions/loginActions/loginActions";
import axios from "axios";

import {
  userLoggedOut,
  deleteUserDetails,
  loginMode,
  userLoggedInn,
} from "../../../redux/actions/loginActions/loginActions";
import {
  getAllBooks,
  searchBook,
} from "../../../redux/actions/booksActions.ts/booksActions";

const AdminLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const cookies = new Cookies();

  const logoutHandler = () => {
    dispatch(deleteUserDetails());
    dispatch(userLoggedOut());
    cookies.remove("userId", { path: "/" });
    cookies.remove("userToken", { path: "/" });
    cookies.remove("googleUser", { path: "/" });
    cookies.set("login", "failed", { path: "/" });
    dispatch(getAllBooks([]));
    dispatch(loginMode(""));
  };

  const loginHandler = () => {
    dispatch(userLoggedOut());
    cookies.set("login", "success", { path: "/" });
    cookies.set("adminLoogedin", true, { path: "/" });

    window.location.href = "/editbooks";
  };

  const [adminDetails, setAdminDetails] = React.useState({
    name: "",
    password: "",
  });

  const submitAdminLogin = async () => {
    const loginResponse = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}auth/adminsignin`,
      {
        userName: adminDetails.name,
        password: adminDetails.password,
        isAdmin: true,
      }
    );

    if (loginResponse.data.success === true) {
      console.log("login func");
      cookies.set("userToken", loginResponse.data.token, { path: "/" });
      cookies.set("userId", loginResponse.data._id, { path: "/" });
      cookies.set("login", "success", { path: "/" });
      cookies.set("loginMode", "admin", { path: "/" });
      dispatch(userLoggedInn());
      dispatch(changeTrackLogIn());
      dispatch(loginMode("admin"));
      navigate("/admin/books");
    } else {
      console.log("login error");
    }
  };

  return (
    <Box
      h="90vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="100%"
    >
      <Box
        h="50vh"
        w="50%"
        border="1px solid black"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minWidth="350px"
      >
        <Input
          placeholder="name"
          w="80%"
          mb="20px"
          onChange={(e) => {
            setAdminDetails({ ...adminDetails, name: e.target.value });
          }}
          type="text"
        />
        <Input
          w="80%"
          mb="20px"
          placeholder="password"
          type="password"
          onChange={(e) => {
            setAdminDetails({ ...adminDetails, password: e.target.value });
          }}
        />
        <Button onClick={() => submitAdminLogin()} w="80%">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AdminLoginPage;
