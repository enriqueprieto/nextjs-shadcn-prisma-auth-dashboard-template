import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  res.setHeader("Set-Cookie", "next-auth.session-token=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax");
  res.status(200).json({ message: "Logged out" });
}
