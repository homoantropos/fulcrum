export interface Aim {
  title: string;
  description: string;
  start: Date;
  finish: Date;
  state: State;
  owner: User;
  id?: number;
}

export interface State {
  ways: Array<Way>;
  readonly created: TimeStamp;
  updated: TimeStamp;
  id?: number;
}

export interface Way {
  direction: string;
  milestones: Array<Milestone>;
  leader: User;
  id?: number;
}

export interface Milestone {
  deadLine: Date;
  tasks: Array<Task>;
  readonly created: TimeStamp;
  updated: TimeStamp;
  id?: number;
}

export interface Task {
  todo: string;
  deadLine: Date;
  operator: User;
  operators: Array<User>;
  readonly created: TimeStamp;
  updated: TimeStamp;
}

export interface TimeStamp {
  readonly createdAt: Date;
  readonly createdBy: User;
}

export interface User {
  email: string;
  password: string;
  phone: string;
  role: string;
  id?: number;
}
