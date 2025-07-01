export class TaskDto {
  email: string;
  title: string;
  description: string;
  Deadline?: string; // or Date
  Finished: boolean;
  Repeating: boolean;
  RepeatedDays: string[];
}