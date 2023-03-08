import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PollItem({ children }: any) {
  const [data] = useState({
    id: 1,
    title: "Kampens beste skåring!",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit nulla ornare luctus dictum.",
    date: new Date(),
    votes: 200,
    thumbnail_url:
      "https://d22hh18o76pkhl.cloudfront.net/mediabank/thumb/eliteserien/6115/05199.jpg",
  });

  return (
    <Link href={`/poll/${data.id}`}>
      <div className="relative mb-3 hover:shadow-xl">
        <img
          className="bg-black"
          src={data.thumbnail_url}
          alt="Poll thumbnail"
        />
        <div className="bg-black">
          <div className="absolute top-0 text-white bg-[#10253E] bg-opacity-70 rounded-br-lg">
            {data.date.toLocaleString()} 
          </div>
          <div className="absolute top-0 right-0 text-white bg-[#10253E] bg-opacity-70 rounded-bl-lg">
          {data.votes} votes
          </div>
          <div className="absolute bottom-16 text-[#10253E] bg-slate-200 bg-opacity-50 font-semibold rounded-r-lg">
            {data.title}
          </div>
          <div className="absolute bottom-0 text-white bg-[#10253E] bg-opacity-40">
            {data.description}
          </div>
        </div>
        
        
      </div>
    </Link>
  )
}