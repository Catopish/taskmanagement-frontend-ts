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
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setJwtToken } from "../features/jwtTokenslice";
import { setErrorMessage, setSuccessMessage } from "../features/authSlice";
import { RootState } from "../store";

export function SignInCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(function () {
    dispatch(setErrorMessage(""));
    dispatch(setSuccessMessage(""));
  }, []);

  async function handleSignIn() {
    try {
      const response = await axios.post("/api/auth/signin", {
        username,
        password,
      });
      dispatch(setJwtToken(response.data.accessToken));
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          console.log(error.response?.data.message, error.response?.status);
          dispatch(setErrorMessage(error.response?.data.message));
        } else {
          dispatch(setErrorMessage("Something went wrong"));
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
          Sign In
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
        <Button variant="gradient" fullWidth onClick={handleSignIn}>
          Sign In
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Don&apos;t have an account?
          <Link to="/signup">
            <Typography
              as="a"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              Sign up
            </Typography>
          </Link>
        </Typography>
      </CardFooter>
    </Card>
  );
}
