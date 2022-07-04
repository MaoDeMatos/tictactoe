import { PlusIcon } from "@heroicons/react/outline";
import { FC, useState } from "react";
import "twin.macro";
import "twin.macro";

import { BaseButton } from "../components/shared/Buttons";
import { Card, EmptyStateCard } from "../components/shared/Cards";

// import { Transition } from "../shared/Transition";

type cardContent = {
  id: number;
  heading: string;
  body: string;
};

export const Dashboard: FC = () => {
  const [cards, setCards] = useState<cardContent[]>([]);

  const addCard = () => {
    setCards([
      ...cards,
      {
        id: cards.length + 1,
        heading: `Card ${cards.length + 1}`,
        body: `Content ${cards.length + 1}`,
      },
    ]);
  };

  return (
    <div tw="min-h-full flex flex-col gap-2 items-center text-xl">
      {cards.length > 0 && (
        <div tw="w-full flex gap-2">
          <BaseButton tw="ml-auto" onClick={addCard} />
        </div>
      )}
      <div tw="flex flex-wrap w-full justify-center items-center px-4 py-6 sm:px-0 gap-4 md:all-child:(max-w-sm)">
        {cards.map(el => (
          // <Transition
          //   key={el.id}
          //   show={true}
          //   enterFrom={tw`opacity-0`}
          //   enterTo={tw`opacity-100`}
          //   leaveFrom={tw`opacity-100`}
          //   leaveTo={tw`opacity-0`}
          // >
          <Card tw="flex flex-col gap-2" key={el.id}>
            <h3 tw="font-bold font-montserrat text-xl">{el.heading}</h3>
            <p>{el.body}</p>
          </Card>
          // </Transition>
        ))}

        {cards.length < 1 && (
          <EmptyStateCard
            onClick={addCard}
            // onClick={() => console.log("You clicked an EmptyState card !")}
          >
            <p tw="flex">
              <PlusIcon tw="h-5 w-5 mr-1" />
              Add a card
            </p>
          </EmptyStateCard>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
