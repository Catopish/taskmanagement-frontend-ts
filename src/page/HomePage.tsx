import { SimpleCard } from "../components/SimpleCard";
import ButtonAddTask from "../components/ButtonAddTask";
import { useCallback, useState } from "react";
import { SimpleCardPlaceholder } from "../components/CardPlaceholder";
import { NavbarSimple } from "../components/Navbar";
import { Tasks } from "../interface/tasks.interface";
import { Outlet } from "react-router-dom";

interface MainBodyProps {
  handleAddTask: (task: Tasks) => void;
  handleDeleteTask: (id: number) => void;
  isLogin: boolean;
  isTaskPlaceholderVisible: boolean;
  setIsTaskPlaceholderVisible: (value: boolean) => void;
  task: Tasks[];
}

const tasks: Tasks[] = [
  {
    title: "Help cook dinner @ 9pm",
    description: "Dice onion first and let it marinade for 30 minutes",
    id: 1,
  },
  {
    title: " Task 2",
    description:
      "Velit vitae sapien, placerat elit suspendisse, convallis rhoncus praesent duis. Etiam feugiat etiam, morbi integer ullamcorper, tellus aenean tellus nunc. Metus pellentesque in, dignissim massa suscipit, imperdiet ac nam consequat. Ac penatibus tempor, arcu ut odio, a ultricies dapibus ultrices. Eu in praesent, gravida posuere suspendisse, pulvinar eu leo ante.",
    id: 2,
  },
];

export default function HomePage() {
  const [task, setTask] = useState<Tasks[]>(tasks);
  const [isTaskPlaceholderVisible, setIsTaskPlaceholderVisible] =
    useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const handleAddTask = useCallback((task: Tasks) => {
    setTask((tasks) => [...tasks, task]);
  }, []);

  const handleDeleteTask = useCallback((id: number) => {
    setTask((tasks) => tasks.filter((task) => task.id !== id));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-fixed">
      {/* NOTE: Navbar */}
      <NavbarSimple handleLogin={setIsLogin} isLogin={isLogin} />

      {/* NOTE: Nampilin login/signup */}
      {isLogin ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Outlet />
        </div>
      ) : null}

      {/* NOTE: Main Body */}
      <MainBody
        handleAddTask={handleAddTask}
        handleDeleteTask={handleDeleteTask}
        isLogin={isLogin}
        isTaskPlaceholderVisible={isTaskPlaceholderVisible}
        setIsTaskPlaceholderVisible={setIsTaskPlaceholderVisible}
        task={task}
      />
    </div>
  );
}

function MainBody({
  handleAddTask,
  handleDeleteTask,
  isLogin,
  isTaskPlaceholderVisible,
  setIsTaskPlaceholderVisible,
  task,
}: MainBodyProps) {
  return (
    <>
      <div
        className={`flex flex-wrap justify-center gap-4 mt-4 ${isLogin ? "blur-sm" : ""}`}
      >
        {task.length > 0 ? (
          task.map((task) => (
            <SimpleCard
              task={task}
              onDeleteTask={handleDeleteTask}
              key={task.id}
            />
          ))
        ) : (
          <SimpleCardPlaceholder
            hasTasks={task.length > 0}
            onAddTask={handleAddTask}
            onCancel={() => setIsTaskPlaceholderVisible(false)}
          />
        )}

        {isTaskPlaceholderVisible && (
          <SimpleCardPlaceholder
            hasTasks={task.length > 0}
            onAddTask={handleAddTask}
            onCancel={() => setIsTaskPlaceholderVisible(false)}
          />
        )}

        {task.length > 0 && !isTaskPlaceholderVisible && (
          <>
            <div className="relative hidden sm:block">
              <div
                className="absolute bottom-0 right-0 transform translate-x-11 translate-y-1"
                onClick={() => setIsTaskPlaceholderVisible(true)}
              >
                <ButtonAddTask />
              </div>
            </div>
            <div
              className="w-full sm:hidden mt-4"
              onClick={() => setIsTaskPlaceholderVisible(true)}
            >
              <ButtonAddTask />
            </div>
          </>
        )}
      </div>
    </>
  );
}
