import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


{
    "POSTGRES_HOST" : "localhost",
    "POSTGRES_PORT" : "5432",
    "POSTGRES_USERNAME" : "postgres",
    "POSTGRES_PASSWORD":"Mohan9869868880",
    "POSTGRES_DATABASE":"connect"
}