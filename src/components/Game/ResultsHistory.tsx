import { FC, Fragment } from "react";
import "twin.macro";

import { useStore } from "../../hooks/useStore";
import { GlassCard } from "../shared/Cards";
import { Circle, Cross } from "./Board";

export const ResultsHistory: FC = () => {
  const store = useStore();

  return (
    <GlassCard tw="w-full sm:w-96 flex flex-col divide-y-2 divide-primary-700">
      <div tw="pb-2 flex justify-between items-center font-bold">
        <p>Winner</p>
        <p tw="text-right">Date</p>
      </div>

      <div tw="max-h-80 pr-1 overflow-y-auto flex flex-col justify-between items-center divide-y divide-slate-100">
        {[...store.recordedGames].reverse().map(result => (
          <div
            key={result.id}
            tw="w-full pt-2 flex justify-between items-center pb-1 px-2"
          >
            <div tw="inline-flex justify-center items-center">
              {result.winner ? (
                <Fragment>
                  {result.winner.symbol === "o" ? (
                    <Circle tw="mr-1 h-4 w-4 text-primary-500" />
                  ) : (
                    <Cross tw="mr-1 h-4 w-4 text-primary-500" />
                  )}
                  - {result.winner.name}
                </Fragment>
              ) : (
                "Tie !"
              )}
            </div>
            <p tw="text-right">{new Date(result.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
