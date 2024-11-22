import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;


const geocodingClient = mbxGeocoding({ accessToken } as {
  accessToken: string;
});
export const getGeocodeSuggestions = async (query: string) => {
  if (!query) return [];
  try {
    const response = await geocodingClient
      .forwardGeocode({
        query,
        autocomplete: true,
        limit: 4,
      })
      .send();
    return response.body.features || [];
  } catch (error) {
    console.error("Error fetching geocode:", error);
    return [];
  }
};

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

export function truncuateTillKeyword(string: string,keyword: string): string | null{
      if(!(string || keyword)) return null
      const desiredStringLength = string.indexOf(keyword) + keyword.length
      const desiredString = string.slice(0,desiredStringLength)
      return desiredString;
  }

export const Api = axios.create(ApiOptions());
