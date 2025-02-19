import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import { PrismaDatabaseSeederCollection } from "./types";
import AdminRootUserSeeder from "./seeders/admin-root-user.seeder";

dotenv.config();

const prisma = new PrismaClient();
const seeders: PrismaDatabaseSeederCollection = [
    AdminRootUserSeeder
];

async function main() {
    console.log("🌱 Starting the database seeding...");

    try {
        await Promise.all(seeders.map((seeder) => seeder(prisma)));

        console.log("✅ Seeding completed successfully!");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
