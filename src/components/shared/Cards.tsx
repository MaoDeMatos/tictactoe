import { FC } from "react";
import tw, { TwStyle } from "twin.macro";

import { HasChildren } from "../../types/GeneralTypes";

export type GlassCardProps = {
  bgColor?: TwStyle | string;
  size?: "sm" | "md" | "lg";
} & HasChildren;

export const GlassCard: FC<GlassCardProps> = ({ bgColor, size, ...props }) => {
  return (
    <div
      css={[
        tw`backdrop-blur-sm`,
        bgColor ?? tw`bg-slate-200/25`,
        size === "sm"
          ? tw`rounded-md p-1`
          : size === "lg"
          ? tw`rounded-2xl p-4`
          : tw`rounded p-2`,
      ]}
      {...props}
    />
  );
};
