export interface Team {
  id: number;
  name: string;
  team_id: null;
  founder_id: number;
  createdAt: string;
  updatedAt: string;
  UserTeam: {
    userId: number;
    teamId: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  UserTeam: {
    userId: number;
    teamId: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface TodoInterface {
  id: number;
  title: string;
  description: string;
  creatorId: number;
  done: boolean;
  creator: {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  todos: ToDoMeInterface[];
  teams: {
    id: number;
    name: string;
    founder_id: number;
    createdAt: string;
    updatedAt: string;
    UserTeam: {
      userId: number;
      teamId: number;
      createdAt: string;
      updatedAt: string;
    }[];
  };
}

export interface ToDoMeInterface {
  id: number;
  title: string;
  description: string;
  creatorId: number;
  done: boolean;
  createdAt: string;
  updatedAt: string;
  teamId: number | null;
}
