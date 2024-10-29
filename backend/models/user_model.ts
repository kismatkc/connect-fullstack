import { pool } from "../lib/database.js";
import { userInput } from "../types/index.js";
import bcrypt from "bcrypt";

const userModel = {
  create: async ({ email, userName, password, avatarUrl }: userInput) => {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    console.log(email, userName, password_hash, avatarUrl);

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
  verify: () => {},
};
export default userModel;
