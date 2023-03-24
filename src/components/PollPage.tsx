import VotableItem from '@/components/VotableItem';

import { PollData } from '@/types/poll';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import toast from 'react-hot-toast';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import nb from 'dayjs/locale/nb';

dayjs.extend(relativeTime);
dayjs.locale(nb);

const fetchVotes = async (pollId: number): Promise<number[]> => {
  const response = await fetch(`/api/votes/${pollId}`);
  const data = (await response.json()) as number[];

  return data;
};

interface Props {
  poll: PollData;
}

export default function Poll(props: Props) {
  const session = useSession();
  const router = useRouter();

  const { title, description, options, endDate } = props.poll;

  const voteData = useQuery<number[]>({
    queryKey: ['votes', props.poll.id],
    queryFn: () => fetchVotes(props.poll.id),
    initialData: [],
    keepPreviousData: true,
  });

  const totalVotes = useMemo(() => voteData.data.length, [voteData]);

  const getVotes = (optionId: number) => {
    return voteData.data.filter((vote) => vote === optionId).length;
  };

  const deletePoll = useMutation(
    () => {
      return fetch(`/api/poll/${props.poll.id}`, {
        method: 'DELETE',
      });
    },
    {
      onSuccess: () => {
        toast.success('Avstemning slettet');
        router.push('/admin');
      },
    }
  );

  return (
    <>
      {session.status === 'authenticated' && (
        <button
          disabled={deletePoll.isLoading}
          onClick={() => deletePoll.mutate()}
          className="bg-gray-100 hover:bg-gray-200 p-3 mb-3"
        >
          Slett avstemning
        </button>
      )}

      <div>
        {endDate && (
          <span className="text-slate-600">
            {new Date() > new Date(endDate) && (
              <span>Avsteming er avsluttet</span>
            )}

            {new Date() < new Date(endDate) && (
              <span>Lukkes {dayjs(endDate).fromNow()}</span>
            )}
          </span>
        )}
        <h1 className="font-bold lg:text-6xl md:text-5xl sm:text-4xl text-3xl">
          {title}
        </h1>
        <h2 className="font-medium lg:text-xl md:text-lg sm:text-base text-sm lg:h-20 md:h-16 sm:h-14 h-12">
          <span>{description}</span>
        </h2>
        <p className="font-light">
          {voteData.data.length}{' '}
          {voteData.data.length === 1 ? 'stemme' : 'stemmer'}
        </p>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">
        {options.map((pollOption) => {
          return (
            <VotableItem
              key={pollOption.id}
              pollOption={pollOption}
              votes={getVotes(pollOption.id)}
              totalVotes={totalVotes}
              ended={!!endDate && new Date() > new Date(endDate)}
            />
          );
        })}
      </div>
    </>
  );
}
