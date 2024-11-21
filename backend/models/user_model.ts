import { SignUpForm, SignInForm } from "../../frontend/types/index.ts";
import { supabase } from "../lib/database.ts";
import bcrypt from "bcrypt";
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
          "id, email, first_name, last_name, profile_picture_url, dob, gender, city, college",
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
          "id, email, first_name, last_name, profile_picture_url, dob, gender, city, college,password_hash",
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
          "id,profile_picture_url,first_name,last_name,city,college,created_at",
        )
        .eq("id", id)
        .single();
      if (error) return { status: 500, message: "database error", error };
      if (!data) return { status: 404, message: "User not found", data: [] };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};

export default userModel;
