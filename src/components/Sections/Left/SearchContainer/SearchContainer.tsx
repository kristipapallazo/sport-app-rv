import { Input } from "antd";
import { FC } from "react";
import classes from "./SearchContainer.module.css";

interface SearchContainerProps {}
const SearchContainer: FC<SearchContainerProps> = (props) => {
  const {} = props;
  return (
    <div className={classes.container}>
      <h3>Search match</h3>
      <Input placeholder="Seach matches" />
    </div>
  );
};

export default SearchContainer;
