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



const friendRequest = {
    send: async (requesterId: string, recipientId: string) => {
        try {
            const response = await Api.post("/send-friend-request", { requesterId, recipientId })
            return response.data
        } catch (error) {
            console.log(error);

        }
    }
}

export const Api = axios.create(ApiOptions());