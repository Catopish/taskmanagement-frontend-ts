import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function SignInCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    axios
      .post("/api/auth/signin", {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data.accessToken);
      })
      .catch((error) => {
        console.log(error.message, error.code);
      });
  }
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
        <Input
          crossOrigin=""
          label="Email"
          size="lg"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          crossOrigin=""
          label="Password"
          size="lg"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="-ml-2.5">
          <Checkbox crossOrigin="" label="Remember Me" />
        </div>
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
