import dotenv from "dotenv";
import postGresPackage from "pg";
const { Pool } = postGresPackage;
import { connectToDatabase } from "./lib/utils.js";

dotenv.config();
//postgres connection
connectToDatabase(Pool);
