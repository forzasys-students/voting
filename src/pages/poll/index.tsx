import VotableItem from "@/components/VotableItem";
import { PollData } from "@/types/poll";
import { useState } from "react";

interface Props {
  poll: PollData;
}

export default function Poll(props: Props) {
  const [votes] = useState(100);
  const [totalVotes] = useState(100);

  const precent = votes / totalVotes;

  const progress = precent / 100;

  // width: ${precent * 100}%;

  return (
    <>
      <div>
        <h1 className="font-bold lg:text-6xl md:text-5xl sm:text-4xl text-3xl">
          {props.poll.title}
        </h1>
        <h2 className="font-medium lg:text-xl md:text-lg sm:text-base text-sm lg:h-20 md:h-16 sm:h-14 h-12">
          {props.poll.description}
        </h2>
        <p className="font-light">{votes} votes</p>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
        {props.poll &&
          props.poll.options.map((pollOption) => {
            return <VotableItem key={pollOption.id} pollOption={pollOption} />;
          })}
      </div>
    </>
  );
}
