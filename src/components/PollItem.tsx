import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PollItem({ children }: any) {
  const [data] = useState({
    id: 1,
    title: "Kampens beste skåring!",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam suscipit nulla ornare luctus dictum. Curabitur in tellus nec dui congue porta. Vivamus convallis id quam ut iaculis. Morbi tortor lacus, aliquet vitae rutrum a, hendrerit at nisl. Phasellus suscipit auctor ligula vitae vestibulum. Maecenas quis pellentesque magna. Donec semper diam eget facilisis gravida. Aliquam erat volutpat. Phasellus nec elementum nibh. Praesent id imperdiet arcu, quis fringilla lectus.",
    date: new Date(),
    votes: 200,
    thumbnail_url:
      "https://d22hh18o76pkhl.cloudfront.net/mediabank/thumb/eliteserien/6115/05199.jpg",
  });

  return (
    <Link href={`/poll/${data.id}`}>
      <div className="w-auto shadow-lg bg-neutral-100 flex mb-3">
        <img
          src={data.thumbnail_url}
          className="box-content lg:h-60 lg:w-1/4 sm:w-1/3 hover:box-content bg-black"
          alt="Poll thumbnail"
          width={300}
          height={200}
        />
        <div className="w-3/4 space-x-4 space-y-8 m-2">
          <div className="align-top text-small text-neutral-500">
            {data.date.toLocaleString()} | {data.votes} votes
          </div>
          <div className="align-middle text-black font-semibold">
            {data.title}
          </div>
          <div className="align-bottom text-small text-neutral-500">
            {data.description}
          </div>
        </div>
      </div>
    </Link>
  );
}
