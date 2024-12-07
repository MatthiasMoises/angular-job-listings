export enum UserRole {
  BASIC = 'basic',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  creationDate: Date;
}
