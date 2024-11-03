import { pool } from "../lib/database.js";
import { SignUpDetails, LoginDetails, user } from "../types/index.js";
import bcrypt from "bcrypt";

const userModel = {
  create: async ({ email, firstName, lastName, password, birthday, gender }: SignUpDetails) => {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    console.log(password_hash)
    const query = `  
        INSERT INTO users (email, first_name, last_name, password_hash, birthday, gender)   
        VALUES ($1, $2, $3, $4, $5, $6)   
        RETURNING id, email, first_name, last_name, password_hash, birthday, gender, created_at  
    `;  
    const result = await pool.query(query, [
      email, firstName, lastName, password_hash, birthday, gender
    ]);

    return result.rows[0];
  },
  verify: async ({ email, password }: LoginDetails) => {
    
    const query = `SELECT id , email, first_name,password_hash, last_name, birthday, gender FROM users WHERE email= \$1`;
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

// {
//   "email": "anishgc27@gmail.com",
//   "password": "Sova@321",
//   "avatarUrl": "hello",
//   "userName": "fido"

// }
