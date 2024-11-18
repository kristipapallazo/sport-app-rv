import React, { FC } from "react";

interface CenterProps {
  className?: string;
}
const Center: FC<CenterProps> = (props) => {
  const { className } = props;
  return <div className={className}>center</div>;
};

export default Center;
