import { NextApiRequest, NextApiResponse } from "next";

import db from "@/lib/db";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { name, email, role } = req.query;
    
    const where: any = {};
    if (name) {
        where.name = { contains: String(name), mode: "insensitive" };
    }
    if (email) {
        where.email = { contains: String(email), mode: "insensitive" };
    }
    if (role) {
        where.role = String(role);
    }

    try {
        const users = await db.user.findMany({
            where,
            select: { id: true, name: true, email: true, role: true },
        });
    
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}
