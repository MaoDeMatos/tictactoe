import { ElementType, FC } from "react";
import tw, { TwStyle } from "twin.macro";

import { HasChildren } from "../../types/GeneralTypes";

export type GlassCardProps = {
  as?: ElementType;
  bgColor?: TwStyle | string;
  size?: "sm" | "md" | "lg";
} & HasChildren;

export const GlassCard: FC<GlassCardProps> = ({
  as: Component = "div",
  bgColor,
  size,
  ...props
}) => {
  return (
    <Component
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
