import { useState } from "react";

export default function Poll() {
  const [data] = useState({
    id: 1,
    title: "Poll Title",
    description: "Poll Flavor Text",
    votes: 10,
  });

  const [totalVotes] = useState(100);

  const precent = data.votes / totalVotes;

  // width: ${precent * 100}%;

  return (
    <>
      <div>
        <h1 className="font-semibold text-6xl">{data.title}</h1>
        <h2 className="font-regular text-xl">{data.description}</h2>
        <p className="font-light">{data.votes} votes</p>
      </div>
      <div>
        <div className="bg-[#f2f2f2] flex lg:h-64 md:h-48 sm:h-36 relative">
          <div className="absolute md:left-96 lg:ml-32 bg-sky-400 w-96 lg:h-64 md:h-48 overflow-hidden">
            <p className="text-sky-400">Secret text</p>
          </div>
          <video controls className="lg:h-64 md:h-48 sm:h-36 absolute"></video>
          <div className="lg:left-96 lg:ml-32 md:left-96 md:ml-2 lg:top-0 md:top-4 absolute">
            <div className="flex lg:mt-6 lg:ml-6 md:mt-3 md:ml-3 sm:mt-1 sm:ml-1">
              <p className="font-normal text-lg">Event date</p>
              <p className="mr-2 ml-2 font-normal text-lg"> | </p>
              <p className="font-normal text-lg">Video length</p>
            </div>
            <div className="lg:mt-12 lg:ml-6 md:mt-4 md:ml-3 sm:mt-2 sm:ml-1">
              <p className="font-medium text-3xl">Video Title</p>
            </div>
            <div className="lg:mt-14 lg:ml-6 md:mt-4 md:ml-3 sm:mt-3 sm:ml-2">
              <p className="font-normal text-lg">Video origin</p>
            </div>
          </div>
          <div className="absolute lg:right-16 lg:top-28 md:hidden">
            <p className="text-3xl">{(data.votes / totalVotes).toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </>
  );
}
