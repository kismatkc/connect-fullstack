import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export const Api = axios.create(ApiOptions());
