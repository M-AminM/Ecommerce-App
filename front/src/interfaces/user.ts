export interface UserInterface {
  email: string;
  id: number;
}

export interface UserResInterface {
  token: string;
  user_id: string;
  email: string;
}

export interface UserPostInterface {
  email: string;
  password: string;
}

export interface UserSignupRes {
  id: number;
  email: string;
  password: string;
  created_at: string;
}
