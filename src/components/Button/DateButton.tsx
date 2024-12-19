import { Button } from "antd";
import { Dispatch, FC, MouseEventHandler, SetStateAction } from "react";
// import useCollection from "../../hooks/useCollection";

interface DateBtnProps {
  setSelectDateModalIsOpen: Dispatch<SetStateAction<boolean>>;
}
const DateBtn: FC<DateBtnProps> = (props) => {
  const { setSelectDateModalIsOpen } = props;
  // const store = useCollection();

  const onClick: MouseEventHandler<HTMLElement> = () => {
    setSelectDateModalIsOpen((prev) => !prev);
  };

  return (
    <Button onClick={onClick} className="date-model-btn">
      date
    </Button>
  );
};

export default DateBtn;
