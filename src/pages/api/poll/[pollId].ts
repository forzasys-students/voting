import { Poll } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Poll>
) {
  const { pollId } = req.query;

  if (req.method === "GET") {
    const poll = await prisma.poll.findFirst({
      include: { options: true },
      where: { id: Number(pollId) },
    });

    if (!poll) {
      return res.status(404).send("Poll not found");
    }

    return res.json(poll);
  }
}
