import { useState } from "react";

export default function Poll() {
  const [data] = useState({
    id: 1,
    title: "Poll Title",
    description: "Poll Flavor Text",
    votes: 100,
  });

  const [totalVotes] = useState(100);

  const precent = data.votes / totalVotes;

  const progress = precent / 100;
  
  // width: ${precent * 100}%;

  return (
    <>
      <div>
        <h1 className="font-semibold text-6xl">{data.title}</h1>
        <h2 className="font-regular text-xl h-20">{data.description}</h2>
        <p className="font-light">{data.votes} votes</p>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
        <div className="bg-[#f2f2f2] flex lg:h-80 md:h-60 sm:h-52 h-44 lg:w-96 md:w-72 sm:w-60 w-56 relative">
          <div className="absolute bg-sky-400 lg:h-80 md:h-60 sm:h-60 h-44 overflow-hidden" style={{width:384*progress}}>
            <p className="text-sky-400">Secret text</p>
          </div>
          <video controls className="lg:w-full absolute"></video>
          <div className="lg:left-6 md:left-4 sm:left-3 left-2 lg:top-48 md:top-36 sm:top-28 top-28 lg:mt-2 md:mt-2 sm:mt-3 absolute">
            <div className="flex">
              <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">Event date</p>
              <p className="mr-2 ml-2 font-normal lg:text-base md:text-sm sm:text-xs text-xs"> | </p>
              <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">Video length</p>
            </div>
            <div className="lg:top-9 md:top-6 sm:top-6 top-5 lg:w-72 md:w-52 sm:w-44 w-44  absolute">
              <p className="font-medium lg:text-xl md:text-base sm:text-sm text-sm">Video Title</p>
            </div>
            <div className="lg:top-20 md:top-14 sm:top-14 top-11 absolute">
              <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">Video origin</p>
            </div>
          </div>
          <div className="absolute lg:right-6 md:right-4 sm:right-3 right-2 lg:top-60 md:top-44 sm:top-36 top-32 lg:mt-0 md:mt-0 sm:mt-1 mt-1">
            <p className="lg:text-xl md:text-base sm:text-sm text-sm">{(data.votes / totalVotes).toFixed(2)}%</p>
          </div>
        </div>
        <div className="bg-[#f2f2f2] flex lg:h-80 md:h-60 sm:h-52 h-44 lg:w-96 md:w-72 sm:w-60 w-56 relative">
          <div className="absolute bg-sky-400 lg:h-80 md:h-60 sm:h-60 h-44 overflow-hidden" style={{width:384*progress}}>
            <p className="text-sky-400">Secret text</p>
          </div>
          <video controls className="lg:w-full absolute"></video>
          <div className="lg:left-6 md:left-4 sm:left-3 left-2 lg:top-48 md:top-36 sm:top-28 top-28 lg:mt-2 md:mt-2 sm:mt-3 absolute">
            <div className="flex">
              <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">Event date</p>
              <p className="mr-2 ml-2 font-normal lg:text-base md:text-sm sm:text-xs text-xs"> | </p>
              <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">Video length</p>
            </div>
            <div className="lg:top-9 md:top-6 sm:top-6 top-5 lg:w-72 md:w-52 sm:w-44 w-44  absolute">
              <p className="font-medium lg:text-xl md:text-base sm:text-sm text-sm">Video Title</p>
            </div>
            <div className="lg:top-20 md:top-14 sm:top-14 top-11 absolute">
              <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">Video origin</p>
            </div>
          </div>
          <div className="absolute lg:right-6 md:right-4 sm:right-3 right-2 lg:top-60 md:top-44 sm:top-36 top-32 lg:mt-0 md:mt-0 sm:mt-1 mt-1">
            <p className="lg:text-xl md:text-base sm:text-sm text-sm">{(data.votes / totalVotes).toFixed(2)}%</p>
          </div>
        </div>
        <div className="bg-[#f2f2f2] flex lg:h-80 md:h-60 sm:h-52 h-44 lg:w-96 md:w-72 sm:w-60 w-56 relative">
          <div className="absolute bg-sky-400 lg:h-80 md:h-60 sm:h-60 h-44 overflow-hidden" style={{width:384*progress}}>
            <p className="text-sky-400">Secret text</p>
          </div>
          <video controls className="lg:w-full absolute"></video>
          <div className="lg:left-6 md:left-4 sm:left-3 left-2 lg:top-48 md:top-36 sm:top-28 top-28 lg:mt-2 md:mt-2 sm:mt-3 absolute">
            <div className="flex">
              <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">Event date</p>
              <p className="mr-2 ml-2 font-normal lg:text-base md:text-sm sm:text-xs text-xs"> | </p>
              <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">Video length</p>
            </div>
            <div className="lg:top-9 md:top-6 sm:top-6 top-5 lg:w-72 md:w-52 sm:w-44 w-44  absolute">
              <p className="font-medium lg:text-xl md:text-base sm:text-sm text-sm">Video Title</p>
            </div>
            <div className="lg:top-20 md:top-14 sm:top-14 top-11 absolute">
              <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">Video origin</p>
            </div>
          </div>
          <div className="absolute lg:right-6 md:right-4 sm:right-3 right-2 lg:top-60 md:top-44 sm:top-36 top-32 lg:mt-0 md:mt-0 sm:mt-1 mt-1">
            <p className="lg:text-xl md:text-base sm:text-sm text-sm">{(data.votes / totalVotes).toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </>
  );
}
