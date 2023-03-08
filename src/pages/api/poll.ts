import { Poll } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import z, { ZodError } from "zod";
import prisma from "../../lib/prisma";
import { authOptions } from "./auth/[...nextauth]";

const pollOptionSchema = z.object({
  id: z.string(),
  date: z.string().datetime(),
  description: z.string(),
  video_url: z.string().url(),
  thumbnail_url: z.string().url(),
});

const pollSchema = z.object({
  title: z.string(),
  description: z.string(),
  options: z.array(pollOptionSchema).min(1),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | ZodError | Poll | Poll[]>
) {
  if (req.method === "GET") {
    const polls = await prisma.poll.findMany({ include: { options: true } });
    return res.json(polls);
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).send("Unauthorized");
  }

  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const body = await pollSchema.safeParseAsync(req.body);

  if (!body.success) {
    return res.status(400).json(body.error);
  }

  const { data } = body;

  const poll = await prisma.poll.create({
    data: {
      title: data.title,
      description: data.description,
      creatorId: session.user.userId,
    },
  });

  await prisma.pollOption.createMany({
    data: data.options.map((option) => ({
      date: new Date(option.date),
      description: option.description,
      videoUrl: option.video_url,
      thumbnailUrl: option.thumbnail_url,
      pollId: poll.id,
      eventId: option.id,
    })),
  });

  return res.status(200).json(poll);
}
