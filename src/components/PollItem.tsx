/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from 'react';
import { PollData } from '@/types/poll';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import nb from 'dayjs/locale/nb';
import Link from 'next/link';

dayjs.extend(relativeTime);
dayjs.locale(nb);

interface Props {
  poll: PollData;
}

export default function PollItem(props: Props) {
  // const [votes] = useState(100);

  const ended = useMemo(() => {
    return !!props.poll.endDate && new Date() > new Date(props.poll.endDate);
  }, [props.poll.endDate]);

  return (
    <Link href={`/poll/${props.poll.id}`}>
      <div className="relative mb-3 hover:shadow-xl">
        <img
          className="bg-black w-full"
          src={props.poll.options[0].thumbnailUrl}
          alt="Poll thumbnail"
        />
        <div className="bg-black">
          {props.poll.endDate && !ended && (
            <div className="absolute top-0 text-small text-white bg-[#10253E] bg-opacity-80 rounded-br-lg">
              Lukkes {dayjs(props.poll.endDate).fromNow()}
            </div>
          )}
          {props.poll.endDate && ended && (
            <div className="absolute top-0 text-small text-white bg-[#10253E] bg-opacity-80 rounded-br-lg">
              Avsteming har stengt
            </div>
          )}
          {/* <div className="absolute top-0 right-0 text-lg text-white bg-[#10253E] bg-opacity-80 rounded-bl-lg">
            {votes} votes
          </div> */}
          <div className="absolute bottom-16 text-xl text-white bg-[#10253E] bg-opacity-80 font-semibold rounded-r-lg p-2">
            {props.poll.title}
          </div>
          <div className="absolute bottom-0 text-wrap text-lg text-white bg-[#10253E] bg-opacity-50 p-">
            {props.poll.description}
          </div>
        </div>
      </div>
    </Link>
  );
}
