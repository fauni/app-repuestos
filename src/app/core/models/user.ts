export class User {
  id!: number;
  img!: string;
  username!: string;
  password!: string;
  nombres!: string;
  apellidos!: string;
  token!: string;
}

export class ResponseUser {
  token!: string;
  user!: User;
}