import { Poll, PollOption } from "@prisma/client";

export type PollData = Poll & {
  options: PollOption[];
};
