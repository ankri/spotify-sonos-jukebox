import { PrismaClient } from "@prisma/client";

// See here: https://github.com/prisma/prisma-client-js/issues/228#issuecomment-618433162
let prisma: PrismaClient;
const globalAny: any = global;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
}
// `stg` or `dev`
else {
  if (!globalAny.prisma) {
    globalAny.prisma = new PrismaClient();
  }

  prisma = globalAny.prisma;
}

export { prisma };
