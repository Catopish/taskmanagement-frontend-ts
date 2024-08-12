import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

export function SignUpCard() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
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
          <Input crossOrigin="" label="Username" size="lg" />
          <Input crossOrigin="" label="Password" size="lg" />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth>
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
