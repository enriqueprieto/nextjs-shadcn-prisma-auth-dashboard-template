import bcrypt from "bcrypt";
import { PrismaDatabaseSeeder } from "../types";

const AdminRootUserSeeder: PrismaDatabaseSeeder = async (prisma) => {
    console.log("\n>> Starting the AdminRootUserSeeder seeder...");
    try {
        const adminEmail = process.env.ADMIN_ROOT_EMAIL || null;
        const adminPassword = process.env.ADMIN_ROOT_PASSWORD || null;
        
        if (!adminEmail || !adminPassword) {
            throw new Error("The enviroment variables `ADMIN_ROOT_EMAIL` and `ADMIN_ROOT_PASSWORD` not found. Please, check out your enviroment variables.");
        }

        const adminExists = await prisma.user.findUnique({
            where: { email: adminEmail },
        });
        
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
            await prisma.user.create({
                data: {
                    name: process.env.ADMIN_ROOT_NAME || 'Admin',
                    email: adminEmail,
                    password: hashedPassword,
                    role: "ADMIN",
                },
            });
    
            console.log("✅ Admin root user created succefully!");
        } else {
            console.log("ℹ️ Admin root user have already exists.");
        }
    } catch (error) {
        console.error(error);
        process.exit(1);
    } finally {
        console.log(">> Finishing the AdminRootUserSeeder seeder!\n");
    }
};

export default AdminRootUserSeeder;