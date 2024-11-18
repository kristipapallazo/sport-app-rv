import { FC } from "react";
import classes from "./CategContainer.module.css";

interface CategContainerProps {}
const CategContainer: FC<CategContainerProps> = (props) => {
  const {} = props;
  const sport = "update it";
  return (
    <div className={classes.container}>
      <div>{sport}</div>
      <div className={classes["categ-menu"]}>categ menu</div>
    </div>
  );
};

export default CategContainer;
