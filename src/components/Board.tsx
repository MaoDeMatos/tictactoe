import { FC } from "react";
import "twin.macro";

type BoardBoxType = {
  position: number;
  checked: "circle" | "cross" | null;
};

export const Board: FC = () => {
  const data: BoardBoxType[] = [];

  for (let i = 1; i <= 9; i++) {
    data.push({ position: i, checked: null });
  }

  return (
    <div tw="flex flex-wrap justify-between items-center w-56 h-56">
      {data.map((box, idx) => {
        console.log(box);
        return (
          <div
            tw="transition flex justify-center items-center cursor-pointer rounded-full w-[30%] h-[30%] hover:(bg-slate-100 text-slate-900)"
            key={idx}
          >
            {box.position}
          </div>
        );
      })}
    </div>
  );
};
