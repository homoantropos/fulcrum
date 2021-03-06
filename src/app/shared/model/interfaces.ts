export interface Aim {
  title: string;
  description: string;
  start: Date;
  finish: Date;
  state: State;
  owner: User;
  completed: boolean;
  id?: number;
}

export interface State {
  ways: Array<Way>;
  readonly created: TimeStamp;
  updated: TimeStamp;
  log: Array<State>;
  id?: number;
}

export interface Way {
  direction: string;
  milestones: Array<Milestone>;
  leader: User;
  drivers: Array<User>;
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
  driver: User;
  operators: Array<User>;
  readonly created: TimeStamp;
  updated: TimeStamp;
  completed: boolean;
}

export interface TimeStamp {
  readonly createdAt: Date;
  readonly createdBy: User;
}

export interface User {
  username?: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  phones: Array<string>;
  role: string;
  readonly registered: Date;
  avatarSrc?: string;
  id?: number;
}
