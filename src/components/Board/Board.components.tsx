import { motion } from "framer-motion";
import tw, { css, styled, theme } from "twin.macro";

export const Circle = tw(
  motion.div
)`rounded-full border-4 border-current w-4/5 h-4/5`;

export const Cross = styled(motion.div)`
  ${tw`relative rounded-full w-4/5 h-4/5`}
  &::before, &&:after {
    ${tw`transform origin-center content absolute h-full w-1 rounded-full bg-current`}
    left: calc(50% - 2px)
  }
  &::before {
    ${tw`rotate-45`}
  }
  &::after {
    ${tw`-rotate-45`}
  }
`;

export const Cell = styled.div`
  ${tw`relative transition flex justify-center items-center cursor-pointer hover:(bg-slate-100 text-primary-900) border border-transparent p-2`}
  ${css`
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
`;
