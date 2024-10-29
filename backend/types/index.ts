export interface SignUpDetails {
  email: string;
  userName: string;
  password: string;
  avatarUrl: string;
}
export interface user {
  id: string;
  email: string;
  userName: string;
  password_hash: string;
  avatarUrl: string;
  created_at: string;
}

export interface LoginDetails {
  email: string;
  password: string;
}
