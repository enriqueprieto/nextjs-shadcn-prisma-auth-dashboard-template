import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import db from "@/lib/db";

async function handleGet(req: NextApiRequest, res: NextApiResponse, userId: string) {
    try {
        const user = await db.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true, role: true },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse, userId: string) {
    const { name, email, role } = req.body;
    if (!name || !email || !role) {
        return res.status(400).json({ error: "Name, email, and role are required" });
    }

    try {
        const updatedUser = await db.user.update({
            where: { id: String(userId) },
            data: { name, email, role },
            select: { id: true, name: true, email: true, role: true },
        });

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to update user" });
    }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse, userId: string) {
    try {
        const deletedUser = await db.user.delete({
            where: { id: String(userId) },
        });

        return res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to delete user" });
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse, userId: string) {
    if (userId !== 'create') {
        return res.status(400).json({ error: "This endpoint only accpet `create` user request." });
    }
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "Name, email, password, and role are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
            },
            select: { id: true, name: true, email: true, role: true },
        });

        return res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to create user" });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query;
    const methodHandlers: any = {
        GET: handleGet,
        POST: handlePost,
        PUT: handlePut,
        DELETE: handleDelete,
    };

    const methodHandler = methodHandlers[req.method || 'GET'];
    if (!methodHandler) {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    return methodHandler(req, res, String(userId));
}
