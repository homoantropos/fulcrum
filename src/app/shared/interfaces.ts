export interface Aim {
  title: string;
  description: string;
  start: Date;
  finish: Date;
  state: Array<Way>;
  owner: User;
}

export interface Way {
  direction: string;
  mileStones: Array<MileStone>;
  driver: User;
}

export interface MileStone {
  deadLine: Date;

}

export interface User {
  email: string;
  password: string;
  role: string;
  id?: number;
}
