export type Task = {
  id: number;
  text: string;
  created: Date;
  updated?: Date;
  completed: boolean;
};