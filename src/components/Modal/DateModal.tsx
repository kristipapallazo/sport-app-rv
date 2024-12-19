import { Modal, ModalProps } from "antd";
import React, { FC } from "react";
import useCollection from "../../hooks/useCollection";

interface DateModalProps extends ModalProps {}
const DateModal: FC<DateModalProps> = (props) => {
  const {} = props;
  const { availableDates } = useCollection()!;
  const allAvailableDates = ["all", ...availableDates];

  const items = allAvailableDates.map((date) => {
    return <div key={date}>{date}</div>;
  });

  return (
    <Modal styles={{ body: { height: "50%" } }} {...props}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          rowGap: "10px",
          height: "100%",
        }}
      >
        {items}
      </div>
    </Modal>
  );
};

export default DateModal;
