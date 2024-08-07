import { SimpleCard } from "../components/SimpleCard";
import ButtonAddTask from "../components/ButtonAddTask";
import { useState } from "react";
import { SimpleCardPlaceholder } from "../components/CardPlaceholder";
import { NavbarSimple } from "../components/Navbar";
const tasks = [
  {
    title: "Help cook dinner @ 9pm",
    desc: "Dice onion first and let it marinade for 30 minutes",
    id: 1,
  },
  {
    title: " Task 2",
    desc: "Velit vitae sapien, placerat elit suspendisse, convallis rhoncus praesent duis. Etiam feugiat etiam, morbi integer ullamcorper, tellus aenean tellus nunc. Metus pellentesque in, dignissim massa suscipit, imperdiet ac nam consequat. Ac penatibus tempor, arcu ut odio, a ultricies dapibus ultrices. Eu in praesent, gravida posuere suspendisse, pulvinar eu leo ante.",
    id: 2,
  },
];

export default function HomePage() {
  const [task, setTask] = useState(tasks);
  const [taskPlaceholder, setTaskPlaceholder] = useState(false);

  function handleAddTask(task: { title: string; desc: string; id: number }) {
    setTask((tasks) => [...tasks, task]);
  }
  function handleDeleteTask(id: number): void {
    setTask((tasks) => tasks.filter((task) => task.id !== id));
  }
  return (
    <div
      className="flex flex-col min-h-screen bg-fixed"
      // style={{
      //   backgroundImage: `url(https://www.color-hex.com/palettes/24678.png)`,
      // }}
    >
      <NavbarSimple />
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {task.length > 0 ? (
          task.map((task) => (
            <SimpleCard task={task} onDeleteTask={handleDeleteTask} />
          ))
        ) : (
          <SimpleCardPlaceholder
            task={task}
            onAddTask={handleAddTask}
            onCancel={setTaskPlaceholder}
          />
        )}

        {taskPlaceholder && (
          <SimpleCardPlaceholder
            task={task}
            onAddTask={handleAddTask}
            onCancel={setTaskPlaceholder}
          />
        )}

        {task.length > 0 && !taskPlaceholder ? (
          <div className="relative">
            <div
              className="absolute bottom-0 right-0 transform translate-x-11 translate-y-1"
              onClick={() => setTaskPlaceholder(true)}
            >
              <ButtonAddTask />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
