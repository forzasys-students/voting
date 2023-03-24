import { Poll } from '@prisma/client';

export const pollEnded = (poll: Poll): boolean => {
  return !!poll.endDate && new Date() > new Date(poll.endDate);
};
