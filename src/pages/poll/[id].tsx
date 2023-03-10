import { useRouter } from "next/router";
import PollPage from "./index";

export default function Poll() {
  const router = useRouter();
  const { id } = router.query;

  return <PollPage />;
}
