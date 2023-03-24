// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

import z, { ZodError } from 'zod';

const schema = z.object({
  pollId: z.number(),
  optionId: z.number(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | Response | ZodError>
) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  const body = await schema.safeParseAsync(req.body);

  if (!body.success) {
    return res.status(400).json(body.error);
  }

  const poll = await prisma.poll.findFirst({ where: { id: body.data.pollId } });

  if (!poll) {
    return res.status(404).send('Poll not found');
  }

  if (poll.endDate && new Date() > new Date(poll.endDate)) {
    return res.status(400).send('Poll has ended');
  }

  const options = await prisma.pollOption.findMany({
    where: { pollId: body.data.pollId },
  });

  if (!options.some((option) => option.id === body.data.optionId)) {
    return res.status(400).send('Invalid option');
  }

  const ipAddress = (req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress) as string;

  const userAgent = req.headers['user-agent'] as string;

  // // Remove existing votes
  // await prisma.vote.deleteMany({
  //   where: { pollId: body.data.pollId, ipAddress },
  // });

  await prisma.vote.create({ data: { ...body.data, ipAddress, userAgent } });

  res.status(200).send('Vote created');
}
