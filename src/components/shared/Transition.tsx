import { ClassNames } from "@emotion/react";
import { Transition as HeadlessTransition } from "@headlessui/react";
import { ElementType, FC } from "react";
import { TwStyle } from "twin.macro";

import { HasChildren } from "../../types/GeneralTypes";

export type TransitionProps = HasChildren & {
  enter?: string | TwStyle;
  enterFrom?: string | TwStyle;
  enterTo?: string | TwStyle;
  leave?: string | TwStyle;
  leaveFrom?: string | TwStyle;
  leaveTo?: string | TwStyle;
  show?: boolean;
  appear?: boolean;
  as?: ElementType;
};

export const Transition: FC<TransitionProps> & {
  Child?: FC<TransitionProps>;
} = ({ enter, enterFrom, enterTo, leave, leaveFrom, leaveTo, ...props }) => (
  <ClassNames>
    {({ css }) => (
      // @ts-ignore
      <HeadlessTransition
        enter={enter && css(enter)}
        enterFrom={enterFrom && css(enterFrom)}
        enterTo={enterTo && css(enterTo)}
        leave={leave && css(leave)}
        leaveFrom={leaveFrom && css(leaveFrom)}
        leaveTo={leaveTo && css(leaveTo)}
        {...props}
      />
    )}
  </ClassNames>
);

export const TransitionChild: FC<TransitionProps> = ({
  enter,
  enterFrom,
  enterTo,
  leave,
  leaveFrom,
  leaveTo,
  ...props
}) => (
  <ClassNames>
    {({ css }) => (
      // @ts-ignore
      <HeadlessTransition.Child
        enter={enter && css(enter)}
        enterFrom={enterFrom && css(enterFrom)}
        enterTo={enterTo && css(enterTo)}
        leave={leave && css(leave)}
        leaveFrom={leaveFrom && css(leaveFrom)}
        leaveTo={leaveTo && css(leaveTo)}
        {...props}
      />
    )}
  </ClassNames>
);

Transition.Child = props => TransitionChild(props);
