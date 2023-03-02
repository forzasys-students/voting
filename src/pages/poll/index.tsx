import VotableItem from "@/components/VotableItem";
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
        <h1 className="font-bold lg:text-6xl md:text-5xl sm:text-4xl text-3xl">{data.title}</h1>
        <h2 className="font-medium lg:text-xl md:text-lg sm:text-base text-sm lg:h-20 md:h-16 sm:h-14 h-12">{data.description}</h2>
        <p className="font-light">{data.votes} votes</p>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
        <VotableItem></VotableItem>
        <VotableItem></VotableItem>
        <VotableItem></VotableItem>
        <VotableItem></VotableItem>
        <VotableItem></VotableItem>
        <VotableItem></VotableItem>
      </div>
    </>
  );
}
