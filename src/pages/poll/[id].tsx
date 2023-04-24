import { PollData } from '@/types/poll';
import { InferGetServerSidePropsType } from 'next';
import PollPage from '../../components/PollPage';

interface Context {
  query: {
    id: string;
  };
}

export const getServerSideProps = async (context: Context) => {
  const { id } = context.query;

  const parsedId = parseInt(id, 10);

  if (!parsedId) return { props: { poll: null } };

  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/poll/${id}`);

    const data = (await response.json()) as PollData;

    return { props: { poll: data } };
  } catch (error) {
    return { props: { poll: null } };
  }
};

export default function Poll({
  poll,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!poll) return <p>Kunne ikke hente avstemning</p>;

  return <PollPage poll={poll} />;
}
