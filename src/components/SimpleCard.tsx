import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";

export function SimpleCard({ task, onDeleteTask }) {
  const [done, setDone] = useState(false);
  const { title, desc } = task;
  return (
    <Card className=" mt-6 w-96 flex-wrap">
      <CardBody className={done ? "line-through decoration-red-900" : ""}>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>{desc}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <div className="flex gap-6">
          <Button>Read More</Button>
          <IconButton
            color={done ? "deep-orange" : "green"}
            className="rounded-full flex-wrap-reverse"
            onClick={() => setDone(!done)}
          >
            <i
              className={
                done
                  ? "fa-solid fa-rotate-left"
                  : "fa-duotone fa-solid fa-check"
              }
            />
          </IconButton>
          <IconButton
            color="red"
            className="rounded-full flex-wrap-reverse"
            onClick={() => onDeleteTask(task.id)}
          >
            <i className="fa-solid fa-trash" />
          </IconButton>
        </div>
      </CardFooter>
    </Card>
  );
}
