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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage, setSuccessMessage } from "../features/authSlice";
import { RootState } from "../store";
import { Link } from "react-router-dom";

export function SignUpCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  async function handleSignUp() {
    try {
      const response = await axios.post("/api/auth/signup", {
        username,
        password,
      });
      dispatch(setSuccessMessage(response.statusText));
      // console.log(response.status, response.statusText);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          dispatch(setErrorMessage(error.response.data.message[0]));
          // console.log(error.response.data.message[0]);
        } else {
          dispatch(setErrorMessage("an error occured.."));
        }
      }
    }
  }
  const headerColor = auth.successMessage !== "" ? "green" : "gray";

  const headerMessage =
    auth.successMessage !== "" ? auth.successMessage : auth.errorMessage;

  return (
    <Card className="w-96">
      <CardHeader
        variant="gradient"
        color={headerColor}
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign Up
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        {auth.errorMessage !== "" && <Alert color="red">{headerMessage}</Alert>}
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
