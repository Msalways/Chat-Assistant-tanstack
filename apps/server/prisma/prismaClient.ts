import { PrismaClient } from "./generated";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
  errorFormat: "pretty",
});

export default prisma;
