import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    const adminEmail = process.env.ADMIN_ROOT_EMAIL;
    const adminPassword = process.env.ADMIN_ROOT_PASSWORD;

    if (!adminEmail || !adminPassword) {
        console.error("`ADMIN_EMAIL` e `ADMIN_PASSWORD` precisam estar no `.env`");
        process.exit(1);
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

        console.log("✅ Usuário admin criado com sucesso!");
    } else {
        console.log("ℹ️  Usuário admin já existe.");
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
