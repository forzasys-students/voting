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
          <div className="absolute top-0 text-white bg-[#10253E] bg-opacity-70 rounded-br-lg">
            08.03.2023
          </div>
          <div className="absolute top-0 right-0 text-white bg-[#10253E] bg-opacity-70 rounded-bl-lg">
            {votes} votes
          </div>
          <div className="absolute bottom-16 text-[#10253E] bg-slate-200 bg-opacity-50 font-semibold rounded-r-lg">
            {props.poll.title}
          </div>
          <div className="absolute bottom-0 text-wrap text-white bg-[#10253E] bg-opacity-40">
            {props.poll.description}
          </div>
        </div>
      </div>
    </Link>
  );
}
