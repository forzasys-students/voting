import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";

const schema = z.object({
  title: z.string(),
  description: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (req.method !== "POST") {
    // Only allow POST requests
    return res.status(405).send("Method not allowed");
  }
}
