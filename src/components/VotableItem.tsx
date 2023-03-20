/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { PollOption } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { queryClient } from '@/pages/_app';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface Props {
  pollOption: PollOption;
  votes: number;
  totalVotes: number;
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

  const [data] = useState({
    eventDate: '◯◯.◯◯.◯◯◯◯',
    videoLength: '◯◯:◯◯',
    videoOrigin: 'Oslo, Norway',
  });

  const precent = (props.votes / props.totalVotes) * 100;
  const progress = precent / 100;

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
    const textContainter = document.getElementsByClassName('text-container');
    const progressBar = document.getElementsByClassName('progress-bar');
    const percentage = document.getElementsByClassName('percentage');

    for (let i in textContainter) {
      if (textContainter.hasOwnProperty(i)) {
        textContainter[i].className =
          'bg-gray-200 lg:h-32 md:h-28 sm:h-24 h-20 w-full overflow-hidden grid grid-cols-5 gap-0 cursor-pointer hover:bg-gray-200 hover:shadow-lg z-0 text-container';
      }
    }

    for (let i in progressBar) {
      /*if (props.pollOption.id === votedId) {// Do (id of i's pollOption === props.pollOption.id)
        progressBar[i].className = 'absolute bg-sky-400 lg:h-32 md:h-28 sm:h-24 h-20 overflow-hidden z-10 w-11/12 progress-bar'
      }
      else*/ if (progressBar.hasOwnProperty(i)) {
        progressBar[i].className =
          'absolute bg-sky-400 lg:h-32 md:h-28 sm:h-24 h-20 overflow-hidden z-10 w-3/12 progress-bar';
      }
    }

    for (let i in percentage) {
      if (percentage.hasOwnProperty(i)) {
        percentage[i].className =
          'lg:text-xl md:text-base sm:text-sm text-sm text-right font-medium visible percentage';
      }
    }
  }

  // Fetch vote from local storage
  useEffect(() => {
    const myVote = userVote.get(props.pollOption.pollId);

    if (myVote) {
      setVotedId(myVote);
      showVotes();
    }
  }, [props.pollOption.pollId]);

  function myVote() {
    // console.log(props.pollOption.id);

    if (!vote.isLoading) {
      userVote.set(props.pollOption.pollId, props.pollOption.id);
      setVotedId(props.pollOption.id);

      vote.mutate();
    }

    showVotes();
  }

  return (
    <div
      className={
        votedId
          ? `brightness-${props.pollOption.id === votedId ? '100' : '75'}`
          : undefined
      }
    >
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
      <div
        className={
          'bg-[#f2f2f2] lg:h-32 md:h-28 sm:h-24 h-20 w-full overflow-hidden grid grid-cols-5 gap-0 cursor-pointer hover:bg-gray-200 hover:shadow-lg z-0 text-container'
        }
        onClick={myVote}
      >
        <div
          className="absolute bg-sky-400 lg:h-32 md:h-28 sm:h-24 h-20 overflow-hidden z-10 w-0 progress-bar"
          /*style={{ width: 384 * progress }}*/
        ></div>
        <div className="col-span-4 z-20">
          <div className="lg:ml-4 md:ml-4 sm:ml-3 ml-2 mt-1">
            <div className="flex">
              <p className="font-normal lg:text-base md:text-sm sm:text-xs text-xs">
                {data.eventDate.toString()}
              </p>
              <p className="mr-2 ml-2 font-normal lg:text-base md:text-sm sm:text-xs text-xs">
                {' '}
                |{' '}
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
        <div className="lg:mr-4 md:mr-4 sm:mr-3 mr-2 lg:mt-12 md:mt-10 sm:mt-9 mt-8 z-20">
          <p className="lg:text-xl md:text-base sm:text-sm text-sm text-right font-medium hidden percentage">
            {props.totalVotes
              ? ((props.votes / props.totalVotes) * 100).toFixed(0)
              : 0}
            %
          </p>
        </div>
      </div>
    </div>
  );
}
