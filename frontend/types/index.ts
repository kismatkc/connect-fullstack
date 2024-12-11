import { UUID } from "crypto";

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

export type PostDetailsType = {
  description: string;
  picture: File;
  userId: UUID;
};

export type createGeneralNotificationsType = {
  notificationFor: string;
  notificationFrom: string;
  notificationType: string;
  notificationDescription: string;
};

export type Post = {
  user: {
    firstName: string;
    lastName: string;
    avatarLink: string;
    userId: string;
  };
  postId: string;
  description: string;
  pictureLink: string;
};
