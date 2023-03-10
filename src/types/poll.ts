import { Poll, PollOption, Vote } from "@prisma/client";

export type PollData = Poll & {
  options: PollOption[];
  votes: Vote[];
};
