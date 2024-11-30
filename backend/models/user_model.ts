import { SignUpForm, SignInForm } from "../../frontend/types/index.ts";
import { supabase } from "../lib/database.ts";
import bcrypt from "bcrypt";
import { createGeneralNotificationsType } from "../types/index.ts";
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
  createGeneralNotifications: async ({ notificationFor, notificationFrom, notificationType, notificationDescription }: createGeneralNotificationsType) => {
    try {
      console.log("details");

      const { data, error } = await supabase.from("notifications_general").insert([{
        notification_for: notificationFor,
        notification_from: notificationFrom,
        notification_type: notificationType,
        notification_description: notificationDescription
      }]).select().single();
      if (error) {
        // console.log(error);

        return { status: 400, message: "Error creating general notification", error }
      }

      return { status: 201, message: "general notification created", data };

    } catch (error) {
      throw new Error(error)
    }
  }
};

export default userModel;
