import {createClient} from "@supabase/supabase-js"
import dotenv from "dotenv";
dotenv.config();
if (!(process.env.SUPABASE_URL || process.env.SUPABASE_ANON_KEY)) throw new Error("Please provide the supabase credentials")
export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

// import postGresPackage from "pg";
// const { Pool } = postGresPackage;

// const postgresConfig = () => {
//   if (process.env.ENVIRONMENT === "replit") {
//     return {
//       user: process.env.POSTGRES_USERNAME,
//       password: process.env.POSTGRES_PASSWORD,
//       host: process.env.POSTGRES_HOST,

//       port: process.env.POSTGRES_PORT as unknown as number,
//       database: process.env.POSTGRES_DATABASE,
//       keepAlive: true, // Enable keep-alive
//       idleTimeoutMillis: 0, // Prevent disconnections due to inactivity
//       ssl: {
//         rejectUnauthorized: false,
//       },
//     };
//   }

  
//   return {
//     user: process.env.POSTGRES_USERNAME,
//     password: process.env.POSTGRES_PASSWORD,
//     host: process.env.POSTGRES_HOST,

//     port: process.env.POSTGRES_PORT as unknown as number,
//     database: process.env.POSTGRES_DATABASE,
//   };
// };

// export const pool = new Pool(postgresConfig());

// export default async function connectToDatabase() {
//   try {
//     await pool.connect();

//     console.log("Connection to the database successful");
//   } catch (error) {
//     console.log("Connection to th database unsuccessful", error);
//   }
// }

// pool.on("error", connectToDatabase);
