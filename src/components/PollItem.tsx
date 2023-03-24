/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from 'react';
import { PollData } from '@/types/poll';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import nb from 'dayjs/locale/nb';
import Link from 'next/link';
import { pollEnded } from '@/lib/helpers';

dayjs.extend(relativeTime);
dayjs.locale(nb);

interface Props {
  poll: PollData;
}

export default function PollItem(props: Props) {
  // const [votes] = useState(100);

  const { poll } = props;

  const ended = useMemo(() => {
    return pollEnded(poll);
  }, [poll]);

  return (
    <Link href={`/poll/${props.poll.id}`}>
      <div className="relative mb-3 hover:shadow-xl">
        <img
          className="bg-black w-full"
          src={poll.options[0].thumbnailUrl}
          alt="Poll thumbnail"
        />
        <div className="bg-black">
          {poll.endDate && !ended && (
            <div className="absolute top-0 text-small text-white bg-[#10253E] bg-opacity-80 rounded-br-lg">
              Lukkes {dayjs(poll.endDate).fromNow()}
            </div>
          )}
          {poll.endDate && ended && (
            <div className="absolute top-0 text-small text-white bg-[#10253E] bg-opacity-80 rounded-br-lg">
              Avsteming har stengt
            </div>
          )}
          {/* <div className="absolute top-0 right-0 text-lg text-white bg-[#10253E] bg-opacity-80 rounded-bl-lg">
            {votes} votes
          </div> */}
          <div className="absolute bottom-16 text-xl text-white bg-[#10253E] bg-opacity-80 font-semibold rounded-r-lg p-2">
            {poll.title}
          </div>
          <div className="absolute bottom-0 text-wrap text-lg text-white bg-[#10253E] bg-opacity-50 p-">
            {poll.description}
          </div>
        </div>
      </div>
    </Link>
  );
}
