import { supabase } from "../lib/database.js";
import { SignUpDetails, LoginDetails } from "../types/index.js";
import bcrypt from "bcrypt";

const userModel = {
  create: async ({
    email,
    firstName,
    lastName,
    password,
    avatarUrl,
    birthday,
    gender,
    city,
    college
  }: SignUpDetails) => {
    try {
      // 1. Password hashing
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(password, salt);

      // 2. Supabase insert operation
      const { data, error } = await supabase
        .from('users')              // Specify the table name
        .insert([                   // Insert accepts an array of objects
          {
            email,
            first_name: firstName,
            last_name: lastName,
            password_hash,
            profile_picture_url: avatarUrl,
            dob: birthday,
            gender,
            city,
            college
          }
        ])
        .select(`                   // Specify which fields to return after insert
        id,
        email,
        first_name,
        last_name,
        password_hash,
        profile_picture_url,
        dob,
        gender,
        created_at
      `)
        .single();                  // Get single record instead of array


      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }

  },
  verify: async ({ email, password }: LoginDetails) => {
    // const query = `SELECT id , email, first_name,password_hash,profile_picture_url, last_name, dob, gender,city,college FROM users WHERE email= \$1`;
    // const result = await pool.query(query, [email]);
    // if (!(result.rows.length > 0)) {
    //   return { verified: false, error: "no user found", status: 404 };
    // }

    // const { password_hash, ...user } = result.rows[0];

    // return (await bcrypt.compare(password, password_hash))
    //   ? { verified: true, data: user, status: 200 }
    //   : { verified: false, error: "Incorrect password", status: 401 };
    try {
      const { data, error } = await supabase.from('users').select("*").single();
      console.log(data);
      if (error) throw error;
      return (await bcrypt.compare(password, data.password_hash))
        ? { verified: true, data, status: 200 }
        : { verified: false, error: "Incorrect password", status: 401 };
    } catch (error) {

    }
  },
  getProfileDetails: async ({ email }: { email: string }) => {
    // const query = `SELECT id , email, first_name,password_hash,avatar_url, last_name, birthday, gender FROM users WHERE email= \$1`;
    // const result = await pool.query(query, [email]);

  },
};
export default userModel;
