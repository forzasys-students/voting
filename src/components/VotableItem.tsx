import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { PollOption } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface Props {
  pollOption: PollOption;
  votes: number;
  totalVotes: number;
}

export default function Poll(props: Props) {
  const [data] = useState({
    eventDate: "◯◯.◯◯.◯◯◯◯",
    videoLength: "◯◯:◯◯",
    videoOrigin: "Oslo, Norway",
  });

  const precent = props.votes / props.totalVotes;
  const progress = precent / 100;

  const vote = useMutation(
    () => {
      const data = {
        pollId: props.pollOption.pollId,
        optionId: props.pollOption.id,
      };

      return fetch("/api/vote", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    {
      onSuccess: () => toast.success("Stemme registrert"),
      onError: () => toast.error("Noe gikk galt"),
    }
  );

  function myVote() {
    if (!vote.isLoading) {
      vote.mutate();
    }
  }

  return (
    <div>
      <ReactPlayer
        aspect
        controls
        playing
        width={"100%"}
        height={"auto"}
        light={
          <img
            src={props.pollOption.thumbnailUrl}
            alt="Thumbnail"
            className="w-full"
          />
        }
        url={props.pollOption.videoUrl}
      ></ReactPlayer>
      <div
        className="bg-[#f2f2f2] lg:h-32 md:h-28 sm:h-24 h-20 w-full overflow-hidden grid grid-cols-5 gap-0 cursor-pointer hover:bg-gray-200 hover:shadow-lg"
        onClick={myVote}
      >
        <div
          className="absolute bg-sky-400 lg:h-32 md:h-28 sm:h-24 h-20 overflow-hidden"
          style={{ width: 384 * progress }}
        >
          <p className="text-sky-400">Secret text</p>
        </div>
        <div className="col-span-4">
          <div className="lg:ml-4 md:ml-4 sm:ml-3 ml-2 mt-1">
            <div className="flex">
              <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">
                {data.eventDate.toString()}
              </p>
              <p className="mr-2 ml-2 font-normal lg:text-base md:text-sm sm:text-xs text-xs">
                {" "}
                |{" "}
              </p>
              <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">
                {data.videoLength.toString()}
              </p>
            </div>
            <div className="w-full">
              <p className="font-semibold lg:text-xl md:text-base sm:text-sm text-sm">
                {props.pollOption.description}
              </p>
            </div>
            <div>
              <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">
                {data.videoOrigin.toString()}
              </p>
            </div>
          </div>
        </div>
        <div className="lg:mr-4 md:mr-4 sm:mr-3 mr-2 lg:mt-12 md:mt-10 sm:mt-9 mt-8">
          <p className="lg:text-xl md:text-base sm:text-sm text-sm text-right font-medium">
            {props.totalVotes ? (props.votes / props.totalVotes).toFixed(0) : 0}
            %
          </p>
        </div>
      </div>
    </div>
  );
}
