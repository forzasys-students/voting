import { PollData } from '@/types/poll';

interface Props {
  poll: PollData;
}

function PollItemCard({ poll }: Props) {
  const active = !poll.endDate || new Date(poll.endDate) < new Date();

  const state = {
    text: active ? 'Avsluttet' : 'Aktiv',
    colorClass: active ? 'text-red-500' : 'text-green-500',
  };

  return (
    <div className="py-3 px-3 mb-4 bg-gray-100 hover:bg-gray-200">
      <div>
        <h3 className="text-xl">
          {poll.title} <span className={state.colorClass}>({state.text})</span>
        </h3>
        <p className="text-gray-600 text-sm">{poll.description}</p>
        <small className="text-gray-500 mt-3 block">
          {!poll.endDate && new Date(poll.date).toLocaleString()}
          {poll.endDate && (
            <span>
              {new Date(poll.date).toLocaleString()}
              <span className="mx-1">til</span>
              {new Date(poll.endDate).toLocaleString()}
            </span>
          )}
        </small>
      </div>
    </div>
  );
}

export default PollItemCard;
