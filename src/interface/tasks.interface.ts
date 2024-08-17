import { TaskStatus } from "./taskStatus.enum";

export interface Tasks {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
