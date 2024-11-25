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
  Austria: <FlagIcon code="AT" /* fallback={<span>test</span>} */ />,
  Belgium: <FlagIcon code="BE" />,
  Switzerland: <FlagIcon code="CH" />,
  Denmark: <FlagIcon code="DK" />,
  Sweden: <FlagIcon code="SE" />,
  Norway: <FlagIcon code="NO" />,
  Ireland: <FlagIcon code="GB_NIR" />,
  Turkey: <FlagIcon code="TR" />,
  Russia: <FlagIcon code="RU" />,
  "Czech Republic": <FlagIcon code="CZ" />,
  Poland: <FlagIcon code="PL" />,
  Romania: <FlagIcon code="RO" />,
  Greece: <FlagIcon code="GR" />,
  Ukraine: <FlagIcon code="UA" />,
  Croatia: <FlagIcon code="HR" />,
  Hungary: <FlagIcon code="HU" />,
  Slovakia: <FlagIcon code="SK" />,
  Slovenia: <FlagIcon code="SI" />,
  Bulgaria: <FlagIcon code="BG" />,
  Serbia: <FlagIcon code="RS" />,
  Wales: <FlagIcon code="GB_WLS" />,
};

export default FLAG_ICONS_OBJ;
