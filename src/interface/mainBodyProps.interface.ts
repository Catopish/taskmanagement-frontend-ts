import { Tasks } from "./tasks.interface";

export default interface MainBodyProps {
  handleAddTask: (task: Tasks) => void;
  handleDeleteTask: (id: number) => void;
  isWannaLogin: boolean;
  isTaskPlaceholderVisible: boolean;
  setIsTaskPlaceholderVisible: (value: boolean) => void;
  task: Tasks[];
}
