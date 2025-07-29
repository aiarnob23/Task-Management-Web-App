import app from "./src/app.js";
import connectDB from "./src/config/db.config.js";
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  try {
    connectDB();
    app.listen(4000, () => {
      console.log(`Task Management server is running on port 4000`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();