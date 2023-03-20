import { Vote } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ZodError } from 'zod';
import prisma from '../../../lib/prisma';

// export type PartialVote = Pick<Vote, 'id' | 'optionId'>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | number[] | ZodError>
) {
  const { pollId } = req.query;

  // Fetch poll
  if (req.method === 'GET') {
    const votes = await prisma.vote.findMany({
      where: { pollId: Number(pollId) },
      select: {
        id: true,
        optionId: true,
      },
    });

    if (!votes) {
      return res.status(404).send('Votes not found');
    }

    return res.json(votes.map((vote) => vote.optionId));
  }
}
