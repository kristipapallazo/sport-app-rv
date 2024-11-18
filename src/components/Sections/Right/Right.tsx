import React, { FC } from "react";

interface RightProps {
  className?: string;
}
const Right: FC<RightProps> = (props) => {
  const { className } = props;
  return <div className={className}>right</div>;
};

export default Right;
