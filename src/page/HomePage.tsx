import { NavbarWithMegaMenu } from "../components/Navbar";
import { SimpleCard } from "../components/Card";
import ButtonAddTask from "../components/ButtonAddTask";
import { useState } from "react";

const tasks = [
  {
    title: "Bantu bapaks",
    desc: "pake mobil",
  },
];

export default function HomePage() {
  const [task, setTask] = useState(tasks);
  return (
    <div className="flex flex-col">
      <NavbarWithMegaMenu />
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {task?.map((task) => <SimpleCard task={task} />)}

        <div className="relative">
          <div className="absolute bottom-0 right-0 transform translate-x-11 translate-y-1">
            <ButtonAddTask />
          </div>
        </div>
      </div>
    </div>
  );
}
