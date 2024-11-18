import React, { FC } from "react";

interface LeftProps {
  className?: string;
}
const Left: FC<LeftProps> = (props) => {
  const { className } = props;
  return <div className={className}>left</div>;
};

export default Left;
