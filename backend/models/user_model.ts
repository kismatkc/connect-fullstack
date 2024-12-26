import { SignUpForm, SignInForm } from "../../frontend/types/index.ts";
import { supabase } from "../lib/database.ts";
import bcrypt from "bcrypt";
import {
  createGeneralNotificationsType,
  supbaseDataModifiedType,
} from "../types/index.ts";

const userModel = {
  create: async (userDetails: SignUpForm) => {
    try {
      const {
        email,
        firstName,
        lastName,
        password,
        avatarUrl,
        birthday,
        gender,
        city,
        college,
      } = userDetails;
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);
      const { data, error } = await supabase
        .from("users")
        .insert([
          {
            email,
            first_name: firstName,
            last_name: lastName,
            password_hash: password_hash,
            profile_picture_url: avatarUrl,
            dob: birthday,
            gender,
            city,
            college,
          },
        ])
        .select(
          "id, email, first_name, last_name, profile_picture_url, dob, gender, city, college"
        )
        .single();
      if (error)
        return { status: 400, message: "Database error occurred", error };
      return { status: 201, message: "User creating successful", data };
    } catch (error) {
      throw error;
    }
  },
  verify: async (userDetails: SignInForm) => {
    try {
      const { email, password } = userDetails;
      const { data, error } = await supabase
        .from("users")
        .select(
          "id, email, first_name, last_name, profile_picture_url, dob, gender, city, college,password_hash"
        )
        .eq("email", email)
        .single();
      if (error)
        return { status: 400, message: "Database error occurred", error };
      const verified = bcrypt.compare(password, data.password_hash);
      if (!verified)
        return { status: 401, message: "Incorrect password", error };
      const { password_hash, ...dataWithoutPassword } = data;

      return {
        status: 200,
        message: "Successful authentication",
        data: dataWithoutPassword,
      };
    } catch (error) {
      throw error;
    }
  },
  getPeople: async (query: string) => {
    try {
      const queryToLowerCase = `${query.toLowerCase()}%`;

      const { data: usingFirstName, error: firstNameError } = await supabase
        .from("users")
        .select("id,first_name,last_name,profile_picture_url")
        .ilike("first_name", queryToLowerCase);
      if (firstNameError) {
        return { status: 404, message: "Friends not found", data: [] };
      }
      if (usingFirstName.length > 0)
        return { status: 200, message: "Friends found", data: usingFirstName };

      return { status: 404, message: "Friends not found", data: [] };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getUserDetails: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select(
          "id,profile_picture_url,first_name,last_name,city,college,created_at"
        )
        .eq("id", id)
        .single();
      if (error) throw error;

      if (!data) return { status: 404, message: "User not found", data: [] };
      return { status: 200, message: "User found", data };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  sendFriendRequest: async (friendRequestDetails: {
    requesterId: string;
    recipientId: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from("friend_requests")
        .insert([
          {
            requester_id: friendRequestDetails.requesterId,
            recipient_id: friendRequestDetails.recipientId,
          },
        ])
        .select("id")
        .single();
      if (error) {
        console.log(error);

        return { status: 400, message: "Database error occurred", error };
      }
      return { status: 201, message: "Friend request sent", data };
    } catch (error) {
      console.log(error);

      throw error;
    }
  },
  getPendingRequests: async (recipientId: string) => {
    try {
      const { data, error } = await supabase
        .from("friend_requests")
        .select(
          "id,requester_id,requester:users!fk_requester(first_name,last_name,profile_picture_url)"
        )
        .eq("recipient_id", recipientId)
        .eq("status", "pending");
      if (error) {
        return { status: 400, message: "Friend request doesn't exists", error };
      }
      return { status: 200, message: "Friend request exists", data };
    } catch (error) {
      console.log(error);

      throw error;
    }
  },
  deletePendingRequest: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("friend_requests")
        .delete()
        .eq("id", id);
      if (error) {
        console.log(error);
        return { status: 400, message: "Database error occurred", error };
      }
      return { status: 200, message: "Friend request deleted", data };
    } catch (error) {
      throw error;
    }
  },
  acceptPendingRequest: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("friend_requests")
        .update({ status: "accepted" })
        .eq("id", id)
        .eq("status", "pending");
      if (error) {
        console.log(error);
        return { status: 400, message: "Database error occurred", error };
      }
      return { status: 200, message: "Friend request accepted", data };
    } catch (error) {
      throw error;
    }
  },
  getFriendshipStatus: async (friendRequestDetails: {
    userId: string;
    friendId: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from("friend_requests")
        .select("status,id")
        .or(
          `and(requester_id.eq.${friendRequestDetails.userId},recipient_id.eq.${friendRequestDetails.friendId}),and(requester_id.eq.${friendRequestDetails.friendId},recipient_id.eq.${friendRequestDetails.userId})`
        )
        .single();

      if (error) {
        console.log(error);
        return { status: 400, message: "Database error occurred", error };
      }

      if (data) {
        return { status: 200, message: "Friend request exists", data };
      }

      return { status: 200, message: "No friend request found" };
    } catch (error) {
      throw error;
    }
  },
  createGeneralNotifications: async ({
    notificationFor,
    notificationFrom,
    notificationType,
    notificationDescription,
  }: createGeneralNotificationsType) => {
    try {
      const { data, error } = await supabase
        .from("notifications_general")
        .insert([
          {
            notification_for: notificationFor,
            notification_from: notificationFrom,
            notification_type: notificationType,
            notification_description: notificationDescription,
          },
        ])
        .select()
        .single();
      if (error) {
        console.log(error);

        return {
          status: 400,
          message: "Error creating general notification",
          error,
        };
      }

      return { status: 201, message: "general notification created", data };
    } catch (error) {
      throw new Error(error);
    }
  },
  getGeneralNotification: async ({
    notificationFor,
    notificationType,
  }: {
    notificationFor: string;
    notificationType: string;
  }) => {
    try {
      const today = Date.now();
      const twoDaysAgo = new Date(today); //we update the day later on
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 1);
      const twoDaysAgoInIsoFormat = twoDaysAgo.toISOString();
      const { data, error } = await supabase
        .from("notifications_general")
        .select(
          "notification_from(first_name,last_name,profile_picture_url,id),notification_description"
        )
        .eq("notification_for", notificationFor)
        .eq("notification_type", notificationType)
        .gte("created_at", twoDaysAgoInIsoFormat);
      if (error) {
        console.log(error);
        return { status: 400, message: "Database error", error };
      }

      if (data.length > 0)
        return { status: 200, message: "General notifications found", data };
      console.log(data);

      return { status: 200, message: "No noptifications found", data };
    } catch (error) {
      throw new Error(error);
    }
  },

  getFriendsDetails: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("friend_requests")
        .select(
          "fk_requester(id,first_name,last_name,profile_picture_url),fk_recipient(id,first_name,last_name,profile_picture_url)"
        )
        .eq("status", "accepted")
        .or(`requester_id.eq.${userId},recipient_id.eq.${userId}`);
      if (error) {
        console.log(error);
        return { status: 400, message: "Database error", error };
      }
      return { status: 200, message: "Friends found", data };
    } catch (error) {
      throw new Error(error);
    }
  },
  createPost: async (
    urlWithoutSize: string,
    description: string,
    userId: string
  ) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .insert([
          { post_picture_link: urlWithoutSize, description, user_id: userId },
        ])
        .single();
      if (error)
        return {
          status: 400,
          message: "Database error occurred",
          error,
          success: false,
        };
      return {
        status: 201,
        message: "User creating successful",
        data,
        success: true,
      };
    } catch (error) {
      throw new Error(error);
    }
  },
  deletePost: async (postId: string) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId)
        .select()
        .single();
      if (error)
        return {
          status: 400,
          message: "Database error occurred",
          error,
          success: false,
        };
      return {
        status: 200,
        message: "post deletion successful",
        data,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },
  getYourPosts: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("user_id(*),id,post_picture_link,description")
        .eq("user_id", userId);
      if (error) {
        return {
          status: 400,
          message: "Database error occurred",
          error,
          success: false,
        };
      }
      return { status: 200, message: "Posts found", data, success: true };
    } catch (error) {
      throw error;
    }
  },
  getFriendsPosts: async (userId: string[]) => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("user_id(*),id,post_picture_link,description")
        .in("user_id", userId);
      if (error) {
        return {
          status: 400,
          message: "Database error occurred",
          error,
          success: false,
        };
      }
      return { status: 200, message: "Posts found", data, success: true };
    } catch (error) {
      throw error;
    }
  },
  createLike: async (likeDetails: { postId: string; userId: string }) => {
    try {
      const { data, error } = await supabase
        .from("likes")
        .insert([
          { post: likeDetails.postId, user_details: likeDetails.userId },
        ])
        .select("id")
        .single();

      if (error) {
        return {
          status: 400,

          message: "Database error occurred",
          error,
          success: false,
        };
      }
      return { status: 201, message: "Like created", data, success: true };
    } catch (error) {
      throw error;
    }
  },
  likeStatus: async (likeDetails: { postId: string; userId: string }) => {
    try {
      const { data, error } = await supabase
        .from("likes")
        .select("id")
        .eq("user_details", likeDetails.userId)
        .eq("post", likeDetails.postId);

      if (error) {
        return {
          status: 400,
          message: "Database error occurred",
          error,
          success: false,
        };
      }
      if (!(data.length > 0))
        ({ status: 200, message: "Like not found", data, success: true });

      return { status: 200, message: "Like found", data, success: true };
    } catch (error) {
      throw error;
    }
  },
  deleteLike: async (likeId: string) => {
    try {
      const { data, error } = await supabase
        .from("likes")
        .delete()
        .eq("id", likeId);

      if (error) {
        return {
          status: 400,
          message: "Database error occurred",
          error,
          success: false,
        };
      }
      return { status: 200, message: "Like deleted", data, success: true };
    } catch (error) {
      throw error;
    }
  },
  getPeopleWhoLikedThePost: async (postId: string) => {
    try {
      // @ts-ignore
      const { data, error }: { data: supbaseDataModifiedType; error: Error } =
        await supabase
          .from("likes")
          .select("user_details(id,first_name,last_name,profile_picture_url)")
          .eq("post", postId);

      if (error) {
        return {
          status: 400,
          message: "Database error occurred",
          error,
          success: false,
        };
      }
      return {
        status: 200,
        message: "People likes exists",
        data,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },
  createComment: async (likeDetails: {
    postId: string;
    userId: string;
    description: string;
  }) => {
    try {
      const { data, error } = await supabase.from("comments").insert([
        {
          post: likeDetails.postId,
          user_details: likeDetails.userId,
          description: likeDetails.description,
        },
      ]);

      if (error) {
        return {
          status: 400,

          message: "Database error occurred",
          error,
          success: false,
        };
      }
      return { status: 201, message: "Comment created", success: true };
    } catch (error) {
      throw error;
    }
  },
  getAllComments: async (postId: string) => {
    try {
      interface commentsType extends supbaseDataModifiedType {
        description: string;
        commentId: string;
      }
      // @ts-ignore
      const { data, error }: { data: commentsType; error: Error } =
        await supabase
          .from("comments")
          .select(
            "user_details(id,first_name,last_name,profile_picture_url),description,id,created_at"
          )
          .eq("post", postId)
          .order("created_at", {
            ascending: false,
          });

      if (error) {
        return {
          status: 400,
          message: "Database error occurred",
          error,
          success: false,
        };
      }
      return {
        status: 200,
        message: "Comments exists",
        data,
        success: true,
      };
    } catch (error) {
      throw error;
    }
  },
  deleteComment: async (commentId: string) => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .delete()
        .eq("id", commentId);

      if (error) {
        return {
          status: 400,
          message: "Database error occurred",
          error,
          success: false,
        };
      }
      return { status: 200, message: "comment deleted", data, success: true };
    } catch (error) {
      throw error;
    }
  },
};

export default userModel;
