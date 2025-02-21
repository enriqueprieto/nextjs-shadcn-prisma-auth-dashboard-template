import dotenv from "dotenv";
import { PrismaDatabaseSeederCollection } from "./types";
import AdminRootUserSeeder from "./seeders/admin-root-user.seeder";
import db from "@/lib/db";

dotenv.config();

const seeders: PrismaDatabaseSeederCollection = [
    AdminRootUserSeeder
];

async function main() {
    console.log("🌱 Starting the database seeding...");

    try {
        await Promise.all(seeders.map((seeder) => seeder(db)));

        console.log("✅ Seeding completed successfully!");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
    } finally {
        await db.$disconnect();
    }
}

main();
