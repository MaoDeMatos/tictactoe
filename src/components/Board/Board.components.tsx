import { FC } from "react";
import { HiOutlineX } from "react-icons/hi";
import tw, { css, theme } from "twin.macro";

import { HasChildren } from "../../types/GeneralTypes";

export const Circle = tw.div`rounded-full border-4 border-current w-4/5 h-4/5`;
export const Cross = tw(HiOutlineX)`w-full h-full`;

export const Cell: FC<HasChildren> = props => (
  <div
    tw="relative transition flex justify-center items-center cursor-pointer hover:(bg-slate-100 text-primary-900) border border-transparent p-2"
    // Child shadow & Inner grid borders
    css={css`
      & > * {
        filter: drop-shadow(0 0 0.25rem ${theme`colors.primary.600`});
      }
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
    {...props}
  />
);
