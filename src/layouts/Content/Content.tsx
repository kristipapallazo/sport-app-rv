import React, { cloneElement, FC, ReactElement } from "react";
import classes from "./Content.module.css";

interface ContentProps {
  children: [ReactElement, ReactElement, ReactElement];
}
const Content: FC<ContentProps> = (props) => {
  const { children } = props;

  const sections = ["left", "center", "right"].map((section, k) => {
    const classname = classes.section;
    // const classname = `${classes.section} ${classes[section]}`;
    const childNode = children[k];

    const child = cloneElement(childNode, { key: section, className: classname });

    return child;
  });
  return <div className={classes.content}>{sections}</div>;
};

export default Content;
