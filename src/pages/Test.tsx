import { useState } from "react";
import "twin.macro";

import { BaseButton } from "../components/shared/Buttons";
import {
  AddNewCard,
  Card,
  EmptyStateCard,
  PulsingCard,
} from "../components/shared/Cards";

const Test = () => {
  const [count, setCount] = useState(0);

  const pulsingCards = [];

  for (let i = 0; i < 24; i++) {
    pulsingCards.push(pulsingCards.length);
  }

  return (
    <div tw="min-h-full flex flex-col gap-4 items-center text-xl">
      <div tw="w-full flex flex-col sm:flex-row gap-2 justify-center items-center">
        <BaseButton type="primary" size="sm" />
        <BaseButton type="primary" />
        <BaseButton type="primary" size="lg" />
      </div>
      <div tw="w-full flex flex-col sm:flex-row gap-2 justify-center items-center">
        <BaseButton type="secondary" size="sm" />
        <BaseButton type="secondary" />
        <BaseButton type="secondary" size="lg" />
      </div>

      <div tw="flex flex-wrap w-full justify-center items-center px-4 py-6 sm:px-0 gap-4 md:all-child:(max-w-sm)">
        {pulsingCards.map(el => (
          <PulsingCard key={el} />
        ))}

        <Card>
          <h2>Card</h2>
        </Card>
        <EmptyStateCard />
        <AddNewCard />
      </div>

      <div tw="flex flex-col justify-center items-center gap-8 text-center">
        <button
          tw="transition px-4 py-2 border border-slate-600 rounded-lg shadow text-lg hover:(scale-105 shadow-xl)"
          type="button"
          onClick={() => setCount(count + 1)}
        >
          Count: {count}
        </button>

        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
      </div>
    </div>
  );
};

export default Test;
