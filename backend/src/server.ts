
import app from "./app";
import dotenv from 'dotenv';
dotenv.config();

async function main() {
  try {
    app.listen(4000, () => {
      console.log(`Server is running on port 4000`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();