export const postgresConfig = () => ({
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT as unknown as number,
  database: process.env.POSTGRES_DATABASE,
});

export async function connectToDatabase(Pool: any) {
  const pool = new Pool(postgresConfig());

  try {
    const connection = await pool.connect();

    console.log("Connection to the database successful");
  } catch (error) {
    console.log("Connection to th database unsuccessful");
  }
}