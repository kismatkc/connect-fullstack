import { pool } from "../lib/database.js";
import { SignUpDetails, LoginDetails, user } from "../types/index.js";
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
  }: SignUpDetails) => {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const query = `  
        INSERT INTO users (email, first_name, last_name, password_hash, birthday, gender,avatar_url)   
        VALUES ($1, $2, $3, $4, $5, $6,$7)   
        RETURNING id, email, first_name, last_name, password_hash, avatar_url,birthday, gender, created_at  
    `;
    const result = await pool.query(query, [
      email,
      firstName,
      lastName,
      password_hash,
      birthday,
      gender,
      avatarUrl,
    ]);

    return result.rows[0];
  },
  verify: async ({ email, password }: LoginDetails) => {
    const query = `SELECT id , email, first_name,password_hash,avatar_url, last_name, birthday, gender FROM users WHERE email= \$1`;
    const result = await pool.query(query, [email]);
    if (!(result.rows.length > 0)) {
      return { verified: false, error: "no user found", status: 404 };
    }

    const { password_hash, ...user } = result.rows[0];

    return (await bcrypt.compare(password, password_hash))
      ? { verified: true, data: user, status: 200 }
      : { verified: false, error: "Incorrect password", status: 401 };
  },
};
export default userModel;
