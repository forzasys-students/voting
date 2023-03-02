import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Poll() {
    const [data] = useState({
      id: 1,
      videoTitle: "Video Title",
      votes: 100,
      eventDate: "◯◯.◯◯.◯◯◯◯",
      videoLength: "◯◯:◯◯",
      videoOrigin: "Oslo, Norway"
    });

    const [totalVotes] = useState(100);

    const precent = data.votes / totalVotes;
  
    const progress = precent / 100;

  return (
    <div>
    <video controls className="aspect-video w-full"></video>
    <div className="bg-[#f2f2f2] lg:h-32 md:h-28 sm:h-24 h-20 w-full overflow-hidden grid grid-cols-5 gap-0">
      <div className="col-span-4">
        <div className="absolute bg-sky-400 lg:h-32 md:h-28 sm:h-24 h-20 overflow-hidden" style={{width:384*progress}}>
          <p className="text-sky-400">Secret text</p>
        </div>
        <div className="lg:ml-4 md:ml-4 sm:ml-3 ml-2 mt-1">
          <div className="flex">
            <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">{data.eventDate.toLocaleString()}</p>
            <p className="mr-2 ml-2 font-normal lg:text-base md:text-sm sm:text-xs text-xs"> | </p>
            <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">{data.videoLength.toLocaleString()}</p>
          </div>
          <div className="w-full">
            <p className="font-medium lg:text-xl md:text-base sm:text-sm text-sm">{data.videoTitle.toLocaleString()}</p>
          </div>
          <div>
            <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">{data.videoOrigin.toLocaleString()}</p>
          </div>
        </div>
      </div>
      <div className="lg:mr-4 md:mr-4 sm:mr-3 mr-2 lg:mt-12 md:mt-10 sm:mt-9 mt-8">
        <p className="lg:text-xl md:text-base sm:text-sm text-sm text-right font-medium">{(data.votes / totalVotes).toFixed(0)}%</p>
      </div>
    </div>
  </div>
  );
}