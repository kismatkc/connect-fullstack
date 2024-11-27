import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
if (!(process.env.SUPABASE_URL || process.env.SUPABASE_ANON_KEY))
  throw new Error("Please provide the supabase credentials");
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);
