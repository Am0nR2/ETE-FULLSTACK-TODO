export interface AccessTokenInterface {
  access_token: string;
}

export interface PayloadInterface {
  id: number;
}

export interface CurrentUserInterface {
  id: number;
  name: string;
  password: string;
}
// export interface CurrentUserInterface {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   createdAt: string;
//   updatedAt: string;
//   todos: ToDoMeInterface[];
//   teams: {
//     id: number;
//     name: string;
//     founder_id: number;
//     createdAt: string;
//     updatedAt: string;
//     UserTeam: {
//       userId: number;
//       teamId: number;
//       createdAt: string;
//       updatedAt: string;
//     }[];
//   };
// }

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
