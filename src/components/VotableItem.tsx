/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { PollOption } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { queryClient } from '@/pages/_app';

import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(LocalizedFormat);

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface Props {
  pollOption: PollOption;
  votes: number;
  totalVotes: number;
  ended: boolean;

  showVotes: boolean;
  setShowVotes: (arg0: boolean) => void;
}

const userVote = {
  get: (pollId: number): number | null => {
    const item = localStorage.getItem(`vote-${pollId}`);

    if (!item) return null;
    const optionId = parseInt(item, 10);

    return optionId || null;
  },
  set: (pollId: number, optionId: number) => {
    localStorage.setItem(`vote-${pollId}`, String(optionId));
  },
};

export default function Poll(props: Props) {
  const [votedId, setVotedId] = useState<number | null>(null);

  const precentage =
    props.totalVotes !== 0 ? props.votes / props.totalVotes : 0;

  const vote = useMutation(
    () => {
      const data = {
        pollId: props.pollOption.pollId,
        optionId: props.pollOption.id,
      };

      return fetch('/api/votes', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    {
      onSuccess: () => {
        toast.success('Stemme registrert');

        // Refetch votes
        queryClient.invalidateQueries(['votes', props.pollOption.pollId]);
      },
      onError: () => toast.error('Noe gikk galt'),
    }
  );

  function showVotes() {
    const textBackdrop = document.getElementsByClassName('text-backdrop');
    const textContainer = document.getElementsByClassName('text-container');

    for (let i in textBackdrop) {
      if (textBackdrop.hasOwnProperty(i)) {
        textBackdrop[i].className =
          'relative bg-gray-200 lg:h-32 md:h-28 sm:h-24 h-20 w-full overflow-visible cursor-pointer hover:bg-gray-200 hover:shadow-lg z-0 text-backdrop';
      }
    }

    for (let i in textContainer) {
      if (textContainer.hasOwnProperty(i)) {
        textContainer[i].className = 'col-span-4 z-20 text-container';
      }
    }
  }

  useEffect(() => {
    // Fetch vote from local storage
    const myVote = userVote.get(props.pollOption.pollId);

    // Set vote from localStorage
    if (myVote) setVotedId(myVote);

    // Show result if voted or poll has ended
    if (props.ended || myVote) showVotes();
    if (props.ended || myVote) props.setShowVotes(true);
    //
  }, [props, props.ended, props.pollOption.pollId]);

  function registerVote() {
    if (props.ended || votedId !== null) return;

    if (!vote.isLoading) {
      userVote.set(props.pollOption.pollId, props.pollOption.id);
      setVotedId(props.pollOption.id);

      vote.mutate();
    }

    showVotes();
    props.setShowVotes(true);
  }

  return (
    <div
      className={
        /*votedId
          ? `brightness-${props.pollOption.id === votedId ? '100' : '75'}`
          : undefined*/
        'container'
      }
    >
      <div className="relative">
        <ReactPlayer
          aspect
          controls
          playing
          width={'100%'}
          height={'auto'}
          light={
            <img
              src={props.pollOption.thumbnailUrl}
              alt="Thumbnail"
              className="w-full"
            />
          }
          url={props.pollOption.videoUrl}
        ></ReactPlayer>
      </div>
      <div
        className={
          'relative bg-[#f2f2f2] hover:bg-[#e2e2e2] hover:shadow-lg lg:h-32 md:h-28 sm:h-24 h-20 w-full overflow-visible cursor-pointer z-0 text-backdrop'
        }
      >
        <div className="absolute grid grid-cols-5 gap-0">
          <div className="col-span-5 z-20 text-container">
            <div className="lg:ml-4 md:ml-4 sm:ml-3 ml-2 mt-1">
              <div className="flex">
                <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">
                  {dayjs(props.pollOption.date).format('L LT')}
                </p>
                <p className="mr-2 ml-2 font-normal lg:text-base md:text-sm sm:text-xs text-xs">
                  {' '}
                  |{' '}
                </p>
                <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">
                  Round: {props.pollOption.round}
                </p>
              </div>
              <div className="w-full">
                <p className="font-semibold lg:text-xl md:text-base sm:text-sm text-sm">
                  {props.pollOption.description}
                </p>
              </div>
              <div>
                <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">
                  {props.pollOption.tournamentName}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:mr-4 md:mr-4 sm:mr-3 mr-2 lg:mt-12 md:mt-10 sm:mt-9 mt-8 z-20">
            <p
              className={`lg:text-xl md:text-base sm:text-sm text-sm text-right font-medium ${
                props.showVotes ? 'visible' : 'hidden'
              }`}
            >
              {props.totalVotes
                ? ((props.votes / props.totalVotes) * 100).toFixed(0)
                : 0}
              %
            </p>
          </div>
        </div>
        <div
          className={`bg-[#00aeea] hover:bg-blue-500 pt-2 pb-2 pr-4 pl-4 m-auto absolute rounded-2xl top-[100%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
            props.showVotes ? 'hidden' : 'visible'
          }`}
          onClick={registerVote}
        >
          <p className="lg:text-xl md:text-base sm:text-sm text-sm font-bold">
            Stem
          </p>
        </div>
        <div
          className={`transition-[width] duration-1000 bg-[#00aeea] lg:h-32 md:h-28 sm:h-24 h-20 overflow-hidden z-10 progress-bar ${
            !props.showVotes ? 'hidden' : ''
          }`}
          style={{ width: `${precentage * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
