import { FC } from "react";
import { HiOutlineX } from "react-icons/hi";
import tw, { css, theme } from "twin.macro";

import { GlassCard } from "./shared/Cards";

const Circle = tw.div`rounded-full border-4 border-current w-4/5 h-4/5`;
const Cross = tw(HiOutlineX)`w-full h-full`;

type BoardBoxType = {
  position: number;
  checked: "circle" | "cross" | null;
};

export const Board: FC = () => {
  const data: BoardBoxType[] = [];
  const possibleValues: BoardBoxType["checked"][] = ["circle", "cross", null];

  for (let i = 1; i <= 9; i++) {
    data.push({
      position: i,
      checked:
        possibleValues[Math.floor(Math.random() * possibleValues.length)],
    });
  }

  return (
    <GlassCard
      tw="grid grid-cols-3 grid-rows-3 grid-flow-row text-3xl rounded-xl overflow-hidden w-64 h-64 border-2 border-primary-900"
      css={{ boxShadow: "0 .25rem 1rem" + theme`colors.primary.900` + "CC" }}
      bgColor={tw`bg-primary-400/25`}
    >
      {data.map((box, idx) => (
        <div
          key={idx}
          tw="relative transition flex justify-center items-center cursor-pointer hover:(bg-slate-100 text-primary-900) border border-transparent p-2"
          css={css`
            &:nth-of-type(-n + 3) {
              ${tw`border-b-slate-50`}
            }
            &:nth-of-type(3n) {
              ${tw`border-l-slate-50`}
            }
            &:nth-of-type(3n + 1) {
              ${tw`border-r-slate-50`}
            }
            &:nth-of-type(n + 7) {
              ${tw`border-t-slate-50`}
            }
            &:first-of-type {
              ${tw`rounded-tl-md`}
            }
            &:nth-of-type(3) {
              ${tw`rounded-tr-md`}
            }
            &:nth-of-type(7) {
              ${tw`rounded-bl-md`}
            }
            &:last-of-type {
              ${tw`rounded-br-md`}
            }
          `}
        >
          {box.checked === "circle" ? (
            <Circle />
          ) : box.checked === "cross" ? (
            <Cross />
          ) : // box.position
          null}
        </div>
      ))}
    </GlassCard>
  );
};
