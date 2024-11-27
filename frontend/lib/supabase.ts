import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
console.log(supabaseUrl && supabaseAnonKey);
if (!(supabaseUrl && supabaseAnonKey))
  throw new Error("Please provide the supbase credentials");

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
