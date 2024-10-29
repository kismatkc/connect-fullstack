import { pool } from "../lib/database.js";
import { SignUpDetails, LoginDetails, user } from "../types/index.js";
import bcrypt from "bcrypt";

const userModel = {
  create: async ({ email, userName, password, avatarUrl }: SignUpDetails) => {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const query = `
        INSERT INTO users (email, user_name, password_hash, avatar_url) 
        VALUES (\$1, \$2, \$3, \$4) 
        RETURNING id, email, user_name, password_hash, avatar_url, created_at
      `;

    const result = await pool.query(query, [
      email,
      userName,
      password_hash,
      avatarUrl,
    ]);

    return result.rows[0];
  },
  verify: async ({ email, password }: LoginDetails) => {
    const query = `SELECT id, email, user_name, password_hash, avatar_url, created_at FROM users WHERE email= \$1`;
    const result = await pool.query(query, [email]);
    console.log(result.rows);

    if (!(result.rows.length > 0)) {
      return { verified: false, error: "no user found", status: 404 };
    }

    const user: user = result.rows[0];
    return (await bcrypt.compare(password, user.password_hash))
      ? { verified: true, data: user, status: 200 }
      : { verified: false, error: "Incorrect password", status: 401 };
  },
};
export default userModel;

// {
//   "email": "anishgc27@gmail.com",
//   "password": "Sova@321",
//   "avatarUrl": "hello",
//   "userName": "fido"

// }
