import { FC, ReactNode } from "react";
import Flag, { FlagProps } from "react-world-flags";

interface FlagIconsObj {
  [k: string]: ReactNode;
}

const FlagIcon: FC<FlagProps> = ({ code, fallback }) => {
  return <Flag code={code} fallback={fallback} width={20} style={{ marginRight: 5 }} />;
};

const FLAG_ICONS_OBJ: FlagIconsObj = {
  Italy: <FlagIcon code="ITA" />,
  England: <FlagIcon code="GB_ENG" />,
  Spain: <FlagIcon code="ES" />,
  Germany: <FlagIcon code="DE" />,
  France: <FlagIcon code="FRA" />,
  Netherlands: <FlagIcon code="NE" />,
  Portugal: <FlagIcon code="PT" />,
  Scotland: <FlagIcon code="GB_SCT" />,
  Austria: <FlagIcon code="tttt" fallback={<span>test</span>} />,
};

export default FLAG_ICONS_OBJ;
