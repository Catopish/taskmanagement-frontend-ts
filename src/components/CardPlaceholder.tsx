import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Textarea,
  Input,
} from "@material-tailwind/react";

export function SimpleCardPlaceholder() {
  return (
    <Card className=" mt-6 w-96 flex-wrap">
      <CardBody>
        <div className="flex w-72 flex-col gap-6">
          <Input
            crossOrigin=""
            variant="standard"
            label="Title"
            placeholder="Write what you gonna do!"
          />
          <Textarea variant="outlined" label="Describe your task!" />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Add Task</Button>
      </CardFooter>
    </Card>
  );
}
