import { createGeneralNotificationsType, PostDetailsType } from "@/types";
import axios from "axios";
const ApiOptions = () => {
  const options = {
    withCredentials: true,
    baseURL: "http://localhost:4000/api",
  };

  if (process.env.NEXT_PUBLIC_ENVIRONMENT == "replit") {
    options.baseURL =
      "https://96283587-40ff-470f-a4ea-4f30bdcaad52-00-care00ttvfz8.spock.replit.dev:3000/api";
  }
  return options;
};

export const friendRequest = {
  send: async (requestDetails: {
    requesterId: string;
    recipientId: string;
  }) => {
    try {
      const response = await Api.post("/send-friend-request", requestDetails);
      console.log(response.data);

      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (recipientId: string) => {
    try {
      const response = await Api.get("/delete-friend-request", {
        params: recipientId,
      });

      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};

export const notifications = {
  getPendingRequest: async (recipientId: string) => {
    try {
      const response = await Api.get("/get-pending-request", {
        params: { recipientId },
      });

      return response.data.data;
    } catch (error) {
      console.log("notiffcation fetchign errors");
    }
  },
  deletePendingRequest: async (friendRequestId: string): Promise<boolean> => {
    try {
      const response = await Api.delete("/delete-pending-request", {
        params: { friendRequestId },
      });

      return response.data.success;
    } catch (error) {
      console.log("deleting request errors");
      return false;
    }
  },
  acceptPendingRequest: async (friendRequestId: string): Promise<boolean> => {
    try {
      const response = await Api.patch("/accept-pending-request", {
        friendRequestId,
      });

      return response.data.success;
    } catch (error) {
      console.log("Error accepting request");
      return false;
    }
  },
  getFriendshipStatus: async (friendshipDetails: {
    userId: string;
    friendId: string;
  }): Promise<{ status: string } | undefined> => {
    try {
      const response = await Api.get("/get-friendship-status", {
        params: { friendshipDetails },
      });
      if (!response) return;
      return response.data.data;
    } catch (error) {
      console.log("Error getting friendship status");
    }
  },
  createGeneralNotification: async (
    notificationsDetails: createGeneralNotificationsType
  ) => {
    try {
      const response = await Api.post(
        "/create-general-notification",
        notificationsDetails
      );

      return response.data.data;
    } catch (error) {
      console.log("General notification error", error);
    }
  },
  getGeneralNotifications: async (notificationsDetails: {
    notificationFor: string;
    notificationType: string;
  }) => {
    try {
      const response = await Api.get("/get-general-notifications", {
        params: notificationsDetails,
      });

      return response.data.data;
    } catch (error) {
      console.log("General notification fetching error", error);
    }
  },
  getFriendsDetails: async (friendsDetails: { userId: string }) => {
    try {
      const response = await Api.get("/get-friends", {
        params: friendsDetails,
      });

      return response.data.data;
    } catch (error) {
      console.log("error getting friends details", error);
    }
  },
};

export const posts = {
  createPost: async ({ description, picture }: PostDetailsType) => {
    try {
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("description", description);
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  },
};
export const Api = axios.create(ApiOptions());
