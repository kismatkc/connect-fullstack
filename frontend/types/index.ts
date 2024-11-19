export type SignInForm = {
  email: string;
  password: string;
};

export type SignUpForm = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  gender: string;
  avatarUrl: File | string;
  city: string;
  college: string;
};

export interface PostGresUser {
  id: string;
  email: string;
  userName: string;
  password_hash: string;
  avatarUrl: string;
  created_at: string;
}
