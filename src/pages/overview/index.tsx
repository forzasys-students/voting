import PollItem from "@/components/PollItem";
import { Poll } from "@prisma/client";
import { InferGetServerSidePropsType } from "next";

export const getServerSideProps = async () => {
  const polls = await prisma.poll.findMany();

  // Error when parsing date, temp fix
  const test = JSON.parse(JSON.stringify(polls)) as Poll[];

  return { props: { polls: test } };
};

export default function Overview({
  polls,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <h2 className="text-3xl mb-5">Aktive polls</h2>
      <div className="flex flex-col">
        <PollItem />
        <PollItem />
      </div>
    </>
  );
}
