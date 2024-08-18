import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useState } from "react";
import axios, { AxiosError } from "axios";

import { Tasks } from "../interface/tasks.interface";
import { TaskStatus } from "../interface/taskStatus.enum";
import { useSelector } from "react-redux";
import { RootState } from "../store";
const collapsedNumWord = 10;

interface SimpleCardProps {
  task: Tasks;
  onDeleteTask: (id: number) => void;
}

export function SimpleCard({ task, onDeleteTask }: SimpleCardProps) {
  const [done, setDone] = useState(task.status);
  const [collapsedOrNot, setCollapseOrNot] = useState(true);
  const { title, description: desc } = task;

  const jwtToken = useSelector((state: RootState) => state.jwt.jwt);

  const collapsed = desc.split(" ").length > collapsedNumWord;
  const displayText = collapsed
    ? desc.split(" ").slice(0, collapsedNumWord).join(" ") + "..."
    : desc;

  async function handleUpdateTaskStatus() {
    try {
      //NOTE: not login
      if (!jwtToken) {
        done === TaskStatus.DONE
          ? setDone(TaskStatus.OPEN)
          : setDone(TaskStatus.DONE);
      }

      //NOTE: not Changing to done
      if (done === TaskStatus.OPEN) {
        await axios.patch(
          `/api/tasks/${task.id}/status`,
          {
            status: TaskStatus.DONE,
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          },
        );
        setDone(TaskStatus.DONE);
        console.log("DONE");
      }

      //NOTE: not Changing to Open
      if (done === TaskStatus.DONE) {
        await axios.patch(
          `/api/tasks/${task.id}/status`,
          {
            status: TaskStatus.OPEN,
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          },
        );
        setDone(TaskStatus.OPEN);
        console.log("OPEN");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  }

  return (
    <Card className=" mt-6 w-96 flex-wrap animate-slideInRight">
      <CardBody
        className={
          done === TaskStatus.DONE ? "line-through decoration-red-900" : ""
        }
      >
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
              color={done === TaskStatus.DONE ? "deep-orange" : "green"}
              className="rounded-full "
              onClick={handleUpdateTaskStatus}
            >
              <i
                className={
                  done === TaskStatus.DONE
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
