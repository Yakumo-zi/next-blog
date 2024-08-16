import { ComponentProps } from "react";

type Props = {} & ComponentProps<"div">;
export const Footer = ({ ...props }: Props) => {
  return <div {...props}></div>;
};
