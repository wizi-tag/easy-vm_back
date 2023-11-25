import { User } from 'src/db/models/user';

export interface AuthResponse {
  user: User;
  token: string;
}
