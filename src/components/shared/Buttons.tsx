import { FC } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import "twin.macro";
import tw, { css } from "twin.macro";

import { HasChildren, isClickable } from "../../types/GeneralTypes";

export type BaseButtonProps = {
  type?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
} & HasChildren &
  isClickable;

export const BaseButton: FC<BaseButtonProps> = ({
  type = "secondary",
  size = "md",
  onClick,
  ...props
}) => {
  const typeStylesButton =
    type === "primary"
      ? tw`bg-primary-700 border-transparent text-primary-100 hover:(bg-primary-800 shadow-lg)`
      : type === "secondary"
      ? tw`bg-transparent border-primary-600 hover:(bg-primary-600 text-primary-100 shadow-lg)`
      : null;
  const sizeStylesButton =
    size === "sm"
      ? tw`px-2 py-1 text-base rounded-md`
      : size === "md"
      ? tw`px-4 py-2 text-lg rounded-lg`
      : tw`px-6 py-4 text-2xl`;

  const sizeStylesIcon =
    size === "sm" ? tw`h-4 w-4` : size === "md" ? tw`h-6 w-6` : tw`h-8 w-8`;

  return (
    <button
      tw="transition border-2 rounded-xl shadow flex items-center justify-center"
      css={[typeStylesButton, sizeStylesButton]}
      onClick={onClick}
      {...props}
    >
      <HiOutlinePlus tw="pb-1 mr-1" css={sizeStylesIcon} />
      Add a new card
    </button>
  );
};
