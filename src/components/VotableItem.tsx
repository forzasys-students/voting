import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { PollOption } from "@prisma/client";
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface Props {
  pollOption: PollOption;
}

export default function Poll(props: Props) {
  const [data] = useState({
    id: 1,
    videoTitle: "Video Title",
    votes: 100,
    eventDate: "◯◯.◯◯.◯◯◯◯",
    videoLength: "◯◯:◯◯",
    videoOrigin: "Oslo, Norway",
  });

  const [votes] = useState(50);
  const [totalVotes] = useState(100);

  const precent = votes / totalVotes;
  const progress = precent / 100;

  function myVote() {
    alert("I work");
  }

  return (
    <div>
      <ReactPlayer
        controls
        playing
        width={"auto"}
        height={"auto"}
        light={props.pollOption.thumbnailUrl}
        url={props.pollOption.videoUrl}
      ></ReactPlayer>
      {/*<video controls className="aspect-video w-full" poster="https://d22hh18o76pkhl.cloudfront.net/mediabank/thumb/eliteserien/6115/05199.jpg">
      <source src="https://api.forzasys.com/eliteserien/playlist.m3u8/6115:5189000:5214000/Manifest.m3u8" type="application/x-mpegURL"></source>
    </video>*/}
      <div
        className="bg-[#f2f2f2] lg:h-32 md:h-28 sm:h-24 h-20 w-full overflow-hidden grid grid-cols-5 gap-0 cursor-pointer hover:bg-gray-300 hover:shadow-lg"
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
            {(data.votes / totalVotes).toFixed(0)}%
          </p>
        </div>
      </div>
    </div>
  );
}
