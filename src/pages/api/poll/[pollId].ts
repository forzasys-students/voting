import { Poll } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { ZodError } from "zod";
import { pollSchema } from ".";

import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Poll | ZodError>
) {
  const { pollId } = req.query;

  // Fetch poll
  if (req.method === "GET") {
    const poll = await prisma.poll.findFirst({
      include: { options: true, votes: true },
      where: { id: Number(pollId) },
    });

    if (!poll) {
      return res.status(404).send("Poll not found");
    }

    return res.json(poll);
  }

  // Authenticate user
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).send("Unauthorized");
  }

  // Edit Poll
  if (req.method === "PUT") {
    const poll = await prisma.poll.findFirst({
      include: { options: true, votes: true },
      where: { id: Number(pollId) },
    });

    if (!poll) {
      return res.status(404).send("Poll not found");
    }

    const body = await pollSchema.safeParseAsync(req.body);

    if (!body.success) {
      return res.status(400).json(body.error);
    }

    const updatedPoll = await prisma.poll.update({
      where: { id: poll.id },
      data: {
        title: body.data.title,
        description: body.data.description,
      },
    });

    return res.json(updatedPoll);
  }

  // Delete Poll
  if (req.method === "DELETE") {
    const poll = await prisma.poll.findFirst({
      include: { options: true, votes: true },
      where: { id: Number(pollId) },
    });

    if (!poll) {
      return res.status(404).send("Poll not found");
    }

    await prisma.poll.delete({ where: { id: poll.id } });

    return res.status(200);
  }
}
