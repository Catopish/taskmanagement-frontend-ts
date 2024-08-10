import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";
import { Tasks } from "../interface/tasks.interface";
const collapsedNumWord = 10;

interface SimpleCardProps {
  task: Tasks;
  onDeleteTask: (id: number) => void;
}

export function SimpleCard({ task, onDeleteTask }: SimpleCardProps) {
  const [done, setDone] = useState(false);
  const [collapsedOrNot, setCollapseOrNot] = useState(true);
  const { title, description: desc } = task;
  const collapsed = desc.split(" ").length > collapsedNumWord;
  const displayText = collapsed
    ? desc.split(" ").slice(0, collapsedNumWord).join(" ") + "..."
    : desc;

  return (
    <Card className=" mt-6 w-96 flex-wrap animate-slideInRight">
      <CardBody className={done ? "line-through decoration-red-900" : ""}>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography>{desc && collapsedOrNot ? displayText : desc}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <div className="flex gap-6 flex-row justify-between">
          {desc && collapsed ? (
            <Button
              className="self-start"
              onClick={() => setCollapseOrNot(!collapsedOrNot)}
            >
              {collapsedOrNot ? "Read More" : "Collapse"}
            </Button>
          ) : null}
          <div className="flex gap-6">
            <IconButton
              color={done ? "deep-orange" : "green"}
              className="rounded-full "
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
              className="rounded-full "
              onClick={() => onDeleteTask(task.id)}
            >
              <i className="fa-solid fa-trash" />
            </IconButton>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
