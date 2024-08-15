import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";

export function SignUpCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp() {
    axios
      .post("/api/auth/signup", {
        username,
        password,
      })
      .then((response) => {
        console.log(response);
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
          Sign Up
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
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
      </CardFooter>
    </Card>
  );
}
