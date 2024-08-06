import { NavbarWithMegaMenu } from "../components/Navbar";
import { SimpleCard } from "../components/Card";
import ButtonAddTask from "../components/ButtonAddTask";
import { useState } from "react";
import { SimpleCardPlaceholder } from "../components/CardPlaceholder";

const tasks = [
  {
    title: "Bantu bapaks",
    desc: "pake mobil",
  },
];

export default function HomePage() {
  const [task, setTask] = useState([]);
  const [taskPlaceholder, setTaskPlaceholder] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarWithMegaMenu />
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {/* {task.length>0 ? task.map((task) => <SimpleCard task={task} />)} */}
        {task?.map((task) => <SimpleCard task={task} />)}

        <SimpleCardPlaceholder />

        {task.length > 0 ? (
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
