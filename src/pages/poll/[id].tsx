import { PollData } from "@/types/poll";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import PollPage from "./index";

interface Context {
  query: {
    id: string;
  };
}

export const getServerSideProps = async (context: Context) => {
  const { id } = context.query;

  const parsedId = parseInt(id, 10);

  if (!parsedId) return { props: { poll: null } };

  const response = await fetch(`http://localhost:3000/api/poll/${id}`);
  const data = (await response.json()) as PollData;

  return { props: { poll: data } };
};

export default function Poll({
  poll,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!poll) return <p>Kunne ikke hente avstemning</p>;

  return <PollPage poll={poll} />;
}
