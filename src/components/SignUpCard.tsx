import axios, { AxiosError } from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Alert,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage, setSuccessMessage } from "../features/authSlice";
import { RootState } from "../store";
import { Link } from "react-router-dom";

export function SignUpCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(
    function () {
      dispatch(setErrorMessage(""));
      dispatch(setSuccessMessage(""));
    },
    [dispatch],
  );
  async function handleSignUp() {
    try {
      const response = await axios.post("/api/auth/signup", {
        username,
        password,
      });
      dispatch(setSuccessMessage(response.statusText));
      // console.log("1");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          dispatch(setErrorMessage(error.response.data.message[0]));
          // console.log("2");
        } else if (error.response?.status === 409) {
          // console.log("3");
          dispatch(setErrorMessage(error.response?.data.message));
        } else {
          dispatch(setErrorMessage("Something went wrong"));
          // console.log("4");
        }
      }
    }
  }

  const headerMessage =
    auth.successMessage !== "" ? auth.successMessage : auth.errorMessage;

  return (
    <Card className="w-96">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign Up
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        {/* NOTE: Nampilin message */}
        {auth.successMessage || auth.errorMessage ? (
          <Alert color={auth.successMessage !== "" ? "green" : "red"}>
            {headerMessage}
          </Alert>
        ) : null}
        <Input
          crossOrigin=""
          label="Username"
          size="lg"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          crossOrigin=""
          label="Password"
          size="lg"
          onChange={(e) => setPassword(e.target.value)}
        />
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth onClick={handleSignUp}>
          Sign Up
        </Button>
        <Link to="/signin">
          <Typography
            as="a"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            Back to SignIn
          </Typography>
        </Link>
      </CardFooter>
    </Card>
  );
}
