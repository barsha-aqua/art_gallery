import bcrypt from "bcrypt";
import prisma from "../config/db.js";

const EMAIL = "cat@gmail.com"; // change this to your real email
const PASSWORD = "dog123"; // change this to your real password

async function main() {
  const passwordHash = await bcrypt.hash(PASSWORD, 10);

  const admin = await prisma.adminUser.create({
    data: {
      email: EMAIL,
      passwordHash: passwordHash,
    },
  });

  console.log("Admin account created:", admin.email);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Failed to create admin:", error);
    process.exit(1);
  });
