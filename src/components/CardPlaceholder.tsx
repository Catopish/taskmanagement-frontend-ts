import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Textarea,
  Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Tasks } from "../interface/tasks.interface";
import { TaskStatus } from "../interface/taskStatus.enum";

interface CardholderProps {
  onAddTask: (task: Tasks) => void;
  onCancel: (val: boolean) => void;
  hasTasks: boolean;
}
export function SimpleCardPlaceholder({
  onAddTask,
  onCancel,
  hasTasks,
}: CardholderProps) {
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  function AddTask() {
    if (newTitle === "") {
      alert("Title must be filled");
      return;
    }
    const newItem: Tasks = {
      title: newTitle,
      description: newDesc,
      id: Date.now(),
      status: TaskStatus.OPEN,
    };
    onAddTask(newItem);

    setNewTitle("");
    setNewDesc("");
    onCancel(false);
  }

  useEffect(
    function () {
      function CallBack(e: KeyboardEvent) {
        if (e.code === "Enter") {
          AddTask();
        }
      }

      document.addEventListener("keydown", CallBack);

      return function () {
        document.removeEventListener("keydown", CallBack);
      };
    },
    [AddTask],
  );

  return (
    <Card className=" mt-6 w-96 flex-wrap animate-slideInRight">
      <CardBody className="flex w-72 flex-col gap-6">
        <Input
          crossOrigin=""
          variant="standard"
          label="Title"
          placeholder="Write what you gonna do!"
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <Textarea
          variant="outlined"
          label="Describe your task!"
          onChange={(e) => setNewDesc(e.target.value)}
        />
      </CardBody>
      <CardFooter className="pt-0">
        <div className="flex gap-6">
          <Button onClick={AddTask}>Add Task</Button>
          {hasTasks && <Button onClick={() => onCancel(false)}>Cancel</Button>}
        </div>
      </CardFooter>
    </Card>
  );
}
