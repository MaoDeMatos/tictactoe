import { FC } from "react";
import tw, { TwStyle } from "twin.macro";

import { HasChildren } from "../../types/GeneralTypes";

export const BaseCard: FC<HasChildren> = ({ children, ...props }) => {
  return (
    <div tw="rounded-2xl p-2" {...props}>
      {children}
    </div>
  );
};

export type GlassCardProps = {
  bgColor?: TwStyle | string;
} & HasChildren;

export const GlassCard: FC<GlassCardProps> = ({
  children,
  bgColor = tw`bg-slate-200/25`,
  ...props
}) => {
  return (
    <BaseCard css={[bgColor, tw`backdrop-blur-sm`]} {...props}>
      {children}
    </BaseCard>
  );
};
