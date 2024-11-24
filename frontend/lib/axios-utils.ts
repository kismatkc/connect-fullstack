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
    send: async (requestDetails: { requesterId: string, recipientId: string }) => {
        try {
            const response = await Api.post("/send-friend-request", requestDetails)


            return response.data
        } catch (error) {
            console.log(error);

        }
    }, delete: async (recipientId: string) => {
        try {
            const response = await Api.get("/delete-friend-request", { params: recipientId })



            return response.data
        } catch (error) {
            console.log(error);

        }
    }
}


export const notifications = {
    getPendingRequest: async (recipientId: string) => {
        try {
            console.log("fired");

            const response = await Api.get("/get-pending-request", { params: { recipientId } })



            return response.data
        } catch (error) {
            console.log(error);

        }
    }
}
export const Api = axios.create(ApiOptions());