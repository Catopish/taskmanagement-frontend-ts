//NOTE: Modules
import { useCallback, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";

//NOTE: Components
import { SimpleCard } from "../components/SimpleCard";
import ButtonAddTask from "../components/ButtonAddTask";
import { SimpleCardPlaceholder } from "../components/CardPlaceholder";
import { NavbarSimple } from "../components/Navbar";
import { Tasks } from "../interface/tasks.interface";
import UsernameInterface from "../interface/username.interface";
import { setName } from "../features/authSlice";
import MainBodyProps from "../interface/mainBodyProps.interface";
import { TaskStatus } from "../interface/taskStatus.enum";
import { RootState } from "../store";

const tasks: Tasks[] = [
  {
    id: 1,
    title: "Help cook dinner @ 9pm",
    description: "Dice onion first and let it marinade for 30 minutes",
    status: TaskStatus.OPEN,
  },
  {
    id: 2,
    title: "Demo Mode",
    description:
      "Velit vitae sapien, placerat elit suspendisse, convallis rhoncus praesent duis. Etiam feugiat etiam, morbi integer ullamcorper, tellus aenean tellus nunc. Metus pellentesque in, dignissim massa suscipit, imperdiet ac nam consequat. Ac penatibus tempor, arcu ut odio, a ultricies dapibus ultrices. Eu in praesent, gravida posuere suspendisse, pulvinar eu leo ante.",
    status: TaskStatus.OPEN,
  },
];

export default function HomePage() {
  const [task, setTask] = useState<Tasks[]>(tasks);
  const [isTaskPlaceholderVisible, setIsTaskPlaceholderVisible] =
    useState(false);
  const [isWannaLogin, setIsWannaLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jwtToken = useSelector((state: RootState) => state.jwt.jwt);

  async function fetchTask() {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setTask(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  // NOTE: Removing signup and sign in page from the home page
  useEffect(() => {
    if (
      window.location.pathname === "/signup" ||
      window.location.pathname === "/signin"
    ) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (jwtToken) {
      try {
        fetchTask();
        setIsLogin(true);
        const decode = jwtDecode<UsernameInterface>(jwtToken);
        dispatch(setName(decode.username));
      } catch (error) {
        console.log(error);
      }
    }
  }, [jwtToken, dispatch]);

  const handleAddTask = useCallback(
    async (task: Tasks) => {
      if (isLogin) {
        try {
          await axios.post("/api/tasks", task, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });
          fetchTask();
        } catch (error) {
          console.log(error);
        }
      } else {
        setTask((tasks) => [...tasks, task]);
      }
    },
    [isLogin, jwtToken],
  );

  const handleDeleteTask = useCallback(
    async (id: number) => {
      console.log("1");
      if (isLogin) {
        try {
          console.log("2");
          await axios.delete(`/api/tasks/${id}`, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          });
          fetchTask();
        } catch (error) {
          console.log("3");
          console.log(error);
        }
      } else {
        setTask((tasks) => tasks.filter((task) => task.id !== id));
      }
    },
    [isLogin, jwtToken],
  );

  return (
    <div className="flex flex-col min-h-screen bg-fixed">
      {/* NOTE: Navbar */}
      <NavbarSimple
        isLogin={isLogin}
        handleLogin={setIsWannaLogin}
        isWannaLogin={isWannaLogin}
      />

      {/* NOTE: Nampilin login/signup */}
      {isWannaLogin ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Outlet />
        </div>
      ) : null}

      {/* NOTE: Main Body */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner className="h-12 w-12" />
        </div>
      ) : (
        <MainBody
          handleAddTask={handleAddTask}
          handleDeleteTask={handleDeleteTask}
          isWannaLogin={isWannaLogin}
          isTaskPlaceholderVisible={isTaskPlaceholderVisible}
          setIsTaskPlaceholderVisible={setIsTaskPlaceholderVisible}
          task={task}
        />
      )}
    </div>
  );
}

function MainBody({
  handleAddTask,
  handleDeleteTask,
  isWannaLogin,
  isTaskPlaceholderVisible,
  setIsTaskPlaceholderVisible,
  task,
}: MainBodyProps) {
  return (
    <>
      <div
        className={`flex flex-wrap justify-center gap-4 mt-4 ${isWannaLogin ? "blur-sm" : ""}`}
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
