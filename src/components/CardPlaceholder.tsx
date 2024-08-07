import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Textarea,
  Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

export function SimpleCardPlaceholder({ task, onAddTask, onCancel }) {
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  function AddTask() {
    if (newTitle === "") {
      alert("Title must be filled");
      return;
    }
    const newItem = { title: newTitle, desc: newDesc, id: task.length + 1 };
    onAddTask(newItem);

    setNewTitle("");
    setNewDesc("");
    onCancel(false);
  }

  useEffect(
    function () {
      function CallBack(e) {
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
    <Card className=" mt-6 w-96 flex-wrap">
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
          {task.length > 0 && (
            <Button onClick={() => onCancel(false)}>Cancel</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
