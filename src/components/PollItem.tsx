/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import { PollData } from "@/types/poll";

interface Props {
  poll: PollData;
}

export default function PollItem(props: Props) {
  const [votes] = useState(100);

  return (
    <Link href={`/poll/${props.poll.id}`}>
      <div className="relative mb-3 hover:shadow-xl">
        <img
          className="bg-black"
          src={props.poll.options[0].thumbnailUrl}
          alt="Poll thumbnail"
        />
        <div className="bg-black">
          <div className="absolute top-0 text-lg text-white bg-[#10253E] bg-opacity-80 rounded-br-lg">
            08.03.2023
          </div>
          <div className="absolute top-0 right-0 text-lg text-white bg-[#10253E] bg-opacity-80 rounded-bl-lg">
            {votes} votes
          </div>
          <div className="absolute bottom-16 text-xl text-white bg-[#10253E] bg-opacity-80 font-semibold rounded-r-lg">
            {props.poll.title}
          </div>
          <div className="absolute bottom-0 text-wrap text-lg text-white bg-[#10253E] bg-opacity-50">
            {props.poll.description}
          </div>
        </div>
      </div>
    </Link>
  );
}
