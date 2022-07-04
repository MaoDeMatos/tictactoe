import { FC } from "react";
import "twin.macro";

import { HasChildren } from "../../types/GeneralTypes";

export const BaseCard: FC<HasChildren> = ({ children, ...props }) => {
  return (
    <div tw="rounded-2xl p-2" {...props}>
      {children}
    </div>
  );
};

export const GlassCard: FC<HasChildren> = ({ children, ...props }) => {
  return (
    <BaseCard tw="bg-slate-200/25 backdrop-blur-sm" {...props}>
      {children}
    </BaseCard>
  );
};
