import type { Task } from "./task";

export type ListTasks = {
  id: number;
  title: string;
  tasks: Task[];
};