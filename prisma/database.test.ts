import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Database Connection", () => {
    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("should connect to the database and retrieve current time", async () => {
        const result = await prisma.$queryRaw`SELECT NOW();`;
        expect(result).toBeDefined();
    });
});
