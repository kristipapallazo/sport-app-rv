import React, { FC } from "react";
import classes from "./Right.module.css";

interface RightProps {
  className?: string;
}
const Right: FC<RightProps> = (props) => {
  const { className } = props;
  const classname = `${className} ${classes.right}`;
  return <div className={classname}>right</div>;
};

export default Right;
